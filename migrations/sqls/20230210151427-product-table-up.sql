CREATE TABLE Product(id SERIAL PRIMARY KEY,
                     name VARCHAR(100) NOT NULL,
                     price INT NOT NULL,
                     category VARCHAR(100));

-- INSERT INTO Product(name, price, category) VALUES ('SSD', 10, 'assets'), ('Headphone', 20, 'accessories');