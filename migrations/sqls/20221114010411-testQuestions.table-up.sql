CREATE TABLE testQuestion(
    id SERIAL PRIMARY KEY,
    question_id int NOT NULL,
    test_id int NOT NULL,
    score int DEFAULT 1,
    FOREIGN KEY (question_id) REFERENCES questions(id),
    FOREIGN KEY (test_id) REFERENCES tests(id)
);