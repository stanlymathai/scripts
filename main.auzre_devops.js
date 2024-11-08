const axios = require("axios");

// Replace these with your actual values
const organization = "Olopo";
const project = "ERP";
const epicId = "115"; // The ID of the epic under which the feature will be created
const personalAccessToken = "PAT"; // Your personal access token

// Base64 encode the PAT for authentication
const token = Buffer.from(":" + personalAccessToken).toString("base64");
const authHeader = { Authorization: "Basic " + token };

const workItemsData = {
  features: [
    {
      title: "Authentication Module",
      description:
        "Implement user authentication and authorization functionalities.",
      userStories: [
        {
          title: "Implement user registration and login",
          description:
            "Develop API endpoints for user registration and login using JWT for authentication and bcrypt for password hashing.",
          tasks: [
            {
              title: "Set up JWT authentication",
              description:
                "Implement JWT generation and validation for user sessions.",
            },
            {
              title: "Integrate bcrypt for password hashing",
              description:
                "Hash user passwords using bcrypt during registration.",
            },
            {
              title: "Create user registration endpoint",
              description:
                "Develop API endpoint to handle user registration requests.",
            },
            {
              title: "Create user login endpoint",
              description:
                "Develop API endpoint to authenticate users and provide JWT tokens.",
            },
            {
              title: "Validate user input data",
              description:
                "Ensure that user input data is validated and sanitized.",
            },
          ],
        },
        {
          title: "Enhance user model with store association",
          description:
            "Modify user authentication to include store information, allowing users to be associated with specific stores.",
          tasks: [
            {
              title: "Add store reference to user model",
              description: "Include store association field in the user model.",
            },
            {
              title: "Update authentication to handle store context",
              description:
                "Modify authentication service to include store ID in the user payload.",
            },
            {
              title: "Update database schema for user-store relationship",
              description:
                "Alter database schema to reflect the association between users and stores.",
            },
            {
              title: "Modify registration to assign store to user",
              description:
                "Update registration process to allow assignment of a store to a user.",
            },
          ],
        },
        {
          title: "Optimize 'verifyUser' middleware",
          description:
            "Improve the 'verifyUser' middleware to retrieve and include user and store IDs in the request object.",
          tasks: [
            {
              title: "Refactor 'verifyUser' middleware code",
              description:
                "Update the middleware to efficiently extract and attach user and store IDs to requests.",
            },
            {
              title: "Add error handling in middleware",
              description:
                "Ensure proper error handling for authentication failures.",
            },
            {
              title: "Test middleware with various user scenarios",
              description:
                "Write tests to validate middleware functionality with different user roles and permissions.",
            },
          ],
        },
        {
          title: "Implement MPIN reset functionality",
          description:
            "Provide functionality for users to reset their MPIN securely.",
          tasks: [
            {
              title: "Create MPIN reset endpoint",
              description:
                "Develop API endpoint to handle MPIN reset requests.",
            },
            {
              title: "Implement security checks for MPIN reset",
              description:
                "Add verification steps to confirm user identity before resetting MPIN.",
            },
            {
              title: "Integrate email/SMS notifications",
              description:
                "Notify users via email or SMS when their MPIN is reset.",
            },
            {
              title: "Update user model with MPIN reset fields",
              description:
                "Include fields in the user model to support MPIN reset logic.",
            },
          ],
        },
        {
          title: "Refactor authentication module",
          description:
            "Enhance the authentication module's performance and update response handling for better efficiency.",
          tasks: [
            {
              title: "Optimize authentication logic",
              description:
                "Refactor code to reduce redundant operations and improve efficiency.",
            },
            {
              title: "Standardize response formats",
              description:
                "Ensure all authentication responses follow a consistent structure.",
            },
            {
              title: "Update documentation for authentication module",
              description:
                "Revise documentation to reflect changes in the authentication module.",
            },
            {
              title: "Perform code review and cleanup",
              description:
                "Review code for potential improvements and remove unnecessary code.",
            },
          ],
        },
        {
          title: "Remove legacy user model",
          description:
            "Clean up the codebase by removing obsolete user models that are no longer in use.",
          tasks: [
            {
              title: "Identify and remove deprecated user models",
              description:
                "Locate old user models and safely remove them from the codebase.",
            },
            {
              title: "Update references to legacy models",
              description:
                "Ensure all references to legacy models are updated or removed.",
            },
            {
              title: "Test the system after removal",
              description:
                "Perform thorough testing to confirm that removal of legacy models doesn't affect functionality.",
            },
          ],
        },
      ],
    },
    {
      title: "Product Management Module",
      description:
        "Develop functionalities for managing products and categories within the API.",
      userStories: [
        {
          title: "Implement CRUD operations for products",
          description:
            "Create API endpoints for creating, reading, updating, and deleting products.",
          tasks: [
            {
              title: "Design product schema",
              description: "Define the product model with necessary fields.",
            },
            {
              title: "Develop 'Create Product' endpoint",
              description: "Implement API endpoint to create new products.",
            },
            {
              title: "Develop 'Read Product' endpoints",
              description:
                "Implement endpoints to retrieve product information.",
            },
            {
              title: "Develop 'Update Product' endpoint",
              description:
                "Implement API endpoint to update existing products.",
            },
            {
              title: "Develop 'Delete Product' endpoint",
              description: "Implement API endpoint to delete products.",
            },
            {
              title: "Validate product data",
              description:
                "Ensure all product data is validated before processing.",
            },
            {
              title: "Write unit tests for product endpoints",
              description:
                "Develop tests to ensure CRUD operations work as intended.",
            },
            {
              title: "Optimize product retrieval",
              description:
                "Use lean queries and optimize service functions for better performance.",
            },
            {
              title: "Add unique indexes to product schema",
              description: "Prevent duplicate products across multiple stores.",
            },
          ],
        },
        {
          title: "Implement CRUD operations for categories",
          description:
            "Develop API endpoints to manage product categories, including association with products.",
          tasks: [
            {
              title: "Design category schema",
              description:
                "Define the category model and its relationship with products.",
            },
            {
              title: "Develop 'Create Category' endpoint",
              description: "Implement API endpoint to create new categories.",
            },
            {
              title: "Develop 'Read Category' endpoints",
              description:
                "Implement endpoints to retrieve category information.",
            },
            {
              title: "Develop 'Update Category' endpoint",
              description:
                "Implement API endpoint to update existing categories.",
            },
            {
              title: "Develop 'Delete Category' endpoint",
              description: "Implement API endpoint to delete categories.",
            },
            {
              title: "Associate products with categories",
              description:
                "Establish and manage associations between products and categories.",
            },
            {
              title: "Validate category data",
              description:
                "Ensure all category data is validated before processing.",
            },
            {
              title: "Add product count to CategoryDTO",
              description:
                "Include the number of products in category responses.",
            },
          ],
        },
        {
          title: "Update product model with tax details",
          description:
            "Enhance the product model to include tax information and validate tax IDs during product creation.",
          tasks: [
            {
              title: "Add tax fields to product schema",
              description: "Include tax-related fields in the product model.",
            },
            {
              title: "Implement tax ID validation",
              description:
                "Ensure that provided tax IDs are valid and correspond to existing tax records.",
            },
            {
              title: "Update product creation and update logic",
              description:
                "Modify logic to handle new tax fields appropriately.",
            },
            {
              title: "Modify product endpoints to include tax data",
              description:
                "Ensure tax information is included in product API responses.",
            },
            {
              title: "Update documentation for product model changes",
              description:
                "Reflect changes in the product model in the documentation.",
            },
            {
              title: "Add tax description to ProductDTO",
              description:
                "Include tax details in product data transfer objects.",
            },
          ],
        },
        {
          title: "Add 'getProductsByCategory' endpoint",
          description:
            "Implement an endpoint to retrieve products based on their category, populating related fields.",
          tasks: [
            {
              title: "Develop 'Get Products By Category' endpoint",
              description:
                "Create an API endpoint that retrieves products filtered by category.",
            },
            {
              title: "Implement data population for related fields",
              description:
                "Ensure related fields (e.g., category and tax details) are included in the response.",
            },
            {
              title: "Optimize query for performance",
              description:
                "Use efficient query techniques to improve retrieval speed.",
            },
            {
              title: "Validate category input",
              description:
                "Ensure that the provided category identifiers are valid.",
            },
            {
              title: "Write tests for the new endpoint",
              description:
                "Develop tests to verify the endpoint functions correctly.",
            },
          ],
        },
      ],
    },
    {
      title: "Sales Module",
      description:
        "Develop functionalities related to sales transactions in the API.",
      userStories: [
        {
          title: "Implement sale creation functionality",
          description:
            "Develop API endpoints to create sales, including handling of sale details and validation.",
          tasks: [
            {
              title: "Design sales schema",
              description:
                "Define the sales model including all necessary fields.",
            },
            {
              title: "Develop 'Create Sale' endpoint",
              description:
                "Implement API endpoint to create new sales records.",
            },
            {
              title: "Handle sale details",
              description:
                "Ensure that sale details such as items sold, quantities, and prices are properly recorded.",
            },
            {
              title: "Implement data validation for sales",
              description:
                "Validate input data to prevent incorrect sales entries.",
            },
            {
              title: "Write tests for sale creation",
              description:
                "Develop tests to verify that sale creation works correctly.",
            },
            {
              title: "Add status field to account model",
              description:
                "Include a status indicator in the account model for sales.",
            },
            {
              title: "Integrate sale functions with account transactions",
              description:
                "Ensure sales update account balances appropriately.",
            },
          ],
        },
        {
          title: "Enhance sale models with store information",
          description:
            "Include store number in sale models and format bill numbers appropriately.",
          tasks: [
            {
              title: "Add store number to sales schema",
              description:
                "Modify the sales model to include the store number.",
            },
            {
              title: "Implement bill number formatting",
              description:
                "Develop logic to format bill numbers according to requirements.",
            },
            {
              title: "Update existing sales data",
              description:
                "Migrate or update existing sales records to include new fields if necessary.",
            },
            {
              title: "Update sales endpoints to handle new fields",
              description:
                "Ensure that the sales API endpoints include the new store information.",
            },
            {
              title: "Create counter model for sequence tracking",
              description:
                "Implement a model to track and generate sequential bill numbers.",
            },
          ],
        },
        {
          title: "Implement sale type validation",
          description:
            "Add validation for different sale types and refactor the assignment logic for clarity.",
          tasks: [
            {
              title: "Define sale types",
              description:
                "Identify and define the various sale types supported.",
            },
            {
              title: "Implement sale type validation logic",
              description:
                "Add checks to ensure that the sale type provided is valid.",
            },
            {
              title: "Refactor sale type assignment code",
              description:
                "Clean up the code assigning sale types for better readability.",
            },
            {
              title: "Update documentation with sale types",
              description:
                "Document the different sale types and how they are used.",
            },
            {
              title: "Add quick sale details schema",
              description: "Include a schema for quick sale transactions.",
            },
          ],
        },
        {
          title: "Refactor sales retrieval",
          description:
            "Use separate queries for Sale and QuickSale with improved data population for efficient retrieval.",
          tasks: [
            {
              title: "Separate queries for Sale and QuickSale",
              description:
                "Implement distinct queries for different sale models.",
            },
            {
              title: "Optimize data population",
              description:
                "Ensure that necessary related data is included without over-fetching.",
            },
            {
              title: "Improve retrieval performance",
              description: "Optimize queries for faster data retrieval.",
            },
            {
              title: "Update sales retrieval endpoints",
              description:
                "Modify API endpoints to use the new retrieval logic.",
            },
          ],
        },
        {
          title: "Improve sale detail validation",
          description:
            "Enhance validation of sale details within the sales model to prevent errors.",
          tasks: [
            {
              title: "Implement detailed validation for sale items",
              description: "Validate each item in the sale for correctness.",
            },
            {
              title: "Ensure data integrity",
              description:
                "Check for data consistency in quantities, prices, and product IDs.",
            },
            {
              title: "Handle validation errors gracefully",
              description:
                "Provide meaningful error messages for validation failures.",
            },
            {
              title: "Update unit tests for validation",
              description: "Write tests to cover new validation logic.",
            },
          ],
        },
        {
          title: "Clean up sale controllers",
          description:
            "Remove unnecessary code and refactor sale controllers for better maintainability.",
          tasks: [
            {
              title: "Review sale controller code",
              description: "Identify redundant or unused code.",
            },
            {
              title: "Refactor code for clarity",
              description: "Improve code structure and readability.",
            },
            {
              title: "Remove deprecated functions",
              description: "Eliminate functions that are no longer needed.",
            },
            {
              title: "Ensure functionality remains intact",
              description:
                "Test to confirm that refactoring doesn't introduce bugs.",
            },
          ],
        },
        {
          title: "Implement sales return functionality",
          description:
            "Develop API endpoints to handle sales returns and update inventory accordingly.",
          tasks: [
            {
              title: "Design sales return schema",
              description: "Define the model for sales return transactions.",
            },
            {
              title: "Develop 'Create Sales Return' endpoint",
              description: "Implement API endpoint to process sales returns.",
            },
            {
              title: "Update inventory on return",
              description: "Ensure returned items are added back to stock.",
            },
            {
              title: "Validate return data",
              description:
                "Check that return requests are valid and items are eligible for return.",
            },
            {
              title: "Write tests for sales return functionality",
              description: "Verify that sales returns are processed correctly.",
            },
          ],
        },
      ],
    },
    {
      title: "Transaction Module",
      description:
        "Enhance transaction handling, including purchases, account transactions, and tax transactions.",
      userStories: [
        {
          title: "Implement purchase transaction endpoints",
          description:
            "Develop API endpoints for managing purchase transactions.",
          tasks: [
            {
              title: "Design purchase transaction schema",
              description: "Define the model for purchase transactions.",
            },
            {
              title: "Develop 'Create Purchase Transaction' endpoint",
              description:
                "Implement endpoint to record new purchase transactions.",
            },
            {
              title: "Implement 'Read Purchase Transactions' endpoint",
              description: "Allow retrieval of purchase transaction records.",
            },
            {
              title: "Validate transaction data",
              description:
                "Ensure that all transaction data is correct and complete.",
            },
            {
              title: "Write tests for transaction endpoints",
              description: "Verify that the endpoints function correctly.",
            },
            {
              title: "Add purchase service functions",
              description: "Implement business logic for handling purchases.",
            },
          ],
        },
        {
          title: "Add account, stock, and tax transaction models",
          description:
            "Create schema models for account, stock, and tax transactions to handle financial operations.",
          tasks: [
            {
              title: "Design account transaction schema",
              description:
                "Define fields and relationships for account transactions.",
            },
            {
              title: "Design stock transaction schema",
              description: "Define the model for stock-related transactions.",
            },
            {
              title: "Design tax transaction schema",
              description:
                "Create schema for recording tax-related transactions.",
            },
            {
              title: "Implement model relationships",
              description:
                "Establish how these models interact with other entities.",
            },
            {
              title: "Update database with new schemas",
              description: "Apply migrations to create new tables/collections.",
            },
            {
              title: "Add initial tax transaction module functions",
              description: "Implement basic functions for tax transactions.",
            },
          ],
        },
        {
          title: "Include storeId in transaction models",
          description:
            "Enhance transaction models by adding the storeId field to associate transactions with stores.",
          tasks: [
            {
              title: "Add storeId field to transaction schemas",
              description: "Update models to include store association.",
            },
            {
              title: "Update transaction endpoints",
              description:
                "Ensure storeId is correctly handled in API endpoints.",
            },
            {
              title: "Modify data queries",
              description:
                "Adjust queries to filter or group by storeId where necessary.",
            },
            {
              title: "Ensure data consistency",
              description:
                "Validate that transactions are correctly linked to stores.",
            },
          ],
        },
        {
          title: "Fix account transaction creation logic",
          description:
            "Correct the swapping of source and destination account IDs in account transaction creation.",
          tasks: [
            {
              title: "Review account transaction logic",
              description: "Analyze the current logic to identify issues.",
            },
            {
              title: "Correct source and destination IDs",
              description: "Fix the code to ensure IDs are assigned correctly.",
            },
            {
              title: "Add unit tests to prevent regression",
              description: "Write tests to ensure the issue doesn't reoccur.",
            },
            {
              title: "Verify transaction records",
              description: "Check existing records for any inconsistencies.",
            },
          ],
        },
        {
          title: "Optimize transaction functions",
          description:
            "Enhance transaction handling functions for better performance and code organization.",
          tasks: [
            {
              title: "Refactor transaction services",
              description:
                "Improve code structure and efficiency in transaction services.",
            },
            {
              title: "Adhere to Separation of Concerns principles",
              description:
                "Ensure that each function has a single responsibility.",
            },
            {
              title: "Add unit tests for transaction functions",
              description:
                "Increase test coverage for transaction-related code.",
            },
          ],
        },
      ],
    },
    {
      title: "Customer Management Module",
      description:
        "Implement functionalities to manage customer information and interactions.",
      userStories: [
        {
          title: "Implement customer CRUD operations",
          description:
            "Develop API endpoints for creating, reading, updating, and deleting customer records.",
          tasks: [
            {
              title: "Design customer schema",
              description: "Define the model for customer entities.",
            },
            {
              title: "Develop 'Create Customer' endpoint",
              description: "Implement API endpoint to add new customers.",
            },
            {
              title: "Develop 'Read Customer' endpoints",
              description:
                "Implement endpoints to retrieve customer information.",
            },
            {
              title: "Develop 'Update Customer' endpoint",
              description: "Allow updating of customer details.",
            },
            {
              title: "Develop 'Delete Customer' endpoint",
              description: "Implement functionality to remove customers.",
            },
            {
              title: "Validate customer data",
              description:
                "Ensure that customer information is accurate and complete.",
            },
            {
              title: "Write tests for customer endpoints",
              description: "Test customer management functionalities.",
            },
          ],
        },
        {
          title: "Optimize customer module functions",
          description:
            "Improve performance and code quality in the customer module.",
          tasks: [
            {
              title: "Refactor customer service functions",
              description: "Enhance code structure and efficiency.",
            },
            {
              title: "Add unit tests",
              description: "Increase test coverage for customer-related code.",
            },
            {
              title: "Update documentation",
              description: "Ensure the customer module is well-documented.",
            },
          ],
        },
      ],
    },
    {
      title: "Staff Management Module",
      description:
        "Develop functionalities to manage staff members within the application.",
      userStories: [
        {
          title: "Implement staff CRUD operations",
          description:
            "Develop API endpoints to create, read, update, and delete staff members.",
          tasks: [
            {
              title: "Design staff schema",
              description: "Define the model for staff entities.",
            },
            {
              title: "Develop 'Create Staff' endpoint",
              description: "Implement API endpoint to add new staff members.",
            },
            {
              title: "Develop 'Read Staff' endpoints",
              description: "Allow retrieval of staff information.",
            },
            {
              title: "Develop 'Update Staff' endpoint",
              description: "Enable updating of staff details.",
            },
            {
              title: "Develop 'Delete Staff' endpoint",
              description: "Implement functionality to remove staff members.",
            },
            {
              title: "Validate staff data",
              description: "Ensure that staff information is accurate.",
            },
            {
              title: "Write tests for staff endpoints",
              description: "Test staff management functionalities.",
            },
          ],
        },
        {
          title: "Add StaffDTO to core DTOs",
          description: "Create a Data Transfer Object for staff entities.",
          tasks: [
            {
              title: "Define StaffDTO structure",
              description: "Specify the fields and data types for StaffDTO.",
            },
            {
              title: "Implement StaffDTO in services",
              description: "Use StaffDTO in staff-related service functions.",
            },
            {
              title: "Update endpoints to return StaffDTO",
              description: "Ensure API responses use the StaffDTO format.",
            },
          ],
        },
      ],
    },
    {
      title: "QR Code Module",
      description:
        "Implement functionalities related to QR code generation and logging.",
      userStories: [
        {
          title: "Add QR code generation",
          description:
            "Develop functions to generate QR codes for various entities.",
          tasks: [
            {
              title: "Integrate QR code library",
              description: "Use a library to generate QR codes.",
            },
            {
              title: "Create QR code generation functions",
              description:
                "Implement functions to generate QR codes as needed.",
            },
            {
              title: "Add QR log model",
              description: "Create a schema to log QR code generation events.",
            },
            {
              title: "Update QR routes",
              description: "Develop API endpoints to handle QR code requests.",
            },
            {
              title: "Write tests for QR code functionality",
              description: "Ensure QR code features work correctly.",
            },
          ],
        },
      ],
    },
    {
      title: "Reporting Module",
      description: "Develop advanced reporting features for the application.",
      userStories: [
        {
          title: "Add robust report generation features",
          description: "Implement comprehensive reporting capabilities.",
          tasks: [
            {
              title: "Integrate ExcelJS for report exports",
              description: "Use ExcelJS to export reports to Excel files.",
            },
            {
              title: "Develop customizable report templates",
              description: "Allow users to customize report formats.",
            },
            {
              title: "Implement filtering and sorting in reports",
              description: "Provide options to filter and sort report data.",
            },
            {
              title: "Optimize report generation performance",
              description: "Ensure reports are generated efficiently.",
            },
            {
              title: "Write tests for reporting features",
              description: "Verify that reports are accurate and reliable.",
            },
          ],
        },
      ],
    },
    {
      title: "Error Handling and Response Optimization",
      description:
        "Improve error handling mechanisms and optimize API responses for consistency.",
      userStories: [
        {
          title: "Implement global error handler",
          description:
            "Develop a global error handler to manage exceptions consistently across the API.",
          tasks: [
            {
              title: "Create global error handling middleware",
              description: "Implement middleware to catch and process errors.",
            },
            {
              title: "Define error response structure",
              description: "Standardize the format of error responses.",
            },
            {
              title: "Update existing code to use global handler",
              description:
                "Remove individual error handlers in favor of the global handler.",
            },
            {
              title: "Test error scenarios",
              description:
                "Ensure that errors are correctly caught and responses are appropriate.",
            },
            {
              title: "Document error handling approach",
              description:
                "Explain how errors are managed in the API documentation.",
            },
            {
              title: "Optimize 403 error messages",
              description:
                "Provide more informative messages for forbidden access.",
            },
          ],
        },
        {
          title: "Optimize HTTP status utilities",
          description:
            "Improve utilities for handling HTTP status codes throughout the application.",
          tasks: [
            {
              title: "Create utility functions for status codes",
              description:
                "Develop helper functions to standardize status code usage.",
            },
            {
              title: "Replace hard-coded status codes",
              description: "Update codebase to use the utility functions.",
            },
            {
              title: "Ensure consistency in status code usage",
              description:
                "Verify that correct status codes are used in all responses.",
            },
            {
              title: "Test API responses",
              description:
                "Check that API responses have correct status codes.",
            },
          ],
        },
        {
          title: "Refactor response functions",
          description:
            "Optimize 'sendCreatedResponse' and 'sendSuccessResponse' functions for better consistency and readability.",
          tasks: [
            {
              title: "Improve 'sendCreatedResponse' function",
              description: "Refine the function for clarity and efficiency.",
            },
            {
              title: "Improve 'sendSuccessResponse' function",
              description: "Enhance the function for consistent responses.",
            },
            {
              title: "Update code to use refactored functions",
              description:
                "Ensure all relevant parts of the code use the updated functions.",
            },
            {
              title: "Test response functions",
              description: "Verify that responses are correctly formatted.",
            },
          ],
        },
        {
          title: "Update error response status codes",
          description:
            "Ensure error responses use appropriate HTTP status codes for accurate client-side handling.",
          tasks: [
            {
              title: "Review error handling code",
              description:
                "Check that the correct status codes are used for different error types.",
            },
            {
              title: "Update error responses where necessary",
              description: "Correct any incorrect status codes.",
            },
            {
              title: "Document error status codes",
              description:
                "Provide a reference of error codes and their meanings.",
            },
            {
              title: "Test error responses",
              description: "Confirm that error responses behave as expected.",
            },
          ],
        },
      ],
    },
    {
      title: "Infrastructure and Configuration",
      description:
        "Set up infrastructure and configurations for the API project.",
      userStories: [
        {
          title: "Add Docker configurations",
          description:
            "Create Docker configurations to containerize the application for deployment.",
          tasks: [
            {
              title: "Write Dockerfile",
              description:
                "Define the Dockerfile to containerize the application.",
            },
            {
              title: "Create docker-compose.yml",
              description:
                "Set up docker-compose file for multi-container applications.",
            },
            {
              title: "Configure environment variables in Docker",
              description:
                "Ensure that environment variables are correctly passed to the container.",
            },
            {
              title: "Test Docker build and run",
              description:
                "Verify that the application runs correctly in the Docker container.",
            },
            {
              title: "Document Docker usage",
              description:
                "Provide instructions on how to use Docker with the application.",
            },
            {
              title: "Remove .env entry from Dockerfile",
              description:
                "Ensure sensitive data is not included in Docker images.",
            },
          ],
        },
        {
          title: "Set up database connections",
          description:
            "Establish connections to the database and manage configuration settings securely.",
          tasks: [
            {
              title: "Configure database connection strings",
              description: "Set up secure connections to the database.",
            },
            {
              title: "Implement connection pooling",
              description: "Optimize database connections for performance.",
            },
            {
              title: "Handle database errors",
              description:
                "Ensure proper error handling for database operations.",
            },
            {
              title: "Secure database credentials",
              description:
                "Use environment variables or secret management for credentials.",
            },
            {
              title: "Test database connectivity",
              description:
                "Confirm that the application can connect to the database.",
            },
            {
              title: "Optimize database indexes",
              description:
                "Improve query performance by indexing relevant fields.",
            },
          ],
        },
        {
          title: "Implement server start scripts",
          description:
            "Develop scripts to start the server and manage the application lifecycle.",
          tasks: [
            {
              title: "Write start script",
              description:
                "Create a script to start the server with necessary parameters.",
            },
            {
              title: "Write stop and restart scripts",
              description: "Implement scripts to stop and restart the server.",
            },
            {
              title: "Set up scripts for different environments",
              description:
                "Ensure scripts work in development, staging, and production.",
            },
            {
              title: "Document script usage",
              description: "Provide instructions on how to use the scripts.",
            },
            {
              title: "Update server start logging",
              description: "Enhance logging messages when the server starts.",
            },
          ],
        },
        {
          title: "Add environment configurations",
          description:
            "Set up environment variables and configurations for different environments (development, staging, production).",
          tasks: [
            {
              title: "Create configuration files",
              description: "Develop config files for each environment.",
            },
            {
              title: "Manage environment variables",
              description:
                "Set up .env files or use environment variable management tools.",
            },
            {
              title: "Ensure sensitive data is secure",
              description:
                "Avoid committing sensitive information to version control.",
            },
            {
              title: "Test configurations in each environment",
              description:
                "Verify that the application runs correctly in each environment.",
            },
            {
              title: "Update documentation",
              description:
                "Document how to configure and switch between environments.",
            },
          ],
        },
      ],
    },
  ],
};

/**
 * Creates a work item of the specified type under a parent work item.
 *
 * @param {string} parentId - The ID of the parent work item.
 * @param {string} workItemType - The type of work item to create (e.g., "Feature", "User Story", "Task").
 * @param {string} title - The title of the work item to create.
 * @param {object} additionalFields - An object containing additional fields to set on the work item.
 * @returns {Promise<number>} - The ID of the created work item.
 */
async function createWorkItemUnderParent(
  parentId,
  workItemType,
  title,
  additionalFields = {}
) {
  const url = `https://dev.azure.com/${organization}/${project}/_apis/wit/workitems/$${encodeURIComponent(
    workItemType
  )}?api-version=7.0`;

  const document = [
    {
      op: "add",
      path: "/fields/System.Title",
      value: title,
    },
    {
      op: "add",
      path: "/relations/-",
      value: {
        rel: "System.LinkTypes.Hierarchy-Reverse",
        url: `https://dev.azure.com/${organization}/_apis/wit/workItems/${parentId}`,
        attributes: {
          comment: `Linking ${workItemType} to parent ID ${parentId}`,
        },
      },
    },
  ];

  // Add additional fields to the document
  for (const [field, value] of Object.entries(additionalFields)) {
    document.push({
      op: "add",
      path: `/fields/${field}`,
      value: value,
    });
  }

  try {
    const response = await axios({
      method: "post",
      url: url,
      headers: {
        "Content-Type": "application/json-patch+json",
        ...authHeader,
      },
      data: document,
    });

    console.log(
      `${workItemType} created successfully with ID:`,
      response.data.id
    );
    return response.data.id;
  } catch (error) {
    console.error(
      `Error creating ${workItemType}:`,
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

/**
 * Processes the work items from the embedded data, creating features, user stories, and tasks accordingly.
 */
async function processWorkItems() {
  try {
    for (const feature of workItemsData.features) {
      // Create Feature with specific assigned to and state
      const featureId = await createWorkItemUnderParent(
        epicId,
        "Feature",
        feature.title,
        {
          "System.Description": feature.description,
          "System.AssignedTo": "stanly.math.ai@olopo.app",
          "System.State": "Active",
        }
      );

      for (const userStory of feature.userStories) {
        // Create User Story with specific fields
        const userStoryId = await createWorkItemUnderParent(
          featureId,
          "User Story",
          userStory.title,
          {
            "System.Description": userStory.description,
            "System.AssignedTo": "stanly.math.ai@olopo.app",
            "System.State": "QA",
            "System.Tags": "API; Priority 1",
          }
        );

        // Process tasks within each user story
        if (userStory.tasks) {
          for (const task of userStory.tasks) {
            // Create Task with specific fields
            await createWorkItemUnderParent(userStoryId, "Task", task.title, {
              "System.Description": task.description,
              "System.AssignedTo": "stanly.math.ai@olopo.app",
              //   "System.State": "In Progress",
            });
          }
        }
      }
    }
    console.log("All work items processed successfully.");
  } catch (error) {
    console.error("An error occurred during the creation process.");
  }
}

// Start processing work items from the embedded JSON data
processWorkItems();
