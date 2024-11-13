"Design and develop a mobile and web application for managing project costs and tracking progress, specifically tailored for construction projects involving aluminum and glass facades. This app should be particularly useful for companies like Balexco or their clients who are involved in designing, fabricating, and installing such facades.

**Core Features:**

**1. Project Management:**

- **Project Creation:** Allow users to create new projects, providing details like project name, client name, location, start and end dates.
- **Facade Section Definition:** Users should be able to define distinct facade sections within a project (e.g., 'North Elevation', 'West Wing'). For each section, they need to specify the section type (e.g., 'Curtain Wall', 'Window Wall') and the total area in square meters.
- **Progress Tracking:** Enable tracking of project progress. This could involve marking sections as 'Design Phase', 'Fabrication', 'Installation', or 'Completed'. A visual representation of the overall project progress (e.g., a Gantt chart or progress bar) would be beneficial.

**2. Window and Door Specification:**

- **Window/Door Library:** The app should include a pre-populated library of standard window and door types offered by Balexco, as detailed in the source document (e.g., Casement, Sliding, Top Hung, etc.). This library should pull data directly from the source document, including profile names (like 'E1200', 'E1201'), descriptions (e.g., 'Z FRAME', 'L FRAME'), and their corresponding dimensions from sections like 'Profiles with Dimensions'.
- **Window/Door Customization:** Users should have the ability to select the desired window/door type for each facade section. The app should automatically populate the necessary aluminum profiles based on the selected type and dimensions of the window/door, leveraging data from the source document.
- **Custom Window/Door Creation:** For non-standard designs, users should be able to create custom windows and doors by manually selecting the required aluminum profiles from the Balexco catalog (source document).

**3. Material and Cost Management:**

- **Material Database:** A central database storing information about materials used in facade construction. This should include details like material name, unit (e.g., meter, piece), unit price (in BHD), supplier information, and current stock levels.
- **Automatic Material Calculation:** As users specify windows/doors and facade sections, the app should automatically calculate the required quantities of each material (aluminum profiles, glass, hardware) based on the chosen dimensions and the pre-defined material compositions from the source document (e.g., the specific profiles required for a 'Casement Top Hung' window).
- **Cost Estimation:** Real-time calculation and display of the total estimated material cost for each facade section and the overall project. This calculation should consider the quantities of materials, their unit prices, and any applicable discounts or markups.

**4. Labor and Time Tracking:**

- **Labor Database:** A database to manage labor types involved in facade projects (e.g., 'Installation', 'Fabrication', 'Design'). For each labor type, specify an hourly rate (in BHD) and, optionally, standard time estimates for common tasks (e.g., installation time per square meter of curtain wall).
- **Time Tracking:** Functionality for users to log their time spent on different project tasks. This could be done manually or through integration with time-tracking software.
- **Labor Cost Calculation:** Based on logged hours and the defined hourly rates, the app should calculate the total labor cost for each project task and the overall project.

**5. Vendor and Purchase Order Management:**

- **Vendor Database:** Store information about material suppliers, including company name, contact details, and payment terms.
- **Purchase Order Generation:** The app should allow users to create purchase orders directly within the app, pulling data from the vendor database and the calculated material quantities. Purchase orders should be printable or exportable in standard formats (e.g., PDF).

**6. Reporting and Analytics:**

- **Cost Reports:** Generate detailed cost reports for each project, breaking down costs by material type, labor, and other expenses. Reports should be customizable by date range, facade section, or other filters.
- **Progress Reports:** Generate reports showing the current progress of the project, potentially including a comparison between planned and actual progress.
- **Material Consumption Analytics:** Provide insights into material consumption patterns for different project types, helping optimize purchasing and inventory management.
- **Labor Efficiency Analytics:** Analyze labor time data to identify areas for improving efficiency in various project phases.

**7. Admin Panel:**

- **Access Control:** Implement role-based access control, allowing administrators to manage users, define permissions, and control access to sensitive features (e.g., cost data, database management).
- **Data Management:** Administrators should be able to manage all the underlying databases (materials, labor, vendors, etc.) by adding, editing, and deleting entries.
- **System Settings:** Configure system-wide settings, such as default currency (BHD), tax rates, or reporting templates.

**UI/UX Considerations:**

- **Intuitive Navigation:** Design a user-friendly interface with clear navigation, making it easy for users to move between different app sections (Project Management, Cost Estimation, Reporting).
- **Mobile Responsiveness:** The app should be responsive and work seamlessly on both mobile devices and desktop web browsers.
- **Data Visualization:** Employ effective data visualization techniques (graphs, charts, dashboards) to present cost and progress information in a clear and understandable way.

**Data Sources:**

- The primary data source for populating the app's initial material library (aluminum profiles, descriptions, dimensions) will be the provided Balexco document "874199a02cf57294a6cf4f1ab82826e0.pdf."
- Data for material prices, labor rates, and vendor information would require external research and input from the user.
- The app should allow users to easily update and manage this data over time.

- Allow for future scalability and customization to accommodate the evolving needs of the construction industry.
