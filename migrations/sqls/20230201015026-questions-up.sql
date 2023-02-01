CREATE TABLE questions(
    question_id SERIAL primary key,
    content text not null ,
    option1 text not null,
    option2 text not null,
    option3 text ,
    option4 text ,
    correct_answer text not null,
    language_id int,

    FOREIGN KEY(language_id) REFERENCES languages(language_id)
);