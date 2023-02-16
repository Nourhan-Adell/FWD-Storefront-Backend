CREATE TABLE Orders(id SERIAL PRIMARY KEY,
                    ProductID INT NOT NULL  REFERENCES Product(id),
                    quatity INT,
                    orderStatus VARCHAR(10) NOT NULL,
                    userID INT);

ALTER TABLE Orders ADD FOREIGN KEY (userID) REFERENCES Users(id);

-- INSERT INTO Orders(ProductID, quatity, orderStatus, "userID") VALUES (1, 1, 'active', 1), (2, 1, 'complete', 1);