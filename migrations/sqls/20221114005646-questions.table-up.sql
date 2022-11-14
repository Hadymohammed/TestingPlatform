CREATE TABLE questions(
    id SERIAL primary key,
    content text not null ,
    subject_id int not null,
    option1 text not null,
    option2 text not null,
    option3 text not null,
    option4 text not null,
    correct_answer text not null,

    FOREIGN KEY (subject_id) REFERENCES subjects(id)
);