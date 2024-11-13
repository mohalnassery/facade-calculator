## Creating a Database from Balexco 45 Series Documentation

Based on the sources and our conversation, the goal is to construct a database and populate it with the complete list of profiles, accessories, and gaskets from the provided PDF, along with the relationships between them. This database will be used to facilitate project cost estimation for aluminum and glass facades built using the Balexco 45 Casement Series system.

Here's a breakdown of the tables, their fields, and how they relate to each other, along with a plan for populating them with data from the PDF:

**1. `Profile` Table:**

This table will store information about each aluminum extrusion profile in the Balexco 45 series.

| Field           | Data Type     | Description                                                             |
| :-------------- | :------------ | :---------------------------------------------------------------------- |
| ProfileCode     | VARCHAR(255)  | Unique code for the profile (e.g., E1200)                               |
| ProfileName     | VARCHAR(255)  | Name of the profile (e.g., Z FRAME)                                     |
| Description     | TEXT          | Detailed description of the profile's function and use                  |
| Weight (g/m)    | DECIMAL(10,2) | Weight of the profile per meter                                         |
| Jx (cm^4)       | DECIMAL(10,2) | Moment of inertia about the x-axis                                      |
| Wx (cm^3)       | DECIMAL(10,2) | Section modulus about the x-axis                                        |
| Jy (cm^4)       | DECIMAL(10,2) | Moment of inertia about the y-axis                                      |
| Wy (cm^3)       | DECIMAL(10,2) | Section modulus about the y-axis                                        |
| UnitPrice (BHD) | DECIMAL(10,2) | Price per unit length of the profile in Bahraini Dinars (not in source) |

**Data Population:**

- **ProfileCode, ProfileName, Description:** Extract these from the "LIST OF PROFILES" sections (pages 25-30, 35-40) and other profile lists throughout the document.
- **Weight, Jx, Wx, Jy, Wy:** Gather this data from the tables in the "LIST OF PROFILES" sections, where available. Some profiles may have missing values.
- **UnitPrice:** This information is not available in the source and will need to be obtained from Balexco or other suppliers.

**2. `Accessory` Table:**

This table will hold details about the accessories needed for Balexco 45 series installations.

| Field           | Data Type     | Description                                                               |
| :-------------- | :------------ | :------------------------------------------------------------------------ |
| AccessoryCode   | VARCHAR(255)  | Unique code for the accessory (e.g., C0010)                               |
| AccessoryName   | VARCHAR(255)  | Name of the accessory (e.g., WINGS-HINGE)                                 |
| Description     | TEXT          | Detailed description of the accessory                                     |
| GiesseCode      | VARCHAR(255)  | Corresponding Giesse part number, if applicable (from "ACCESSORIES LIST") |
| UnitPrice (BHD) | DECIMAL(10,2) | Price per unit of the accessory in Bahraini Dinars (not in source)        |

**Data Population:**

- **AccessoryCode, AccessoryName, Description, GiesseCode:** Extract this information from the "ACCESSORIES LIST" (pages 36-39, 41-42).
- **UnitPrice:** As with profiles, price data is not available in the source and needs to be obtained externally.

**3. `Gasket` Table:**

This table will store information about the gasket types used in the Balexco 45 series.

| Field           | Data Type     | Description                                                            |
| :-------------- | :------------ | :--------------------------------------------------------------------- |
| GasketCode      | VARCHAR(255)  | Unique code for the gasket (e.g., E2101)                               |
| Description     | TEXT          | Description of the gasket                                              |
| Material        | VARCHAR(255)  | Material of the gasket (e.g., EPDM) (from "LIST OF GASKETS")           |
| UnitPrice (BHD) | DECIMAL(10,2) | Price per unit length of the gasket in Bahraini Dinars (not in source) |

**Data Population:**

- **GasketCode, Description, Material:** Extract this data from the "LIST OF GASKETS" section (page 45).
- **UnitPrice:** Price information is not in the source and will need to be sourced separately.

**4. `WindowType` Table:**

| Field          | Data Type    | Description                                                                                                 |
| :------------- | :----------- | :---------------------------------------------------------------------------------------------------------- |
| WindowTypeID   | INT          | Primary key for window types                                                                                |
| WindowTypeName | VARCHAR(255) | Name of the window type (e.g., Casement, Sliding, Top Hung, Bottom Hung, Tilt-Turn, Pivoting, Tilt & Slide) |

**Data Population:**

- Extract the window types from the "GENERAL APPLICATIONS" section on page 19.

**5. `WindowFeature` Table:**

| Field           | Data Type    | Description                                                                                                  |
| :-------------- | :----------- | :----------------------------------------------------------------------------------------------------------- |
| WindowFeatureID | INT          | Primary key for window features                                                                              |
| FeatureName     | VARCHAR(255) | Specific features of a window (e.g., Inward Opening, Outward Opening, Fixed, Combined with Sliding, Rounded) |

**Data Population:**

- Derive window features from the descriptions and diagrams in the "CROSS SECTION DETAILS" section (pages 49-80) and other relevant parts of the document.

**6. `DoorType` Table (Similar to WindowType):**

| Field        | Data Type    | Description                                   |
| :----------- | :----------- | :-------------------------------------------- |
| DoorTypeID   | INT          | Primary key for door types                    |
| DoorTypeName | VARCHAR(255) | Name of the door type (e.g., Casement, Swing) |

**Data Population:**

- Determine the types of doors from the "GENERAL APPLICATIONS" section (page 19) and the document's descriptions and diagrams.

**7. `DoorFeature` Table (Similar to WindowFeature):**

| Field         | Data Type    | Description                                                                                                |
| :------------ | :----------- | :--------------------------------------------------------------------------------------------------------- |
| DoorFeatureID | INT          | Primary key for door features                                                                              |
| FeatureName   | VARCHAR(255) | Specific features of a door (e.g., Inward Opening, Outward Opening, Single, Double, with Sidelights, etc.) |

**Data Population:**

- As with window features, derive door features from the details provided in the "CROSS SECTION DETAILS" and other relevant sections of the PDF.

**8. `Window` Table:**

| Field           | Data Type     | Description                                   |
| :-------------- | :------------ | :-------------------------------------------- |
| WindowID        | INT           | Primary key for windows                       |
| WindowTypeID    | INT           | Foreign key referencing `WindowType` table    |
| WindowFeatureID | INT           | Foreign key referencing `WindowFeature` table |
| Width (meters)  | DECIMAL(10,2) | Width of the window                           |
| Height (meters) | DECIMAL(10,2) | Height of the window                          |
| Quantity        | INT           | Number of windows of this type                |

**9. `Door` Table (Similar to Window):**

| Field           | Data Type     | Description                                 |
| :-------------- | :------------ | :------------------------------------------ |
| DoorID          | INT           | Primary key for doors                       |
| DoorTypeID      | INT           | Foreign key referencing `DoorType` table    |
| DoorFeatureID   | INT           | Foreign key referencing `DoorFeature` table |
| Width (meters)  | DECIMAL(10,2) | Width of the door                           |
| Height (meters) | DECIMAL(10,2) | Height of the door                          |
| Quantity        | INT           | Number of doors of this type                |

**10. `WindowComponent` Table:**

| Field         | Data Type    | Description                                                                                |
| :------------ | :----------- | :----------------------------------------------------------------------------------------- |
| WindowID      | INT          | Foreign key referencing `Window` table                                                     |
| ComponentType | VARCHAR(255) | Type of component ('Profile', 'Accessory', 'Gasket', 'AdditionalComponent')                |
| ComponentCode | VARCHAR(255) | Code referencing the specific component (ProfileCode, AccessoryCode, or GasketCode)        |
| Quantity      | INT          | Quantity of this component needed for the window (could be calculated based on dimensions) |

**11. `DoorComponent` Table (Similar to WindowComponent):**

| Field         | Data Type    | Description                                                                              |
| :------------ | :----------- | :--------------------------------------------------------------------------------------- |
| DoorID        | INT          | Foreign key referencing `Door` table                                                     |
| ComponentType | VARCHAR(255) | Type of component ('Profile', 'Accessory', 'Gasket', 'AdditionalComponent')              |
| ComponentCode | VARCHAR(255) | Code referencing the specific component (ProfileCode, AccessoryCode, or GasketCode)      |
| Quantity      | INT          | Quantity of this component needed for the door (could be calculated based on dimensions) |

**12. `AdditionalComponent` Table:**

| Field                 | Data Type     | Description                                                                                |
| :-------------------- | :------------ | :----------------------------------------------------------------------------------------- |
| AdditionalComponentID | INT           | Primary key for additional components                                                      |
| ComponentName         | VARCHAR(255)  | Name of the additional component (e.g., "Base Profile," "Top Base," etc.)                  |
| ProfileCode           | VARCHAR(255)  | Foreign key referencing `Profile` table, if the component is a profile                     |
| Description           | TEXT          | Additional details about the component                                                     |
| UnitPrice (BHD)       | DECIMAL(10,2) | Price per unit of the component (if not a profile with its own unit price) (not in source) |

**Relationships:**

- `Window` has a one-to-many relationship with `WindowComponent`.
- `Window` has a one-to-one relationship with `WindowType`.
- `Window` has a one-to-one relationship with `WindowFeature`.
- `Door` has a one-to-many relationship with `DoorComponent`.
- `Door` has a one-to-one relationship with `DoorType`.
- `Door` has a one-to-one relationship with `DoorFeature`.

**Populating Component Tables:**

This is the most challenging part as the source does not provide a complete breakdown of components for every window and door type. You'll need to combine information from:

- "CROSS SECTION DETAILS" (pages 49-80): These diagrams provide visual representations of the profiles, accessories, and gaskets used in different configurations.
- Profile and accessory descriptions: Use the information in the "LIST OF PROFILES" and "ACCESSORIES LIST" to understand the functions and applications of each component.
- "GLAZING GASKETS" (page 46): This section specifies glass spacing requirements for different profiles, which helps determine gasket usage.
- Balexco or expert consultation: For complete accuracy, it's recommended to verify the component lists with Balexco directly or consult with experienced installers.

**Example:** For a double-leaf inward-opening door (as shown on page 53), you would:

1.  **Identify profiles:** From the diagram and descriptions, you might find the following profiles: `E1209`, `E1224`, `E1238`, `E1402`, `E1411`, `E1426`.
2.  **Identify accessories:** Based on the diagram and list, the accessories could include: `C0010`, `C0180`, `C0270`, `C0280`, `C0290`, `C0400`, `C0660`, `C0730`.
3.  **Identify gaskets:** From the "GLAZING GASKETS" section and diagram, you might need gaskets like `E2103`, `E2112`, `E2114`.
4.  **Identify additional components:** If a base profile is needed, create a record in the `AdditionalComponent` table and link it to the appropriate profile code.
5.  **Populate component table:** Create records in the `DoorComponent` table, linking the door to each identified component with its quantity.

**Important Considerations:**

- **Unit Measurements:** Be consistent with your unit measurements (meters for dimensions, Bahraini Dinars for prices) for accurate calculations.
- **Price Updates:** Regularly update the `UnitPrice` fields to reflect current market prices.
- **Database Management System:** Choose a suitable database management system (DBMS) to manage your database effectively. Popular options include MySQL, PostgreSQL, and Microsoft SQL Server.

Here are the tables with the requested data:

### **BALEXCO 45 & 45i THERMAL & NON THERMAL BREAK PROFILES**

| General Applications    | 45   | 45i  |
| :---------------------- | :--- | :--- |
| Internal Opening Door   | \*   | \*   |
| External Opening Window | \*   | \*   |
| Tilt-Turn & Bottom Hung | \*   | \*   |
| Rounded Window          | \*   | \*   |
| Balcony Door            | \*\* | \*\* |
| Tilt & Slide            | \*   | \*\* |
| Combined With Sliding   | \*   | \*\* |
| Pivoting                | \*   | \*\* |
| Top Hung                |      | \*   |
| Tilt-Turn & Side Hung   |      | \*   |

### **LIST OF PROFILES**

| CODE  | SECTION | WEIGHT g/m | Jx cm^4 | Wx cm^3 | Jy cm^4 | Wy cm^3 | DESCRIPTION           |
| :---- | :------ | :--------- | :------ | :------ | :------ | :------ | :-------------------- |
| E1200 | 896     | 424        | 3.71    | 12.86   | 4.86    | 3.73    | Z FRAME               |
| E1201 | 840     | 450        | 3.73    | 4.86    | 11.43   | 3.36    | L FRAME               |
| E1202 | 737     | 275        | 1.25    | 3.3     | 8.4     | 3.2354  | Z FRAME OPEN          |
| E1203 | 743     | 354        | 1.25    | 3.3     | 8.4     | 3.23    | L FRAME OPEN          |
| E1204 | 940     | 421        | 4.93    | 53.83   | 13.14   | 63.06   | L FRAME DOOR          |
| E1205 | 896     | 493        | 8.66    | 2.09    | 17.47   | 10.66   | L FRAME WINDOW        |
| E1208 | 1064    | 398        |         |         |         |         | L FRAME 100           |
| E1209 | 1034    | 631        |         |         |         |         | DOOR                  |
| E1210 | 1480    | 699        |         |         |         |         | Z FRAME               |
| E1211 | 1636    | 486        |         |         |         |         | L FRAME DOOR          |
| E1212 | 983     | 471        | 4.95    | 16.35   |         |         | ARCHITRAVE            |
| E1213 | 1671    | 718        | 16.38   | 64.54   |         |         | Z FRAME COPLANER      |
| E1214 | 1510    | 646        | 7.59    | 54.08   |         |         | COPLANER L FRAME      |
| E1215 | 383     | 316        | 3.20    | 69.36   |         |         | L FRAME DOOR COPLANER |
| E1217 | 381     | 308        | 3.83    | 38.83   |         |         | L FRAME 100           |

### **LIST OF PROFILES**

| CODE    | SECTION | DESCRIPTION                         | WEIGHT g/m | Jx cm^4 | Wx cm^3 | Jy cm^4 | Wy cm^3 | PER. |
| :------ | :------ | :---------------------------------- | :--------- | :------ | :------ | :------ | :------ | :--- |
| E1220   | 1010    | TRANSOM                             | 694        | 3.43    | 15.75   | 9.65    | 81.57   | 1.87 |
| E1221   | 734     | ARCHITRAVE                          | 258        | 2.58    | 6.68    |         |         | 0.99 |
| E1222   | 1337    | Z WING DOOR                         | 751        | 4.90    | 16.98   |         |         | 1.92 |
| E1223   | 959     | SASH GLASS INSERT                   | 558        | 5.75    | 76.94   |         |         | 2.49 |
| E1224   | 1634    | WINDOW SASH                         | 440        | 7.88    | 87.74   |         |         | 3.26 |
| E1225   | 1085    | MULLION                             | 500        | 7.83    | 21.99   |         |         | 3.12 |
| E1226   | 1094    | SKIRTING FOR LARGE TRANSOM          | 441        | 18.29   | 92.08   |         |         | 3.18 |
| E1230   | 2009    | T SMALLER 44.7 mm                   | 460        | 20.63   | 14.20   |         |         | 3.41 |
| E1231   | 1094    | 39.7 mm DOOR SKIRTING               | 472        | 14.59   | 6.27    |         |         | 2.66 |
| E1232   | 1728    | DOOR TRANSOM 39.7 mm                | 504        | 9.90    | 9.05    |         |         | 1.97 |
| E1233   | 1004    | DOOR SASH 44.7 mm                   | 783        |         |         |         |         | 2.92 |
| E1236   | 929     | 44.7 mm                             |            |         |         |         |         | 1.23 |
| E1237   | 1094    | 44.7 mm                             |            |         |         |         |         | 2.31 |
| E1238   |         | FIX FRAME                           |            |         |         |         |         |      |
| E1243   | 664     | INSERT SASH GLASS                   | 422        |         |         |         |         |      |
| E1245   | 967     | CENTRAL FOR DOUBLE SASH             | 454        |         |         |         |         |      |
| E1247   | 905     | DOOR SASH INSIDE OPENING            | 501        |         |         |         |         |      |
| E1250   | 1096    | 44.7 mm                             | 526        |         |         |         |         |      |
| E1251   | 1193    | TRANSOME 39.7 mm                    | 472        |         |         |         |         |      |
| E1255   | 383     | L FRAME                             | 155        | 2.40    | 7.90    |         |         | -    |
| E1256   | 1193    | DOOR SASH 39.7 mm                   | 421        | 6.19    | 22.87   |         |         |      |
| E1274   | 556     | ARCHITRAVE                          | 176        | 0.24    | 0.2     |         |         | -    |
| E1278   | 1499    | L FRAME 100                         | 641        | 7.46    |         |         |         | -    |
| E1280   | 230     | GLAZING BEAD                        | 525        | 9.9     |         |         |         | -    |
| E1281   | 462     | ADDED FRAME OUTSIDE OPENING         |            |         |         |         |         |      |
| E1283   | 1831    | Window shutter                      |            |         |         |         |         |      |
| E1284   | 2654    | Frame 424                           |            |         |         |         |         |      |
| E1292   | 1647    | Frame 399                           |            |         |         |         |         |      |
| E1297   | 1215    | MULLION REINFORCED                  |            |         |         | 20.8    | 99.7    |      |
| E1298   | 1218    | MULLION REINFORCED                  |            |         |         | 7.3     | 10.36   |      |
| E1299   | 2208    | Transom 452                         |            |         |         |         |         |      |
| E1310   | 1057    | COPLANER Z FRAME                    | 830        |         |         | 112.39  | 25.46   | 4.19 |
| E1311   | 1172    | L FRAME COPLANR                     | 734        |         |         | 116.74  | 32.10   | 3.77 |
| E1314   | 1590    | L FRAME DOOR 120mm                  | 591        |         |         | 27.79   | 19.08   | 4.78 |
| E1315   | 1367    | L FRAME OUTSIDE OPENING             |            |         |         |         |         |      |
| E1316   | 2123    | L FRAME 120mm OUTSIDE OPENING       | 520        |         |         |         |         |      |
| E1320   | 2423    | L FRAME DOOR COPLANER               | 475        |         |         | 13.15   | 6.58    | 4.78 |
| E1322   | 2423    | Z FRAME                             | 460        |         |         |         |         | 2.02 |
| E1323   | 2380    | L FRAME                             | 434        |         |         |         |         |      |
| E1324   | 2101    | SKIRTING FOR LARGE TRANSOM          | 451        |         |         |         |         |      |
| E1330   | 1080    | DOOR TRANSOM 44.7 mm                | 523        | 5.74    | 14.37   | 14.99   | 17.08   | 3.28 |
| E1331   | 1391    | SASH PROFILE-WINDOW OUTSIDE OPENING | 609        | 2.82    | 9.93    | 26.38   | 14.16   | 3.60 |
| E1336   | 1545    | CENTRAL DOUBLE SASH                 | 642        |         |         | 19.06   | 5.41    | 2.20 |
| E1337   | 1544    | LARGE WINDOW SASH                   | 641        |         |         | 5.41    | 9.93    | 2.17 |
| E1338   | 2275    | WINDOW SASH                         | 835        | 14.44   | 481     | 23.44   | 99.82   | 6.69 |
| E1343   | 804     | MULLION                             | 317        | 8.42    | 601     | 20.05   | 131.48  | 1.25 |
| E1345   | 1442    | INSIDE OPENING SASH                 | 867        | 15.06   | 466     | 20.98   | 131.48  | 8.77 |
| E1346   | 1140    | DOOR SASH 44.7 mm                   | 445        |         |         |         |         | 3.82 |
| E1347   | 1045    | SASH                                | 481        |         |         |         |         |      |
| E1401   | 634     | CORNER JOINT 37 mm                  |            |         |         |         |         |      |
| E1402   | 4452    | THRESHOLD DOOR                      |            |         |         |         |         |      |
| E1403   | 5522    | FLY SCREEN                          |            |         |         |         |         |      |
| E1404   | 99      | CORNER JOINT 25 mm                  |            |         |         |         |         |      |
| E1405   | 118     | 6mm                                 |            |         |         |         |         |      |
| E1406   | 128     | 11mm                                |            |         |         |         |         |      |
| E1407   | 138     | 16mm                                |            |         |         |         |         |      |
| E1410   | 139     | 21mm                                |            |         |         |         |         |      |
| E1411   | 138     | 26mm                                |            |         |         |         |         |      |
| E1412   | 150     | 11mm                                |            |         |         |         |         |      |
| E1413   | 160     | 16mm                                |            |         |         |         |         |      |
| E1414   | 137     | 21mm                                |            |         |         |         |         |      |
| E1416   | 48      | 13.8 mm CORNER JOINT                |            |         |         |         |         |      |
| E1417   | 920     | ALUMINIUM CORNER JOINT 22.7[mm]     |            |         |         |         |         |      |
| E1418   | 736     | TRANSOM FLY SCREEN                  |            |         |         |         |         |      |
| E1419   | 292     | HANDLE AND T JOINT                  |            |         |         |         |         |      |
| E1420   | 410     | DOOR FOR 180°                       |            |         |         |         |         |      |
| E1421   | 424     | ORNAMENTAL                          |            |         |         |         |         |      |
| E1422   | 251     | ROD                                 |            |         |         |         |         |      |
| E1423   | 467     | DOOR RABBET                         |            |         |         |         |         |      |
| E1426   | 3013    | 51.5 mm CORNER JOINT                |            |         |         |         |         |      |
| E1427   | 2795    | LOUVER                              |            |         |         |         |         |      |
| E1452   | 1207    | Frame 377                           |            |         |         |         |         |      |
| E1453   | 1069    | Door Frame 321                      |            |         |         |         |         |      |
| E1454   | 1247    | 351In open shutter                  |            |         |         |         |         |      |
| E1455   | 1393    | Transom 382                         |            |         |         |         |         |      |
| E1456   | 400     | Architrave 164                      |            |         |         |         |         |      |
| E1457   | 1253    | Out open shutter 352                |            |         |         |         |         |      |
| E1458   | 1677    | Door skirting 504                   |            |         |         |         |         |      |
| E1459   | 1072    | 319Door Frame                       |            |         |         |         |         |      |
| E1570   |         | 1080 g/m                            |            |         |         |         |         |      |
| E1571   |         | 1140 g/m                            |            |         |         |         |         |      |
| E1573   |         | 1172 g/m                            |            |         |         |         |         |      |
| E1574   |         | 1545 g/m                            |            |         |         |         |         |      |
| E1575   |         | 1544 g/m                            |            |         |         |         |         |      |
| E1576   |         | 2380 g/m                            |            |         |         |         |         |      |
| E1577   |         | 1590 g/m                            |            |         |         |         |         |      |
| E1578   |         | 1045 g/m                            |            |         |         |         |         |      |
| E1601   |         | Similar to E1230 1442               |            |         |         |         |         |      |
| E1602   |         | Similar to E1237 1785               |            |         |         |         |         |      |
| E1603   |         | Similar to E1238 1785               |            |         |         |         |         |      |
| E1604   |         | Similar to E1278 2236               |            |         |         |         |         |      |
| E1605   |         | Similar to E1282 2471               |            |         |         |         |         |      |
| E1606   |         | Similar to E1211 2543               |            |         |         |         |         |      |
| E1613   |         | Similar to E1220 1355               |            |         |         |         |         |      |
| E1616   |         | Similar to E1210                    |            |         | 4.38    | 11.80   | 8.34    |      |
| E1617   |         | Similar to E1200                    |            |         | 6.50    | 14.91   | 4.60    |      |
| E2059   |         |                                     |            |         |         |         |         |      |
| E2075   |         | ALUMINIUM CORNER JOINT 41.4[mm]     |            |         |         |         |         |      |
| E2092   |         |                                     |            |         |         |         |         |      |
| E2101   |         | 6mm EPDM                            |            |         |         |         |         |      |
| E2102   |         | 4mm EPDM                            |            |         |         |         |         |      |
| E2103   |         | 2mm EPDM                            |            |         |         |         |         |      |
| E2104   |         | 4mm EPDM                            |            |         |         |         |         |      |
| E2110   |         | 2mm EPDM                            |            |         |         |         |         |      |
| E2111   |         | 45i EPDM                            |            |         |         |         |         |      |
| E2112   |         | 3mm EPDM                            |            |         |         |         |         |      |
| E2113   |         | 45 EPDM                             |            |         |         |         |         |      |
| E2114   |         | 45 EPDM                             |            |         |         |         |         |      |
| E2115   |         | 45i EPDM                            |            |         |         |         |         |      |
| E2123   |         |                                     |            |         |         |         |         |      |
| PB 48.7 |         | POLIBOND 4W-12H PB 48.700 3P        |            |         |         |         |         |      |

### **ACCESSORIES LIST**

|                                                               | 45  | 45i  |
| :------------------------------------------------------------ | :-- | :--- |
| C0010                                                         | \*  | \*   |
| WINGS-HINGE Giesse No. 00012                                  |     |      |
| C 0160 - without kit                                          |     |      |
| C0050                                                         | \*  | \*   |
| WINGS-HINGE Giesse old No. 0098X                              |     |      |
| Giesse No. 01110 for kit                                      |     |      |
| C1180 for Inside open                                         |     |      |
| C1190 for Outside open                                        |     |      |
| C0080                                                         | \*  | \*   |
| HINGE Giesse old No. 00120X                                   |     |      |
| Giesse No. 01090 (Turn & Tilt window handle)                  |     |      |
| C0090 (for inside open)                                       | \*  | \*\* |
| EURO CREMONE Giesse No. 01000                                 |     |      |
| For kit: C0190, C0380 & C0260 to be ordered separately        |     |      |
| Giesse old No. 01110                                          |     |      |
| C0110 for outside open                                        | \*  | \*\* |
| NOVA CREMONE Giesse No. 01004                                 |     |      |
| For kit: C0190, C0260, C0360 & C0310 to be ordered separately |     |      |

### **ACCESSORIES LIST**

|                                                      | 45   | 45i |
| :--------------------------------------------------- | :--- | :-- |
| C0140                                                | \*\* | \*  |
| EURP 900 CREMONE                                     |      |     |
| C0160                                                | \*\* | \*  |
| PESOS & SUPERGIAP ROD STRIKER                        |      |     |
| C0190                                                | \*\* | \*  |
| SINGLE-DOUBLE STRIKER                                |      |     |
| Giesse No. 01339                                     |      |     |
| (Giesse new No. 0098N)                               |      |     |
| (Giesse new No. 00120N)                              |      |     |
| (Giesse new No. 01033N)                              |      |     |
| C0200                                                | \*   | \*  |
| TAVELLIND SAMBA Giesse old No. 01635                 |      |     |
| Giesse No. 02150                                     |      |     |
| C0210                                                | \*   | \*  |
| FINGER CATCH Giesse No. 01701                        |      |     |
| Giesse No. 01954                                     |      |     |
| GRISBI                                               |      |     |
| C0230                                                | \*\* | \*  |
| LASER UNIT Giesse No. 01954                          |      |     |
| For top hung windows BUSHING 02159                   |      |     |
| C0240                                                | \*\* | \*  |
| RELEASABLE Giesse No. 02014                          |      |     |
| For bottom hung windows                              |      |     |
| Giesse No. 02255                                     |      |     |
| C0260                                                | \*\* | \*  |
| ROD TERMINAL Giesse No. 02114                        |      |     |
| Giesse No. 02269                                     |      |     |
| MAIGGIA A                                            | \*\* | \*  |
| TELESCOPIC                                           | \*\* | \*  |
| DOMUS                                                | \*\* | \*  |
| (Giesse new No. 01642/01652) For bottom hung windows |      |     |
| C0270                                                | \*   | \*  |
| PESOS LEVER BOLT FOR DOORS                           |      |     |
| C0280                                                | \*   | \*  |
| PESOS SECURITY TERMINAL                              |      |     |
| C0290                                                | \*\* | \*  |
| BRASS THRESHOLD CREMONE                              |      |     |

### **ACCESSORIES LIST**

|                                               | 45   | 45i  |
| :-------------------------------------------- | :--- | :--- |
| C0310                                         | \*\* | \*   |
| CONNECTING PIN                                |      |      |
| C0330                                         | \*\* | \*   |
| RABBET SEALS AND WING                         |      |      |
| C0340                                         | \*   | \*   |
| SUPLEMENTARY FASTENING                        |      |      |
| Giesse No. 02452                              |      |      |
| C0350                                         | \*   | \*   |
| HOLE COVER Giesse No. 02360                   |      |      |
| DRAINAGE                                      |      |      |
| C0360                                         | \*\* | \*   |
| CONNECTION KIT Giesse No. 02379               |      |      |
| Giesse No. 02668                              |      |      |
| C0380                                         | \*   | \*\* |
| CONNECTION BLOCKS Giesse No. 02387            |      |      |
| ELEMENT FOR STARDUE/NOVA ALUMINIUM            |      |      |
| Giesse No. 02315                              |      |      |
| C0420                                         | \*   | \*   |
| BIKE DOUBLE-BENT NYLON-HANDLE                 |      |      |
| C0460                                         |      | \*   |
| TWIN HANDLE BOLT KIT (for C 0420)             |      |      |
| C0660                                         | \*\* | \*   |
| SKATTO ADJUSTABLE FIXING TAB Giesse No. 06500 |      |      |
| C1150                                         | \*   | \*   |
| MASTER CP HANDLE                              |      |      |
| C1180                                         |      | \*   |
| Giesse No. 04070 For inside open windows      |      |      |
| C1190                                         |      | \*   |
| Giesse No. 02240 For outside open windows     |      |      |

### **KIT COPLANER**

|     |      |
| :-- | :--- |
| 45  | \*   |
| 45i | \*\* |

### **KIT OVERLAP**

|     |     |
| :-- | :-- |
| 45  |     |
| 45i | \*  |

### **TILT & TURN**

C 0640.2 - Hinge - Giesse Code - 4704
C 0640.3 - Mechanism - Giesse Code - 4711
C 0580.2 - Arm - Small - Giesse Code - 4200
C 0590.1 - Arm - Big - Giesse Code - 4761000V
C 1160 - Handle - Giesse Code - 1150
C 1170 - Kit for C 1160 - Giesse Code - 4071

### **TILT&TURN MECHANISM C0640**

|                       |     |
| :-------------------- | :-- |
| 45                    | \*  |
| 45i                   | \*  |
| Giesse No 04751N      |     |
| 04760 390-550 mm      |     |
| 04761 550-1700mm      |     |
| 1090N Giesse No.01090 |     |

### **AddITIONAL LOCKS TILT&TURN MECHANISM C0640**

|                  |     |
| :--------------- | :-- |
| 45               | \*  |
| 45i              | \*  |
| Giesse No 04751N |     |
| 04274            |     |
| 04282            |     |
| 04301N           |     |
| 04770            |     |

### **CORNER JOINTS**

|                                 | 45  | 45i  | Profiles          |
| :------------------------------ | :-- | :--- | :---------------- |
| E2075                           |     | \*\* | E1310             |
| ALUMINIUM CORNER JOINT 41.4[mm] |     |      |                   |
| E2075                           |     | \*\* | -E1210-E1230      |
| ALUMINIUM CORNER JOINT 67.6[mm] |     |      |                   |
| E2075                           |     | \*\* | E1314-E1320-E1330 |
| ALUMINIUM CORNER JOINT 28.7[mm] |     |      |                   |
| E2075                           |     | \*\* | E1243-E1343       |
| ALUMINIUM CORNER JOINT 22.7[mm] |     |      |                   |
| E1416                           | \*  | \*   |                   |
| ALUMINIUM CORNER JOINT          |     |      |                   |
| E1416                           |     | \*\* | E1210-E1230       |
| ALUMINIUM CORNER JOINT 41.4[mm] |     |      |                   |
| E2075                           |     | \*\* |                   |
| ALUMINIUM CORNER JOINT 67.6[mm] |     |      |                   |
| E1417                           |     | \*\* | E13               |
