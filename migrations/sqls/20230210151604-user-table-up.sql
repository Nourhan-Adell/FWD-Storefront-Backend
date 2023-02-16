CREATE TABLE Users(id SERIAL PRIMARY KEY, 
                  firstName VARCHAR(20) NOT NULL,
                  secondName VARCHAR(20) NOT NULL,
                  userPassword VARCHAR(100) NOT NULL);

-- INSERT INTO Users(firstName, secondName, userPassword) VALUES ('Nourhan', 'Adel', 'NourhanAdel'), ('Mohamed', 'Adel', 'Dola');