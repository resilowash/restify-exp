--you will need postgresql to run this.

create database notedb;

create table noteuser(
  id SERIAL PRIMARY KEY,
  guid varchar(50) UNIQUE,
  subject varchar(200),
  notebody text,
  datecreated date
);

create table user(
    id SERIAL PRIMARY KEY,
    guid varchar(50) UNIQUE,
    user_name varchar(20) UNIQUE not null,
    salt varchar(250),
    pw varchar(250)
);
