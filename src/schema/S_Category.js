const categoryFields = `
  _id: String,
  name: String
  key: String
`

const S_CategorySchema = [`
  type S_Category {
    ${categoryFields}
    bookCategory: S_Books
    createdAt: String
    updatedAt: String
    isRemove: Boolean
  }

  input S_Category_filter {
    ${categoryFields}
  }

  input S_Category_input {
    ${categoryFields}
  }

  type Query {
    S_Category(filter: S_Category_filter):[S_Category]
    S_Category_count(filter: S_Category_filter):Int
  }

  type Mutation {
    S_Category_save(categoryInput: S_Category_input):ID
    S_Category_delete(_id: String!):Boolean
  }
`]

module.exports = S_CategorySchema