CREATE TABLE tests(
    id SERIAL primary key,
    title varchar(100) not null ,
    date date,
    total_questions int not null,
    timer int not null,
    creator_id int,
    FOREIGN KEY (creator_id) REFERENCES admins(id)
);