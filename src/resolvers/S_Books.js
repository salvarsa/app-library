const Books = require("../models/Books");
const { handlePagination } = require("@codecraftkit/utils");
const { v4: uuidv4 } = require('uuid');

const S_Books = async (_, { filter = {}, options = {}, count = false }) => {
  try {
    let query = { isRemove: false };
    const { skip, limit } = handlePagination(options);
    let { 
          _id,
          name,
          author,
          year,
          editorial,
          categoryName,
          isBorrowed
        } =filter;

    if (_id) query._id = _id;
    if (name) query.name = name;
    if (author) query.author = author;
    if (year) query.year = year;
    if (editorial) query.editorial = editorial;
    if (categoryName) query.categoryName = categoryName;
    if (typeof isBorrowed === "Boolean") query.isBorrowed = isBorrowed;
    const find = Books.find(query)

    if (count) return await Books.countDocuments(query);

    if (skip) {
      find.skip(skip);
    }
    if (limit) {
      find.limit(limit);
    }

    return await find.lean();
  } catch (error) {
    return error;
  }
};

const S_Books_count = async (_, { filter = {} }) => {
  try {
    return await S_Books(_, { filter, count: true })
  } catch (error) {
    return error;
  }
}

const S_Books_create = async (_, { bookInput = {} }) => {
  try {
    const ID = uuidv4();
    let { 
      name,
      author,
      year,
      editorial,
      categoryName,
      isBorrowed
    } = bookInput;

    const newBook = await new Books({
      _id: ID,
      name,
      author,
      year,
      editorial,
      categoryName,
      isBorrowed,
      createdAt: new Date().getTime(),
    }).save();

    return newBook._id;
  } catch (error) {
    return error;
  }
}

const S_Books_update = async (_, { bookInput = {}}) => {
  try {
    let {
      _id, 
      name,
      author,
      year,
      editorial,
      categoryName,
      isBorrowed
    } = bookInput;

    await bookInput.updateOne(
      {_id},
      {
        $set: {
          name,
          author,
          year,
          editorial,
          categoryName,
          isBorrowed,
          updatedAt: new Date()
        }
      }
    )

    return _id;
  } catch (error) {
    return error;
  }
}

const S_Books_save = async (_, { bookInput }) => {
  try {
    const actions = {
      create: S_Books_create,
      update: S_Books_update
    }
    const action = bookInput._id ? 'update' : 'create';
    return actions[action](_, { bookInput })
  } catch (error) {
    return error;
  }
}

const S_Book_delete = async () => {
  try {
    
  } catch (error) {
    return error;
  }
}

module.exports = {
  Query: {
    S_Books,
    S_Books_count
  },
  Mutation: {
    S_Books_save
  }
}
