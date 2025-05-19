# Developer Manual for mmip-map-server

This guide is for developers who want to set up, run, and contribute to the mmip-map-server project. 
This server powers the Map of Missing and Murdered Indigenous People (MMIP) Cases platform.

## Installation

1. Prerequisites: Node.js (v18 or more) & npm (included in Node.js)

2. Clone the repository:  
git clone https://github.com/linishere-Murdered-and-Missing-Relatives-Map.git
cd -Murdered-and-Missing-Relatives-Map

3. Install dependencies: npm install

## Running the Application

Start the server with node index.js

The API will be available at http://localhost:3000/

## Running Tests

Currently, there are no automated tests implemented.

Feel free to add tests using a framework like Jest or Mocha.

## API Endpoints

Here are the main API endpoints (you can update as you go):

GET /api/cases
List all MMIP cases

GET /api/cases/:id
Get details for a specific case

POST /api/cases
Add a new MMIP case

PATCH /api/cases/:id
Update an MMIP case

DELETE /api/cases/:id
Delete an MMIP case

GET /api/stats 
Returns aggregated case statistics

Note:  
- For POST and PATCH, send JSON in the request body.
- For DELETE and PATCH, provide the case `id` as a URL parameter.

## Known Bugs:
No critical bugs are currently documented, automated testing is not yet implemented, error handling and input validation may need improvement.

## Roadmap for Future Development:
- Add case search by name, age, or tribal affiliation 
- Integrate user-generated case submissions with mdoeration 
- Implement multilingual support (e.g. Cree, Ojibwe) 
- Integrate heatmap and statistical overlays


