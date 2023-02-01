CREATE TABLE tests(
    test_id SERIAL primary key,
    title varchar(100) not null ,
    date BIGINT,
    min_score int,
    total_questions int not null,
    timer int not null,
    creator_id int,
    language_id int,
    public BOOLEAN DEFAULT(FALSE),
    
    FOREIGN KEY (creator_id) REFERENCES admins(admin_id),
    FOREIGN KEY (language_id) REFERENCES languages(language_id)
);