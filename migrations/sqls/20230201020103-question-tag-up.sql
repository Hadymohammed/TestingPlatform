CREATE TABLE question_tag(
    question_tag_id SERIAL PRIMARY KEY,
    tag_id INT NOT NULL,
    question_id INT NOT NULL,

    FOREIGN KEY (tag_id) REFERENCES tags(tag_id),
    FOREIGN KEY (question_id) REFERENCES questions(question_id)
);