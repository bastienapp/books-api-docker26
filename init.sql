CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    UNIQUE (title, author)
);

INSERT INTO books (title, author) VALUES
    ('The Hobbit', 'J. R. R. Tolkien'),
    ('1984', 'George Orwell'),
    ('Pride and Prejudice', 'Jane Austen'),
    ('The Little Prince', 'Antoine de Saint-Exupery')
ON CONFLICT (title, author) DO NOTHING;
