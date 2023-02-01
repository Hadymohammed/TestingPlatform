CREATE TABLE student_question(
    id SERIAL primary key,
    test_id int NOT NULl,
    question_id int NOT NULL ,
    student_id int NOT NULL,
    answer text,
    marked BOOLEAN DEFAULT(FALSE),
    
    FOREIGN KEY (test_id) REFERENCES tests(test_id),
    FOREIGN KEY (question_id) REFERENCES questions(question_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);