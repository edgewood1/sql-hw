CREATE DATABASE BamazonDB;

USE BamazonDB;

CREATE TABLE products (
	Item_id INT NOT NULL AUTO_INCREMENT,
	Product_name VARCHAR (30),
	Department_name VARCHAR (30),
	Price INT, 
	Stock_quantity INT NOT NULL,
	PRIMARY KEY(Item_id)
);

Stock_quantityINSERT INTO products (Product_name, Department_name, Price, Stock_quantity)
VALUES ("Booze", "Recreation", 5.50, 20);
INSERT INTO products (Product_name, Department_name, Price, Stock_quantity)
VALUES ("Shovels", "Labor", 3.00, 40);
INSERT INTO products (Product_name, Department_name, Price, Stock_quantity)
VALUES ("Books", "Leisure", 1.00, 50);
INSERT INTO products (Product_name, Department_name, Price, Stock_quantity)
VALUES ("Beds", "Necesities", 4.00, 3);
INSERT INTO products (Product_name, Department_name, Price, Stock_quantity)
VALUES ("Cigarettes", "Recreation", 3.00, 30);
INSERT INTO products (Product_name, Department_name, Price, Stock_quantity)
VALUES ("Gloves", "Labor", 3.33, 55);
INSERT INTO products (Product_name, Department_name, Price, Stock_quantity)
VALUES ("Chairs", "Necesities", 33.00, 55);
INSERT INTO products (Product_name, Department_name, Price, Stock_quantity)
VALUES ("DVDs", "Leisure", 4.44, 33);
INSERT INTO products (Product_name, Department_name, Price, Stock_quantity)
VALUES("TV dinners", "Necesities", 4.55, 22);
INSERT INTO products (Product_name, Department_name, Price, Stock_quantity)
VALUES("Record Player", "Leisure", 2.22, 4);