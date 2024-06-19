-- Crear la base de datos si no existe
DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'shiftsdb') THEN
      CREATE DATABASE shiftsdb;
   END IF;
END
$$;

-- Conectar a la base de datos shiftsdb
\connect shiftsdb;

create table clients (
    id serial primary key,
    name varchar(256) not null,
    student_code varchar(9) not null unique,
    email varchar(200) not null
);

create table types_shifts (
    id serial primary key,
    color varchar(6) not null,
    icon varchar(100) not null,
    name varchar(50) not null,
    description varchar(200) not null,
    code char(2) not null unique,
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
    num_shift varchar(16) not null,
    date_attended timestamp,
    is_attended boolean,
    is_standby boolean not null default true,
    id_type_shift int not null references types_shifts(id),
    id_client int not null references clients(id),
    id_user int references users(id),
    at_created timestamp not null default CURRENT_DATE,
    is_active boolean not null default true,
    constraint num_shift_unique unique (num_shift, id_type_shift)
);

create index idx_clients_email on clients(email);
create index idx_users_email on users(email);
create index idx_shifts_date_attended on shifts(date_attended);
create index idx_shifts_id_client on shifts(id_client);

create or replace function generate_shift_number(p_type_shift_id int) returns varchar as $$
declare
	type_shift_code varchar;
	seq int;
	shift_number varchar;
begin
	select ts.code into type_shift_code
	from types_shifts ts
	where ts.id = p_type_shift_id;

	select coalesce(max(cast(substr(s.num_shift, 3) as int)), 0) + 1
	into seq
	from shifts s
	where s.id_type_shift = p_type_shift_id;

	shift_number := type_shift_code || seq::text;

	return shift_number;
end;
$$ language plpgsql;

create or replace function set_shift_number() returns trigger as $$
begin
	new.num_shift := generate_shift_number(new.id_type_shift);
	return new;
end
$$ language plpgsql;

create trigger before_insert_shifts
before insert on shifts
for each row
execute function set_shift_number();