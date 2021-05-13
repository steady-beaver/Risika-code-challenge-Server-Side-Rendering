 ### Bug with "key" prop
 Case: Every time when Company page is accessed 
 Warning: Each child in a list should have a unique "key" prop.
 File: components\Management\index.js
 Line 68: Works properly (commented)
 Line 69: Gives the warning
 ### Bug with few of the records 
Example:    WRIST MARINE SUPPLIES A/S 
Error:      Unhandled Runtime Error
TypeError:  Cannot convert undefined or null to object

File: components\Management\index.js 
Line: 48
Code: const keys = Object.keys(managementData[0])

### Improvement 
