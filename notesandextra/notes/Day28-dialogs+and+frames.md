# Day28-dialogs+and+frames

> Generated from PDF notes

`

## Dialogs and Iframes

Dialogs:

## By default, dialogs are auto-dismissed by Playwright, so you don't have to handle them.

## However, you can register a dialog handler before the action that triggers the dialog to

either dialog.accept() or dialog.dismiss() it.

## Dialogs are JavaScript pop-ups like alert, confirm, and prompt.

## Common Dialog Types

• alert(): Displays a message with an OK button.
• confirm(): Displays a message with OK and Cancel buttons.
• prompt(): Asks for user input.

## How to Handle a Dialog

## You need to listen for the dialog event and then accept or dismiss it.

## Example – Handling an alert() Dialog


`	ypescript
import { test, expect } from '@playwright/test';
test('handle alert dialog', async ({ page }) => {
`

// Listen for the dialog

`	ypescript
page.on('dialog', async (dialog) => {
console.log('Dialog message:', dialog.message());
await dialog.accept(); // or dialog.dismiss();
});
await page.goto('https://example.com');
await page.click('#trigger-alert'); // Assume this triggers an alert
});
`

## Example – Handling a confirm() Dialog


`	ypescript
page.on('dialog', async (dialog) => {
console.log(dialog.message());
await dialog.accept(); // Click OK
// await dialog.dismiss(); // Click Cancel
});
`

`

`

## Example – Handling a prompt() Dialog with Input


`	ypescript
page.on('dialog', async (dialog) => {
console.log(dialog.message());
await dialog.accept('My input text'); // Provide input and click OK
});
`

Frames:

## An iframe (inline frame) is an HTML element that allows one HTML document to be

embedded inside another.
Commonly used to include:
• YouTube videos
• Google Maps
• Other webpages inside the current page

`	ypescript
page.frames()
• Returns a list of all frames on the current page.
`

• Helps in understanding how many iframes exist.

`	ypescript
page.frame()
`

• Used to access a specific frame by its URL or name.
• Returns a Frame object that allows us to interact with elements inside the iframe.

`	ypescript
page.frameLocator()
`

• A newer and preferred way to work with frames.
• Allows you to directly locate elements inside an iframe using Playwright's powerful
locators.

`	ypescript
• More stable than page.frame().
`

childFrames()
• If a frame contains another nested frame, you can access it using
frame.childFrames().
`
