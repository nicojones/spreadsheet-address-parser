# spreadsheet-address-parser
Parses User-entered addresses in a spreadsheet into a well-formatted address using Google Maps Geocoder

# How to install
 - Create (or open) a Google Spreadsheet
 - Click on "Tools" > "Script Editor"
 - Copy the code from `Code.gs` (in this Repository) into `Code.gs` (in the Script Editor tab)
 - Save
 
# How to configure
 - At the top of `Code.gs` you will find options that you can configure, it's easy
 
# How to use
 - Let's say you have a column with user-entered addresses that you want to parse (let's say this column is B3:B100)
 - Go to the cell you want the _parsed address_ to appear, and type `=PARSEADDRESS(B3)`
 - Click again on that cell, and at the bottom-right corner a small can be dragged (a cursor `+` will appear).
 - Drag the cell to apply the formula to all the results
 
# Extra option
 - If you have a column that contains only the ZIP code, you can parse that as a second parameter: `=PARSEADDRESS(B3;D3)` and the code will validate that the final Address belongs to the same Zipcode (or it will throw an error)
