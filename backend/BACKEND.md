### Backend folder structure
backend/
│
├── src/
│ ├── controllers/ // Controllers handle the logic for each route.
│ │ ├── programController.js
│ │ └── tagController.js
│ ├── models/
│ │ └── db.js // This module configures and exports the database connection.
│ ├── routes/ // Routes define the endpoints of the API and link them to the appropriate controller functions.
│ │ ├── index.js
│ │ ├── programRoutes.js
│ │ └── tagRoutes.js
│ └── utils/
│ └── // any utility functions or middleware
├── .env // Environment variables
├── package.json
└── server.js // This is the entry point of the Express server. It sets up middleware and routes.

### How to run the backend:
- You must be the root of the backend folder like  `cd backend ` (/path/STEM-NAVIGATOR/backend)
- Run backend: ` node server.js`