# Day25-WebTables

> Generated from PDF notes

`
innerText() vs textContent(), allInnerTexts() vs
allTextContents() & all() Methods
1. innerText() vs textContent()
• innerText():
o Returns the visible text of an element.
o Ignores hidden elements.
o Removes extra whitespace and line breaks.
• textContent():
o Returns all text including from hidden elements.
o Retains whitespaces, tabs, and line breaks.
o Often needs trimming for cleaner output.

## Use innerText() when you need clean, visible-only text. Use textContent() when hidden

content or exact raw text is required.
2. allInnerTexts() vs allTextContents()
• allInnerTexts():
o Returns an array of visible text strings (from all matched elements).
o Automatically cleans up whitespace.
• allTextContents():
o Returns an array of raw text strings (including from hidden elements).
o Keeps extra whitespace and line breaks.

`	ypescript
o Often followed by .map(text => text.trim()) for cleanup.
`

allInnerTexts() is simpler for most test output logs, while allTextContents() gives complete
raw content.
`

3. all() Method
• locator.all():
o Converts a group of elements (Locator) into an array of individual locators.
o Allows you to interact with each element (e.g., get inner text, click, etc.) using
array-style access or loops.

## Helpful for performing operations on specific elements or iterating over all matched

elements.

## Summary Table

## Method Description Trims Includes

## Output Hidden

innerText() Visible, cleaned-up text of a single
element
textContent() Raw text including hidden parts and
formatting
allInnerTexts() Array of visible, cleaned-up texts
allTextContents() Array of raw texts, includes hidden
content
all() Converts Locator to array of locators N/A N/A
(for iteration)

`

## Handling Static Web Table

https://testautomationpractice.blogspot.com/
Key Actions Performed:
1. Locating the Table:

`	ypescript
const table = page.locator("table[name='BookTable'] tbody");
`

o Uses a CSS selector to locate the table body.
2. Counting Rows:

`	ypescript
const rows = table.locator("tr");
await expect(rows).toHaveCount(7);
`

o Counts all rows (including header).
o Two approaches are used: assertion with toHaveCount() and retrieving count
via rows.count().
3. Counting Columns (Headers):

`	ypescript
const columns = rows.locator("th");
await expect(columns).toHaveCount(4);
o Only the header row contains <th> elements, which represent column
`

headers.
`

`
4. Reading Data from a Specific Row:

`	ypescript
const secondRowCells = rows.nth(2).locator('td');
const secondRowTexts = await secondRowCells.allInnerTexts();
`

o Reads all cells from the 3rd row (index 2), excluding the header row.
5. Reading All Data (excluding header):

`	ypescript
for (let row of allRowData.slice(1)) {
const cols = await row.locator('td').allInnerTexts();
console.log(cols.join('\t'));
}
`

o Iterates over each data row and prints all cell values.
6. Filtering Rows Based on Cell Value (Author = Mukesh):

`	ypescript
if (author === 'Mukesh') {
console.log(`${author} \t ${book}`);
mukeshBooks.push(book);
}
`

o Finds and prints all books written by Mukesh.
7. Aggregating Column Data (Total Price):

`	ypescript
totalPrice += parseInt(price);
`

o Parses and sums the price of all books.
`
