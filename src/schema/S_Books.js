const booksFields = `
  _id: String
  name: String
  author: String
  year: String
  editorial: String
  categoryName: String
  isBorrowed: Boolean
`

const S_BooksSchema = [`
  type S_Books {
    ${booksFields}
    createdAt: String
    updatedAt: String
    isRemove: Boolean
  }

  input S_Books_filter {
    ${booksFields}
  }

  input S_Books_input {
    ${booksFields}
  }

  type Query {
    S_Books(filter: S_Books_filter):[S_Books]
    S_Books_count(filter: S_Books_filter):Int
  }

  type Mutation {
    S_Books_save(bookInput: S_Books_input):ID
  }
`]

module.exports = S_BooksSchema;
