CREATE TABLE person (
    id serial PRIMARY KEY,
    username text NOT NULL,
    email text NOT NULL,
    password_hash text NOT NULL,
    created_at timestamp DEFAULT Now()
);

ALTER TABLE person
    ADD CONSTRAINT person_email_unique UNIQUE (email);

