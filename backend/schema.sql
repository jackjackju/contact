CREATE TABLE users(
                      user_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ,
                      username text not null unique,
                      password text not null ,
                      email text not null
)

CREATE TABLE contact(
                      contact_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ,
                      name text not null,
                      phone text not null,
                      email text not null,
                      owner integer foreign key references users(user_id)
);

