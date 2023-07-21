const S_BooksSchema = [`
  type S_Books {
    _id: String
    name: String
    author: String
    year: String
    editorial: String
    categoryName: String
    isBorrowed: Boolean
    createdAt: String
    updatedAt: String
    isRemove: Boolean
  }

  input S_Books_filter {
    _id: String
    name: String
    author: String
    year: String
    editorial: String
    categoryName: String
    isBorrowed: Boolean
  }

  input S_Books_input {
    _id: String
    name: String
    author: String
    year: String
    editorial: String
    categoryName: String
    isBorrowed: Boolean
  }

  type Query{
    S_Books(filter: S_Books_filter):[S_Books]
  }
`]

module.exports = S_BooksSchema;
