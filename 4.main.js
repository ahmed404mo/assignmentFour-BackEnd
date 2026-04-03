const mysql = require('mysql2/promise');

async function runDatabaseQueries() {
  try {
    // إعداد الاتصال بقاعدة البيانات
    // تأكد من إنشاء قاعدة بيانات باسم retail_store في MySQL قبل تشغيل الكود
    const db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',       
      password: '1234',       
      database: 'retail_store'
    });

    console.log("✅ Connected to the database successfully!\n");

    // ==========================================
    // Part 3: (Using Node.js and MySQL) generate queries that perform the following tasks:
    // ==========================================

    // 1- Create the required tables for the retail store database based on the tables structure and relationships. (0.5 Grade)
    await db.query(`
      CREATE TABLE IF NOT EXISTS Suppliers (
        SupplierID INT AUTO_INCREMENT PRIMARY KEY,
        SupplierName TEXT,
        ContactNumber TEXT
      )
    `);
    await db.query(`
      CREATE TABLE IF NOT EXISTS Products (
        ProductID INT AUTO_INCREMENT PRIMARY KEY,
        ProductName TEXT,
        Price DECIMAL(10,2),
        StockQuantity INT,
        SupplierID INT,
        FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID)
      )
    `);
    await db.query(`
      CREATE TABLE IF NOT EXISTS Sales (
        SaleID INT AUTO_INCREMENT PRIMARY KEY,
        ProductID INT,
        QuantitySold INT,
        SaleDate DATE,
        FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
      )
    `);
    console.log("1. Tables created successfully.");

    // 2- Add a column "Category" to the Products table. (0.5 Grade)
    await db.query(`
      ALTER TABLE Products ADD COLUMN Category VARCHAR(100)
    `);
    console.log("2. Added Category column.");

    // 3- Remove the "Category" column from Products. (0.5 Grade)
    await db.query(`
      ALTER TABLE Products DROP COLUMN Category
    `);
    console.log("3. Removed Category column.");

    // 4- Change "ContactNumber" column in Suppliers to VARCHAR (15). (0.5 Grade)
    await db.query(`
      ALTER TABLE Suppliers MODIFY COLUMN ContactNumber VARCHAR(15)
    `);
    console.log("4. Changed ContactNumber data type.");

    // 5- Add a NOT NULL constraint to ProductName. (0.5 Grade)
    await db.query(`
      ALTER TABLE Products MODIFY COLUMN ProductName VARCHAR(150) NOT NULL
    `);
    console.log("5. Added NOT NULL constraint to ProductName.");

    // 6- Perform Basic Inserts: (0.5 Grade)
    // a. Add a supplier with the name 'FreshFoods' and contact number '01001234567'.
    await db.query(`
      INSERT INTO Suppliers (SupplierName, ContactNumber) 
      VALUES ('FreshFoods', '01001234567')
    `);

    // b. Insert the following three products, all provided by 'FreshFoods':
    // i. 'Milk' with a price of 15.00 and stock quantity of 50.
    // ii. 'Bread' with a price of 10.00 and stock quantity of 30.
    // iii. 'Eggs' with a price of 20.00 and stock quantity of 40.
    // (Assuming SupplierID 1 is FreshFoods)
    await db.query(`
      INSERT INTO Products (ProductName, Price, StockQuantity, SupplierID) 
      VALUES 
      ('Milk', 15.00, 50, 1),
      ('Bread', 10.00, 30, 1),
      ('Eggs', 20.00, 40, 1)
    `);

    // c. Add a record for the sale of 2 units of 'Milk' made on '2025-05-20'.
    // (Assuming ProductID 1 is Milk)
    await db.query(`
      INSERT INTO Sales (ProductID, QuantitySold, SaleDate) 
      VALUES (1, 2, '2025-05-20')
    `);
    console.log("6. Data inserted successfully.");

    // 7- Update the price of 'Bread' to 25.00. (0.5 Grade)
    await db.query(`
      UPDATE Products SET Price = 25.00 WHERE ProductName = 'Bread'
    `);
    console.log("7. Updated Bread price.");

    // 8- Delete the product 'Eggs'. (0.5 Grade)
    await db.query(`
      DELETE FROM Products WHERE ProductName = 'Eggs'
    `);
    console.log("8. Deleted product Eggs.");

    // 9- Retrieve the total quantity sold for each product. (0.5 Grade)
    const [totalQuantity] = await db.query(`
      SELECT p.ProductName, SUM(s.QuantitySold) AS TotalQuantitySold
      FROM Sales s
      JOIN Products p ON s.ProductID = p.ProductID
      GROUP BY p.ProductID, p.ProductName
    `);
    console.log("9. Total Quantity Sold:", totalQuantity);

    // 10- Get the product with the highest stock. (0.5 Grade)
    const [highestStock] = await db.query(`
      SELECT * FROM Products ORDER BY StockQuantity DESC LIMIT 1
    `);
    console.log("10. Highest Stock Product:", highestStock);

    // 11- Find suppliers with names starting with 'F'. (0.5 Grade)
    const [suppliersF] = await db.query(`
      SELECT * FROM Suppliers WHERE SupplierName LIKE 'F%'
    `);
    console.log("11. Suppliers starting with F:", suppliersF);

    // 12- Show all products that have never been sold. (0.5 Grade)
    const [neverSold] = await db.query(`
      SELECT * FROM Products WHERE ProductID NOT IN (SELECT ProductID FROM Sales)
    `);
    console.log("12. Products never sold:", neverSold);

    // 13- Get all sales along with product name and sale date. (0.5 Grade)
    const [salesDetails] = await db.query(`
      SELECT s.SaleID, p.ProductName, s.SaleDate, s.QuantitySold
      FROM Sales s
      JOIN Products p ON s.ProductID = p.ProductID
    `);
    console.log("13. Sales details:", salesDetails);

    // 14- Create a user "store_manager" and give them SELECT, INSERT, and UPDATE permissions on all tables. (0.5 Grade)
    // We use CREATE USER IF NOT EXISTS to prevent errors if the code is run multiple times
    await db.query(`CREATE USER IF NOT EXISTS 'store_manager'@'localhost' IDENTIFIED BY 'password123'`);
    await db.query(`GRANT SELECT, INSERT, UPDATE ON retail_store.* TO 'store_manager'@'localhost'`);
    console.log("14. User 'store_manager' created and granted permissions.");

    // 15- Revoke UPDATE permission from "store_manager". (0.5 Grade)
    await db.query(`
      REVOKE UPDATE ON retail_store.* FROM 'store_manager'@'localhost'
    `);
    console.log("15. Revoked UPDATE permission.");

    // 16- Grant DELETE permission to "store_manager" only on the Sales table. (0.5 Grade)
    await db.query(`
      GRANT DELETE ON retail_store.Sales TO 'store_manager'@'localhost'
    `);
    await db.query(`FLUSH PRIVILEGES`);
    console.log("16. Granted DELETE on Sales table and flushed privileges.");

    await db.end();
    console.log("\n✅ All queries executed successfully. Database connection closed.");

  } catch (error) {
    console.error("❌ An error occurred:", error.message);
  }
}

runDatabaseQueries();