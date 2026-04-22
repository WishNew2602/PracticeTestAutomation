import { Reporter, FullResult, TestCase, TestResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

interface Attachment {
  name: string;
  path?: string;
  mimeType: string;
}

interface TestInfo {
  title: string;
  status: 'passed' | 'failed' | 'skipped' | 'timedOut' | 'interrupted';
  duration: number;
  error?: string;
  file: string;
  attachments: Attachment[];
  steps: any[];
}

class CustomPdfReporter implements Reporter {
  private testResults: TestInfo[] = [];
  private startTime = Date.now();

  onTestEnd(test: TestCase, result: TestResult) {
    this.testResults.push({
      title: test.title,
      status: result.status,
      duration: result.duration,
      error: result.error?.message,
      file: test.location.file,
      attachments: result.attachments || [],
      steps: result.steps || [],
    });
  }

  async onEnd(result: FullResult) {
    // Dynamically import pdfkit to avoid dependency issues
    try {
      const PDFDocument = require('pdfkit');
      await this.generatePdfReport(result, PDFDocument);
    } catch (error) {
      console.error('Error generating PDF report:', error);
    }
  }

  private async generatePdfReport(result: FullResult, PDFDocument: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const doc = new PDFDocument({ size: 'A4', margin: 40, bufferPages: true });
        const reportPath = path.join(process.cwd(), 'reports', 'test-report.pdf');
        
        // Remove existing file if it exists
        if (fs.existsSync(reportPath)) {
          fs.unlinkSync(reportPath);
        }
        
        const stream = fs.createWriteStream(reportPath);

        // Handle stream errors
        stream.on('error', (err) => {
          console.error('Stream error:', err);
          reject(err);
        });

        doc.on('error', (err) => {
          console.error('Document error:', err);
          reject(err);
        });

        doc.pipe(stream);

        // Title
        doc.fontSize(24).font('Helvetica-Bold').text('Test Execution Report', { align: 'center' });
        doc.moveDown(0.5);

        // Summary section
        const passed = this.testResults.filter(t => t.status === 'passed').length;
        const failed = this.testResults.filter(t => t.status === 'failed').length;
        const skipped = this.testResults.filter(t => t.status === 'skipped').length;
        const total = this.testResults.length;

        doc.fontSize(11).font('Helvetica-Bold').text('Executive Summary', { underline: true });
        doc.fontSize(10).font('Helvetica');
        doc.moveDown(0.3);
        doc.text(`Total Tests: ${total}`);
        doc.text(`Passed: ${passed}`, { color: '008000' });
        doc.text(`Failed: ${failed}`, { color: 'FF0000' });
        doc.text(`Skipped: ${skipped}`, { color: 'FFA500' });
        doc.text(`Total Duration: ${((result.duration || 0) / 1000).toFixed(2)}s`);
        doc.text(`Report Generated: ${new Date().toLocaleString()}`);
        doc.moveDown(1);

        // Detailed Test Cases with Screenshots
        doc.fontSize(14).font('Helvetica-Bold').text('Test Case Details', { underline: true });
        doc.moveDown(0.5);

        // Iterate through each test
        for (const test of this.testResults) {
          // Check if new page is needed
          if (doc.y > 650) {
            doc.addPage();
          }

          // Test Header
          const statusColor = this.getStatusColor(test.status);
          const statusText = this.getStatusText(test.status);

          doc.fontSize(12).font('Helvetica-Bold').fillColor(statusColor).text(`${test.title}`, { underline: true });
          doc.fillColor('000000');
          doc.fontSize(9).font('Helvetica');
          doc.text(`Status: ${statusText} | Duration: ${test.duration}ms | File: ${path.basename(test.file)}`);
          
          // Test Steps
          if (test.steps && test.steps.length > 0) {
            if (doc.y > 650) doc.addPage();
            doc.fontSize(10).font('Helvetica-Bold').moveDown(0.3).text('Test Steps:', { underline: true });
            doc.fontSize(9).font('Helvetica');
            
            test.steps.forEach((step, index) => {
              const stepText = step.title || 'Step';
              const duration = step.duration ? `[${step.duration}ms]` : '';
              doc.text(`  ${index + 1}. ${stepText} ${duration}`);
            });
          }

          // Screenshots
          const screenshots = test.attachments.filter(a => 
            a.mimeType && (a.mimeType.includes('image/png') || a.mimeType.includes('image/jpeg'))
          );
          
          if (screenshots.length > 0) {
            if (doc.y > 650) doc.addPage();
            doc.moveDown(0.3).fontSize(10).font('Helvetica-Bold').text('Screenshots:', { underline: true });
            doc.moveDown(0.2);

            for (const screenshot of screenshots) {
              try {
                if (screenshot.path) {
                  // Resolve absolute path
                  const absolutePath = path.isAbsolute(screenshot.path) 
                    ? screenshot.path 
                    : path.resolve(process.cwd(), screenshot.path);

                  if (fs.existsSync(absolutePath)) {
                    // Check file size
                    const stats = fs.statSync(absolutePath);
                    if (stats.size > 0) {
                      // Ensure we have space for image
                      if (doc.y > 650) {
                        doc.addPage();
                      }

                      const imgWidth = 480;
                      const maxHeight = 220;
                      
                      doc.image(absolutePath, 50, doc.y, { width: imgWidth, height: maxHeight });
                      doc.moveDown(2.8);
                      
                      // Add screenshot name
                      doc.fontSize(8).font('Helvetica').fillColor('666666');
                      doc.text(`Screenshot: ${path.basename(screenshot.name)}`, { align: 'center' });
                      doc.fillColor('000000');
                      doc.moveDown(0.3);
                    } else {
                      doc.fontSize(9).fillColor('FF0000').text(`[Empty screenshot file: ${screenshot.name}]`);
                      doc.fillColor('000000');
                      doc.moveDown(0.3);
                    }
                  } else {
                    doc.fontSize(9).fillColor('888888').text(`[Screenshot file not found: ${screenshot.name}]`);
                    doc.fillColor('000000');
                    doc.moveDown(0.3);
                  }
                }
              } catch (err: any) {
                console.warn(`Warning: Could not embed screenshot ${screenshot.name}:`, err.message);
                doc.fontSize(9).fillColor('888888').text(`[Could not embed screenshot: ${screenshot.name}]`);
                doc.fillColor('000000');
                doc.moveDown(0.3);
              }
            }
          }

          // Error details if any
          if (test.error) {
            if (doc.y > 650) doc.addPage();
            doc.moveDown(0.3).fontSize(10).font('Helvetica-Bold').fillColor('FF0000').text('Error Details:', { underline: true });
            doc.fontSize(9).font('Helvetica').fillColor('000000');
            doc.text(test.error, { width: 500 });
            doc.fillColor('000000');
          }

          doc.moveDown(0.5);
          if (doc.y < 700) {
            doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
          }
          doc.moveDown(0.5);
        }

        // Footer
        doc.fontSize(8).fillColor('666666');
        doc.text(`Playwright Custom PDF Reporter | Page ${doc.bufferedPageRange().count}`, { align: 'center', y: doc.page.height - 40 });

        // Finalize document
        doc.end();

        stream.on('finish', () => {
          console.log(`\n✅ PDF Report generated successfully: ${reportPath}`);
          resolve(reportPath);
        });
      } catch (error) {
        console.error('Error in PDF generation:', error);
        reject(error);
      }
    });
  }

  private getStatusColor(status: string): string {
    switch (status) {
      case 'passed':
        return '008000'; // Green
      case 'failed':
        return 'FF0000'; // Red
      case 'skipped':
        return 'FFA500'; // Orange
      default:
        return '808080'; // Gray
    }
  }

  private getStatusText(status: string): string {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }
}

export default CustomPdfReporter;
