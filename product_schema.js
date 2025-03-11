const schema_mongoose = require('mongoose');

const ProductSchema = new schema_mongoose.Schema({
    id: { type: Number, required: true, unique: true},
    name: { type: String, required: true},
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
  });

module.exports = schema_mongoose.model('product_collections', ProductSchema);