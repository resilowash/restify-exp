--you will need postgresql to run this.

create database notedb;

create table note(
  id SERIAL PRIMARY KEY,
  guid varchar(50) UNIQUE,
  subject varchar(200),
  notebody text,
  datecreated date
);
