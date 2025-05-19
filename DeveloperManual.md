# Developer Manual for mmip-map-server

This guide is for developers who want to set up, run, and contribute to the mmip-map-server project. 
This server powers the Map of Missing and Murdered Indigenous People (MMIP) Cases platform.

## Installation

1. Prerequisites: Node.js (v18 or more) & npm (included in Node.js)

2. Clone the repository:  
git clone <your-repository-url>
cd mmip-map-server

3. Install dependencies: npm install

## Running the Application

Start the server with node index.js

The API will be available at http://localhost:443/

## Running Tests

Currently, there are no automated tests implemented.
To run the (placeholder) test script use npm test

Feel free to add tests using a framework like Jest or Mocha.

## API Endpoints

Here are the main API endpoints (you can update as you go):

GET /
Health check

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

Note:  
- For POST and PATCH, send JSON in the request body.
- For DELETE and PATCH, provide the case `id` as a URL parameter.

## Known Bugs:
No critical bugs are currently documented, automated testing is not yet implemented, error handling and input validation may need improvement.

## Roadmap for Future Development:
Add comprehensive automated tests, improve API documentation (consider Swagger/OpenAPI), enhance error handling and input validation, add authentication and authorization if required, improve logging and monitoring, optimize performance and scalability.


