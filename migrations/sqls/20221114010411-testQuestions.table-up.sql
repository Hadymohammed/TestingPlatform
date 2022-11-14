CREATE TABLE testQusetions(
    id SERIAL PRIMARY KEY,
    question_id int NOT NULL,
    score int,
    FOREIGN KEY (question_id) REFERENCES questions(id)
);