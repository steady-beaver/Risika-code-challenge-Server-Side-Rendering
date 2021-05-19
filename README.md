 ### Made Improvement    

Implemented: Server side generated dynamic paths

 ### (Solved) Bug with "key" prop
 Case: Every time when Company page is accessed   
 Warning: Each child in a list should have a unique "key" prop.  
 File: components\Management\index.js  
 Line 68: Works properly (commented)  
 Line 69: Gives the warning  

 Solution: used different deep cloning library. Apparently react element objects is tricky due to <ins>$$typeof</ins> property

 ### Bug with few of the records 
Example:    WRIST MARINE SUPPLIES A/S  
Error:      Unhandled Runtime Error  
TypeError:  Cannot convert undefined or null to object  

File: components\Management\index.js   
Line: 48  
Code: const keys = Object.keys(managementData[0])  

### Changed library

Deep clone package changed
Before used: Loadash.deepClone
Problem: caused stack overflow error in getStaticProps
**Currently used:** clone-deep 
https://www.npmjs.com/package/clone-deep

Irritating clone-deep react element bug (fixed)
cloning specific react property <ins>$$typeof</ins>  the caused bug
manually overwrote 
components\Management\index.js 
formatSeniority()
line ~30

```javascript
transformedData.$$typeof = Symbol.for("react.element")
```







