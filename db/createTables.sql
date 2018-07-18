--you will need postgresql to run this.

create database notedb;

create table note(
  id SERIAL PRIMARY KEY,
  guid varchar(50) UNIQUE,
  subject varchar(200),
  notebody text,
  datecreated date
);

-- I don't like the name of this table, it's not a user's notes, it's a system user...
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

--this table should not really allow a user to have multiple tokens at once... YAGNI for now
create table user_token(
  id SERIAL PRIMARY KEY,
  userid int not null,
  token varchar(200) not null,
  dateTimeCreated timestamp not null,
  dateTimeExpires timestamp,

  CONSTRAINT FK_usertoken_noteuser_userid FOREIGN KEY (userid) REFERENCES note_user (id)
);

-- this allows for a many to many relationship right now, do we need that should be just use the note table to have an id associated with that user?
create table user_notes (
  id SERIAL not null PRIMARY KEY,
  userid int not null REFERENCES note_user(id), 
  noteid int not null REFERENCES note(id)
);
