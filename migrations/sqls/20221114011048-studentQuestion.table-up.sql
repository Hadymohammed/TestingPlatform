CREATE TABLE studentQuestion(
    id SERIAL primary key,
    question_id int NOT NULL ,
    student_id int NOT NULL,

    FOREIGN KEY (question_id) REFERENCES questions(id),
    FOREIGN KEY (student_id) REFERENCES students(id)
);