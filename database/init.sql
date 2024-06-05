-- Crear la base de datos si no existe
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'shiftsdb')
BEGIN
    CREATE DATABASE shiftsdb;
END
GO

-- Usar la base de datos
USE shiftsdb;
GO

-- Tabla clients
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='clients' and xtype='U')
BEGIN
    CREATE TABLE clients (
        id INT PRIMARY KEY IDENTITY(1,1),
        name NVARCHAR(256) NOT NULL,
        student_code NVARCHAR(9) NOT NULL
    );
END
GO

-- Tabla types_shifts
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='types_shifts' and xtype='U')
BEGIN
    CREATE TABLE types_shifts (
        id INT PRIMARY KEY IDENTITY(1,1),
        name NVARCHAR(50) NOT NULL,
        code NVARCHAR(2) NOT NULL,
        is_active BIT NOT NULL DEFAULT 1
    );
END
GO

-- Tabla users
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' and xtype='U')
BEGIN
    CREATE TABLE users (
        id INT PRIMARY KEY IDENTITY(1,1),
        username NVARCHAR(100) NOT NULL,
        password NVARCHAR(256) NOT NULL,
        email NVARCHAR(100) NOT NULL,
        id_type_shift INT NOT NULL,
        is_active BIT NOT NULL DEFAULT 1,
        FOREIGN KEY (id_type_shift) REFERENCES types_shifts(id)
    );
END
GO

-- Tabla shifts
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='shifts' and xtype='U')
BEGIN
    CREATE TABLE shifts (
        id INT PRIMARY KEY IDENTITY(1,1),
        num_shift NVARCHAR(10) NOT NULL,
        date DATE,
        hour TIME,
        is_attended BIT,
        id_type_shift INT NOT NULL,
        id_client INT NOT NULL,
        id_user INT NOT NULL,
        at_created DATE NOT NULL DEFAULT GETDATE(),
        is_active BIT NOT NULL DEFAULT 1,
        FOREIGN KEY (id_type_shift) REFERENCES types_shifts(id),
        FOREIGN KEY (id_client) REFERENCES clients(id),
        FOREIGN KEY (id_user) REFERENCES users(id)
    );
END
GO