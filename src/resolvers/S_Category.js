const Category = require('../models/Category');
const { handlePagination } = require('@codecraftkit/utils');
const { v4: uuidv4 } = require('uuid')

const S_Category = async (_, { filter = {}, options = {}, count = false }) => {
  try {
    let query = { isRemove: false };
    const { skip, limit } = handlePagination(options);
    let { _id, name, key } = filter;

    if (_id) query._id = _id
    if (name) query.name = name
    if (key) query.key = key
    
    if(count) return await Category.countDocuments(query);
    
    //const find = Category.find(query)

    const collection = [
      { $match: query },
      {
        $lookup: {
          from: 's_books',
          localField: 'name',
          foreignField: 'categoryName',
          as: 'bookCategory'
        }
      },
      {
        $unwind:{
          path: '$bookCategory',
          preserveNullAndEmptyArrays: true
        }
      }
    ]
    
    if (skip) collection.push({ $skip: skip }) 
    if (limit) collection.push({ $limit: limit })

    return await Category.aggregate(collection);
  } catch (error) {
    return error;
  }
}

const S_Category_count = async (_, { filter = {} }) => {
  try {
    return await S_Category(_, { filter, count: true })
  } catch (error) {
    return error;
  }
}

const S_Category_create = async (_, { categoryInput = {} }) => {
  try {
    const ID = uuidv4();
    const { name } = categoryInput;

    const namePreffix = name.trim().slice(0, 3).toUpperCase();

    const key = `S-${namePreffix}`

    const newCategory = await new Category({
      _id: ID,
      name,
      key
    }).save()
    
    return newCategory._id
  } catch (error) {
    return error;
  }
}

const S_Category_update = async (_, { categoryInput = {} }) => {
  try {
    let { _id, name } = categoryInput;

    await categoryInput.updateOne({_id},{ $set: { name } })

    return _id;
  } catch (error) {
    return error;
  }
}

const S_Category_save = async (_, {categoryInput}) => {
  try {
    const actions = {
      create: S_Category_create,
      update: S_Category_update
    }
    const action = categoryInput._id ? 'update' : 'create';

    return actions[action](_, { categoryInput })
  } catch (error) {
    return error;
  }
}

const S_Category_delete = async () => {
  try {
    const category = await Category.findOne({ _id, isRemove: false, }).lean();

    await category.updateOne({ _id }, { $set: { isRemove: true } });
  } catch (error) {
    return error;
  }
}

module.exports = {
  Query: {
    S_Category,
    S_Category_count
  },
  Mutation: {
    S_Category_save,
    S_Category_delete
  }
}