-- Crear la base de datos shiftsdb
CREATE DATABASE shiftsdb;
GO

-- Usar la base de datos shiftsdb
USE shiftsdb;
GO

-- Crear las tablas
CREATE TABLE clients (
    id int primary key identity,
    name varchar(256) not null,
    student_code varchar(9) not null
);

CREATE TABLE types_shifts (
    id int primary key identity,
    name varchar(50) not null,
    code varchar(2) not null,
    is_active bit not null default 1
);

CREATE TABLE users (
    id int primary key identity,
    username varchar(100) not null,
    password varchar(256) not null,
    email varchar(100) not null,
    id_type_shift int not null references types_shifts(id),
    is_active bit not null default 1
);

CREATE TABLE shifts (
    id int primary key identity,
    num_shift varchar(10) not null,
    date_attended datetime,
    is_attended bit,
    id_type_shift int not null references types_shifts(id),
    id_client int not null references clients(id),
    id_user int not null references users(id),
    at_created datetime not null default current_timestamp,
    is_active bit not null default 1
);