1. API Development:
   ● Create a RESTful API that manages two related resources. For example,
   you could use a simple e-commerce scenario with Products and Orders,
   where each order can contain multiple products.
   ● Ensure the API supports basic CRUD operations for both resources.
   Include routes to:
   ● Add, update, and remove products.
   ● Create, update, and view orders. An order should reference one or
   more products and include quantities for each.
   ● Handle requests and responses in JSON format.
   ● Implement middleware for basic authentication to protect the API routes.
2. External API Integration:
   ● Integrate an external API to enhance the functionality of your application.
   For instance, if you’re working with orders, you might integrate a shipping
   API to fetch real-time shipping costs based on the product size and
   delivery location.
   ● Implement robust error handling and basic caching for responses from the
   external API to improve performance.

3. Database Integration:
   ● Connect your API to a relational database like PostgreSQL or MySQL.
   ● Model the database to handle relationships between products and orders
   effectively. Ensure foreign key constraints are set up for integrity.
   ● Implement database operations including inserting, retrieving, updating,
   and deleting data. Make sure to handle operations that involve
   relationships (e.g., adding products to orders, updating quantities).

4. Unit Tests:
   ● Extend unit testing to cover the logic related to handling relations between
   resources.
   ● Include tests for each API endpoint, focusing on both individual resource
   integrity and the integrity of their relationships (e.g., ensuring an order
   cannot be placed with an invalid product ID).

5. Frontend Application:
   ● Develop a simple web application that uses the API created in Part 1.
   ● Implement basic forms to interact with the API: creating, displaying, and
   deleting resources.

   ● Provide feedback to the user on successful or failed API interactions. 2. User Authentication:
   ● Implement a simple login form that interacts with the backend for user
   authentication.
   ● Display authenticated user data.
