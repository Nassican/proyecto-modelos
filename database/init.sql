create table clients (
    id serial primary key,
    name varchar(256) not null,
    student_code varchar(9) not null
);

create table types_shifts (
    id serial primary key,
    name varchar(50) not null,
    code varchar(2) not null,
    is_active boolean not null default true
);

create table users (
    id serial primary key,
    username varchar(100) not null,
    password varchar(256) not null,
    email varchar(100) not null,
    id_type_shift int not null references types_shifts(id),
    is_active boolean not null default true
);

create table shifts (
    id serial primary key,
    num_shift varchar(10) not null,
    date date,
    hour time,
    is_attended boolean,
    id_type_shift int not null references types_shifts(id),
    id_client int not null references clients(id),
    id_user int not null references users(id),
    at_created date not null default CURRENT_DATE,
    is_active boolean not null default true
);