````markdown
## 📚 Book Library AP

A RESTful API for managing a book library, built with TypeScript and Node.js.

## 🚀 Features

- Add, update, delete, and retrieve books
- Search books by title, author, or genre
- Filtering support
- Type-safe with TypeScript

````

1. Clone the repository:

```bash
git clone https://github.com/kazisolah114/book-library-api.git
````

2. Navigate into the project directory:

```bash
cd book-library-api
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables in a `.env` file (for database connection, etc.)

5. Start the application:

```bash
npm run dev
```

## 📚 API Endpoints

### Books

* `GET /books` - Retrieve all books
* `POST /books` - Add a new book
* `GET /books/:id` - Retrieve a single book by ID
* `PUT /books/:id` - Update a book by ID
* `DELETE /books/:id` - Delete a book by ID

### Borrow Books

* `GET /borrow` - Gets borrowed books summary
* `POST /borrow` - Borrows book

## 🔧 Technologies Used

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
