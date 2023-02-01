CREATE TABLE test_question(
    id SERIAL PRIMARY KEY,
    question_id int NOT NULL,
    test_id int NOT NULL,
    timer int,
    score int DEFAULT 1,
    
    FOREIGN KEY (question_id) REFERENCES questions(question_id),
    FOREIGN KEY (test_id) REFERENCES tests(test_id)
);