CREATE TABLE question_in_bank(
    question_in_bank_id SERIAL PRIMARY KEY,
    bank_id INT NOT NULL,
    question_id INT NOT NULL,

    FOREIGN KEY (bank_id) REFERENCES question_bank(question_bank_id)
)