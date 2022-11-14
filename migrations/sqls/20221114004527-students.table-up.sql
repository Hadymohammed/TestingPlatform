CREATE TABLE students(
    id SERIAL primary key,
    name varchar(100) not null ,
    username varchar(100) not null,
    password varchar(60) not null,
    national_id VARCHAR(14) not null,
    university_id VARCHAR(20)
);