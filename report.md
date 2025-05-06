API Selection
REST Countries API
API URL: https://restcountries.com/v3.1/
Selection Rationale:

Free and public API with no authentication required
Comprehensive country data covering multiple aspects
Well-documented endpoints with predictable response formats
Reliable uptime and performance
Data is regularly updated
CORS-enabled for browser-based applications

Endpoints Used:

/all: Retrieves data for all countries
/region/{region}: Filters countries by specific region
/alpha/{code}: Gets detailed data for a specific country by code

Alternative APIs Considered

World Bank API: More specialized economic data but more complex to implement
Countries Now API: Required authentication and had rate limitations
Custom dataset: Would require maintenance and updates

Technical Challenges & Solutions

Challenge 1: Data Processing and Normalization

Issue: The API returns data with inconsistent structures and missing values for some countries.

Solution:
Implemented robust data filtering and validation
Added null checks before calculations
Used defensive programming techniques to handle edge cases

Example: For population density calculations, filtered out countries with zero area values

Challenge 2: Dynamic SVG Pie Chart Creation

Issue: Creating a responsive, data-driven pie chart with dynamic segment sizing.

Solution:
Calculated segment angles based on data proportions
Used SVG path calculations to create arc segments
Implemented responsive viewBox for scaling
Added interactive elements like tooltips

Challenge 3: Responsive Design Implementation
Issue: Creating a layout that adapts seamlessly across device sizes while maintaining data visualization integrity.

Solution:
Utilized Tailwind CSS's responsive grid system
Adjusted chart sizes and orientation based on screen width
Implemented scrollable containers for data-heavy sections on small screens
Used flexible typography sizing

Challenge 4: Testing Dynamic Visualizations

Issue: Testing components with complex visual rendering and data processing.

Solution:
Isolated pure functions for unit testing
Created mock API responses for consistent test data
Used React Testing Library to test component interactions
Implemented snapshot testing for UI stability