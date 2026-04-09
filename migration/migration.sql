CREATE TABLE person (
    id serial PRIMARY KEY,
    username text NOT NULL,
    email text NOT NULL,
    password_hash text NOT NULL,
    created_at timestamp DEFAULT Now()
);

ALTER TABLE person
    ADD CONSTRAINT person_email_unique UNIQUE (email);

CREATE TABLE todo (
    id serial PRIMARY KEY,
    title text,
    note text,
    created_at timestamp DEFAULT Now()
);

ALTER TABLE todo
    ADD COLUMN is_completed boolean DEFAULT FALSE,
    ADD COLUMN person_id int;

ALTER TABLE todo
    ADD CONSTRAINT fk_todo_user FOREIGN KEY (person_id) REFERENCES person (id) ON DELETE CASCADE;

