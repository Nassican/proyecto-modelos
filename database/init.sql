create table clients (
    id serial primary key,
    name varchar(256) not null,
    student_code varchar(9) not null unique,
    email varchar(200) not null unique
);

create table types_shifts (
    id serial primary key,
    color varchar(6) not null,
    icon varchar(100) not null,
    name varchar(50) not null,
    description varchar(200) not null,
    code varchar(2) not null,
    is_active boolean not null default true
);

create table users (
    id serial primary key,
    username varchar(20) not null unique,
    password varchar(256) not null,
    email varchar(100) not null unique,
    is_active boolean not null default true
);

create table users_types_shifts (
	id serial primary key,
	id_user int not null references users(id),
	id_type_shift int not null references types_shifts(id)
);

create table shifts (
    id serial primary key,
    num_shift varchar(10) not null,
    date_attended timestamp,
    is_attended boolean,
    is_standby boolean not null default true,
    id_type_shift int not null references types_shifts(id),
    id_client int not null references clients(id),
    id_user int not null references users(id),
    at_created timestamp not null default CURRENT_DATE,
    is_active boolean not null default true,
    constraint num_shift_unique unique (num_shift, id_type_shift)
);

create index idx_clients_email on clients(email);
create index idx_users_email on users(email);
create index idx_shifts_date_attended on shifts(date_attended);
create index idx_shifts_id_client on shifts(id_client);