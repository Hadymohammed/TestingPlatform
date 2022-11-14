CREATE TABLE students(
    id SERIAL primary key,
    name varchar(100) not null ,
    username varchar(100) not null UNIQUE,
    password varchar(60) not null,
    national_id VARCHAR(14) not null UNIQUE,
    university_id VARCHAR(20)
);