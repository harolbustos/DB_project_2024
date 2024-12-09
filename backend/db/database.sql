CREATE TABLE USUARIO (
rut varchar(10) PRIMARY KEY,
name varchar(50) NOT NULL,
mail varchar(100) UNIQUE NOT NULL,
password varchar(50) NOT NULL,
phone varchar(12) NOT NULL,
creation_date date DEFAULT CURRENT_DATE
);