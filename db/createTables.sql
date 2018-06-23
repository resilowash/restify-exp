--you will need postgresql to run this.

create database notedb;

create table noteuser(
  id SERIAL PRIMARY KEY,
  guid varchar(50) UNIQUE,
  subject varchar(200),
  notebody text,
  datecreated date
);

<<<<<<< HEAD
create table user(
    id SERIAL PRIMARY KEY,
    guid varchar(50) UNIQUE,
    user_name varchar(20) UNIQUE not null,
    salt varchar(250),
    pw varchar(250)
=======
create table note_user(
  id SERIAL PRIMARY KEY,
  guid varchar(50) UNIQUE,
  email varchar(150) UNIQUE,
  userName varchar(25) UNIQUE,
  password varchar(200) UNIQUE,
  pwSalt varchar(200),
  dateTimeCreated timestamp,
  dateTimeChanged timestamp
);

create table user_token(
  userid int not null,
  token varchar(200) not null,
  dateTimeCreated timestamp,
  dateTimeExpires timestamp
>>>>>>> 751f92cbf4b8babc7f814c8cd001b4ac3247fc41
);
