# eCommerce API

Welcome to the **eCommerce API** repository! This API serves as the backbone of an online store, providing the essential services for managing products, users, and more. Whether you're building your own eCommerce platform or looking to integrate this API into your existing project, you're in the right place!

##  Features

- **User Authentication:** Secure login/signup with JWT tokens.
- **Product Management:** Add, update, delete, and fetch products.
- **Search & Filter:** Search for products by categories, names, prices, and more. *(In the pipeline)*
- **Admin Dashboard:** Manage users, products, and orders from an admin panel. *(In the pipeline)*
- **Order Processing:** Manage and track orders. *(In the pipeline)*
- **Payment Integration:** Integrating payment gateways for secure payments. *(In the pipeline)*

##  Installation

To get started with the eCommerce API, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/ecommerce-api.git
    cd ecommerce-api
    ```

2. **Install dependencies:**

    Install the required dependencies with npm or yarn:

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Configure the environment:**

    Create a `.env` file in the root directory and set up the necessary environment variables:

    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=password
    DB_NAME=ecommerce
    JWT_SECRET=your_jwt_secret_key
    PAYMENT_API_KEY=your_payment_gateway_api_key
    ```

4. **Run the API:**

    To start the API server locally, run:

    ```bash
    npm start
    # or
    yarn start
    ```

    The server will be running on `http://localhost:3000`.

##  API Endpoints

### Authentication

- `POST /api/auth/register`: Create a new user.
- `POST /api/auth/login`: User login and get a JWT token.

### Users

- `GET /api/users`: List all users (Admin Only).
- `GET /api/users/:id`: Get user details by ID.
- `PUT /api/users/:id`: Update user information.
- `DELETE /api/users/:id`: Delete a user (Admin Only).

### Products

- `GET /api/products`: List all products.
- `GET /api/products/:id`: Get product details by ID.
- `POST /api/products`: Create a new product (Admin Only).
- `PUT /api/products/:id`: Update product details.
- `DELETE /api/products/:id`: Delete a product.

### Orders *(In the pipeline)*

- `GET /api/orders`: List all orders.
- `GET /api/orders/:id`: Get order details by ID.
- `POST /api/orders`: Create a new order.
- `PUT /api/orders/:id`: Update order status.
- `DELETE /api/orders/:id`: Delete an order.

### Payments *(In the pipeline)*

- `POST /api/payments`: Process a payment for an order.

## 🧪 Testing

You can run the unit tests with the following command:

```bash
npm test
# or
yarn test

```
##  Technologies Used
`Node.js –` JavaScript runtime environment.
`Express.js –` Web framework for Node.js.
`MongoDB –` NoSQL database for storing products, users, and orders.
`JWT – `JSON Web Tokens for secure user authentication.
`Stripe or PayPal –` Payment gateways for handling transactions.

