# SnapCard – Fashion E-Commerce Website

## 1. Project Overview

**SnapCard** is a full-stack fashion e-commerce website developed to provide users with a simple and convenient online shopping experience.

Users can explore fashion products, search for items, filter products by category, create an account, log in, add products to their cart, manage their wishlist, and place orders.

The project combines a React frontend, a Java Spring Boot backend, and a MySQL database to demonstrate how a full-stack web application works.

## 2. Project Objectives

- To develop a user-friendly online fashion shopping website.
- To display fashion products with their details, prices, and images.
- To implement user registration and login functionality.
- To provide shopping cart and wishlist features.
- To allow users to place orders online.
- To store and manage product, user, and order information in a MySQL database.
- To understand frontend, backend, and database integration.

## 3. Key Features

### User Features
- User registration and login.
- Browse available fashion products.
- Search for products by name.
- Filter products by category.
- Add and remove products from the wishlist.
- Add products to the shopping cart.
- Increase or decrease product quantities.
- Place orders through the website.

### Admin and Database Management
- Store product information in MySQL.
- Store registered user information in MySQL.
- Save order details and ordered items in the database.
- Retrieve stored records using SQL queries in MySQL Workbench.

*Note: The current project focuses on the implemented shopping features and database operations. A separate admin dashboard is not included unless added later.*

## 4. Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Builds the website user interface |
| JavaScript | Handles frontend interactions and application logic |
| Vite | Runs the frontend development server |
| CSS | Styles the website and layouts |
| Java | Implements backend application logic |
| Spring Boot | Creates REST APIs and handles requests |
| Spring Data JPA | Connects Java application logic with database operations |
| MySQL | Stores users, products, and order information |
| MySQL Workbench | Helps create, query, and inspect database records |
| Git and GitHub | Manage and host project source code |

## 5. System Architecture

SnapCard follows a three-layer architecture.

1. **Frontend – React.js:** Displays the website and collects user actions, such as searching for products and placing orders.
2. **Backend – Spring Boot:** Receives API requests, processes application logic, and communicates with the database.
3. **Database – MySQL:** Stores and retrieves product, user, and order information.

### How the Application Works

1. The user opens the SnapCard website.
2. React displays the products and shopping interface.
3. The frontend sends API requests to the Spring Boot backend.
4. The backend processes the requests and communicates with MySQL.
5. MySQL stores or returns the required information.
6. The backend sends a response to the frontend, which updates the website.

## 6. Database Design

The project uses the `snapcard_db` database.

The main tables are:

- **products:** Stores product details, such as names, categories, and prices.
- **snapcard_users:** Stores registered user information.
- **snapcard_orders:** Stores order-level information, such as customer details and order totals.
- **snapcard_order_items:** Stores individual products associated with an order.

The order and order-item tables work together to represent a customer's purchase and the products included in it.

## 7. Project Folder Structure

```text
SnapCard-Starter/
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── AuthPage.jsx
│   ├── package.json
│   └── index.html
│
└── backend/
    ├── src/
    │   └── main/
    │       ├── java/
    │       │   └── com/snapcard/
    │       │       ├── auth/
    │       │       ├── product/
    │       │       ├── order/
    │       │       └── SnapCardApplication.java
    │       └── resources/
    │           └── application.properties
    └── pom.xml
```

*The structure above is a simplified overview. Your actual project may contain additional files and packages.*

## 8. Requirements

Before running the project, install:

- Java Development Kit (JDK) 21
- Node.js and npm
- MySQL Server 8 or a compatible version
- MySQL Workbench
- Eclipse IDE or another Java IDE
- Visual Studio Code or another frontend editor

## 9. How to Run the Project

### Step 1: Set Up the Database

1. Open MySQL Workbench.
2. Connect to your MySQL server.
3. Create or select the project database:

```sql
CREATE DATABASE IF NOT EXISTS snapcard_db;
USE snapcard_db;
```

4. Configure the database connection in the backend's `application.properties` file.
5. Ensure the backend's JPA configuration and entity mappings are set up to create or use the required tables.

**Important:** Do not upload your real database password or other secret credentials to a public GitHub repository.

### Step 2: Run the Backend

1. Open the `backend` folder in Eclipse as a Maven project.
2. Locate `SnapCardApplication.java`.
3. Run it as a Java application.
4. Check the Eclipse Console and wait for Spring Boot to start successfully.

The backend runs locally on:

`http://localhost:8080`

The product API is available at:

`http://localhost:8080/api/products`

### Step 3: Run the Frontend

1. Open the `frontend` folder in VS Code.
2. Open the integrated terminal.
3. Run the following commands:

```bash
npm install
npm run dev
```

4. Open the local URL displayed in the terminal. The usual Vite development URL is:

`http://localhost:5173/`

### Step 4: Test the Website

- Open the SnapCard frontend.
- Browse, search, and filter products.
- Register a user and log in.
- Add products to the cart and wishlist.
- Place a test order.
- Verify the stored information in MySQL Workbench.

Both the backend and frontend must be running for features that depend on the API.

## 10. Useful MySQL Queries

Select the project database:

```sql
USE snapcard_db;
```

View all products:

```sql
SELECT * FROM products;
```

View registered users:

```sql
SELECT * FROM snapcard_users;
```

View placed orders:

```sql
SELECT * FROM snapcard_orders
ORDER BY id DESC;
```

View the products included in orders:

```sql
SELECT * FROM snapcard_order_items;
```

Count the number of orders:

```sql
SELECT COUNT(*) AS total_orders
FROM snapcard_orders;
```

These queries help verify that product, user, and order information is stored in the database.

## 11. Benefits and Learning Outcomes

- Practical understanding of full-stack web development.
- Experience integrating React with Spring Boot REST APIs.
- Understanding of database connectivity using MySQL.
- Experience performing CRUD-related database operations.
- Understanding of user authentication and e-commerce workflows.
- Experience using GitHub to manage and share source code.

## 12. Future Enhancements

- Dedicated admin dashboard for managing products and orders.
- Secure authentication with password hashing and role-based access.
- Payment gateway integration.
- Order history and order tracking for users.
- Product reviews and ratings.
- Improved mobile responsiveness.
- Product image upload and inventory management.

## 13. Conclusion

SnapCard demonstrates the development of a full-stack fashion e-commerce application using React.js, Java Spring Boot, and MySQL. It connects the user interface, backend APIs, and database to support essential online shopping operations, including product browsing, user registration, cart management, and order placement.

The project provides practical experience in full-stack application development and can be extended with additional features to build a more complete e-commerce platform.

---

**Project Name:** SnapCard  
**Project Type:** Full-Stack Fashion E-Commerce Website  
**Frontend:** React.js and Vite  
**Backend:** Java and Spring Boot  
**Database:** MySQL  
**Development Status:** Local development project
