import {parse} from 'csv-parse/sync';
import fs from 'fs';
 

export class TestDataUtil {
 static getCSVData(filePath:string):Promise<any[]>{
    const readFile = fs.readFileSync(filePath, 'utf-8');
    const records:any= parse(readFile, {columns:true, skip_empty_lines:true});
    return records;
 }

}