# 🚀 Route - Assignment 5 Solution

Welcome to the solution repository for **Assignment 5**. This assignment demonstrates a solid understanding of database design, schema mapping, and practical backend integration using Node.js and MySQL.

## 📁 Project Structure

The repository contains the following files:

### 🎨 Part 1 & 2 (Database Design)
- `ERD_Diagram.png` *(or .pdf)*: The Entity-Relationship Diagram (ERD) designed for the **Musicana** records database scenario.
- `Schema_Mapping.png` *(or .pdf)*: The relational schema design mapped from the provided User-Product ERD.

### 💻 Part 3 (Node.js & MySQL Integration)
- `database_queries.js` *(Rename if necessary)*: The Node.js script containing all the required SQL queries to manage the `retail_store` database (Creating tables, CRUD operations, Joins, and User Privileges) using the `mysql2` package.
- `retail_store.sql`: The final SQL dump file containing the database structure and data after executing all the required queries.

---

## ⚙️ Prerequisites

To run the Node.js script and set up the database, you need the following installed on your machine:
- [Node.js](https://nodejs.org/)
- MySQL Server (e.g., via XAMPP, WAMP, or standalone MySQL installation)

---

## 🚀 How to Run

### 1. Database Setup
Ensure your MySQL server is running. You don't need to manually create the tables, as the Node.js script will handle the creation and data insertion.
*(Alternatively, you can manually import the `retail_store.sql` file into your phpMyAdmin).*

### 2. Install Dependencies
Open your terminal in the project directory and install the required `mysql2` package:
```bash
npm install mysql2
```

### 3. Database Credentials Configuration
Before running the script, open `database_queries.js` and ensure the MySQL connection credentials match your local setup:
```javascript
const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',       // Replace with your MySQL username
  password: '',       // Replace with your MySQL password
  database: 'retail_store' 
});
```
*(Make sure to create an empty database named `retail_store` in your MySQL server before running the script).*

### 4. Execute the Script
Run the following command to execute all assignment queries sequentially:
```bash
node database_queries.js
```

---

## 📚 Assignment Breakdown

- **Part 1:** ERD design handling complex relationships (Many-to-Many, One-to-Many) for Musicians, Instruments, Albums, and Songs.
- **Part 2:** Transforming an ERD into a functional relational database schema.
- **Part 3:** Writing raw SQL queries via Node.js to:
  - Create tables with Primary/Foreign keys (`Products`, `Suppliers`, `Sales`).
  - Alter table schemas (Add/Remove columns, modify data types, add constraints).
  - Perform CRUD operations (INSERT, UPDATE, DELETE).
  - Use aggregation functions (`SUM()`) and `JOIN`s to retrieve analytical data.
  - Manage database users and grant/revoke specific privileges (`SELECT`, `INSERT`, `UPDATE`, `DELETE`).
