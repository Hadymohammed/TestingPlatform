CREATE TABLE questions(
    question_id SERIAL primary key,
    language_id int,
    creator_id int,
    content text not null ,
    option1 text not null,
    option2 text not null,
    option3 text ,
    option4 text ,
    correct_answer text not null,

    FOREIGN KEY(creator_id) REFERENCES admins(admin_id),
    FOREIGN KEY(language_id) REFERENCES languages(language_id)
);