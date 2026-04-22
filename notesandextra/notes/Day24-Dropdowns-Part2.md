# Day24-Dropdowns-Part2

> Generated from PDF notes

`

## Hidden, Bootstrap and Autosuggest Dropdowns

Hidden Dropdown: The dropdown options are hidden, meaning we cannot directly inspect
them because they disappear or are not visible in the DOM.

`	ypescript
Bootstrap Dropdown: This type of dropdown does not use the <select> tag. It is
`

commonly used in modern web applications.
Auto Suggest / Auto Complete: Options are displayed dynamically as you type. The options
are usually fetched from the server at runtime.
Techniques to get hidden options in the dropdown:
Technique 1: Use SelectorsHub Turn on Debugger option.
Technique 2:
1. Open the DOM
2. Press Ctrl+Shift+P
3. Then type emulate a focused page and select.
4. Locate hidden elements on the page
5. After locating repeat the steps 1,2.
6. Then type Do not emulate a focused page and select.
textContent() Vs innerText():

## In Playwright, both textContent() and innerText() are used to retrieve the text from a web

element, but they have key differences in how and what they return.
textContent()
• Returns: The raw text content, including hidden elements and extra whitespace.
• Includes:
o Text from hidden elements (e.g., display: none)
o Extra whitespaces, line breaks, etc.
• Use Case: When you want the exact DOM text, regardless of visibility or formatting.

`	ypescript
const text = await page.locator('selector').textContent();
`

`

`
innerText()
• Returns: The visible rendered text, similar to what a user sees on the screen.
• Excludes:
o Hidden elements
o Invisible text due to CSS
• Normalizes:
o Eliminates Whitespace and line breaks (like a browser does)
• Use Case: When you want to verify visible text on a page, like for assertions.

`	ypescript
const visibleText = await page.locator('selector').innerText();
`

## Feature textContent() innerText()

## Visibility matters? No Yes

## Whitespace? Preserved as-is Normalized

## Hidden text? Included Excluded

## Use case Exact DOM text (e.g., parsing) Visible user text (e.g., testing)

Example:
Sample DOM:

`	ypescript
<div id="demo">
`

Welcome

`	ypescript
<span style="display:none">To India</span>
`

</div>
• textContent() ➝ "Welcome To India"
• innerText() ➝ "Welcome"
`

`
Summary of Concepts:

## Concept Explanation


`	ypescript
page.locator() To locate a single or group of elements
`

fill() Type text into input
click() Click on a button or element
waitForTimeout() Wait for a few seconds

## Locator.count() Get number of matching elements

## Locator.nth(i) Access the i-th element in a group

textContent() or innerText() Get text from elements

## Loop through dropdown options Used to print and select items dynamically

`
