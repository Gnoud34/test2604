const mongoose = require('mongoose');

const toySchema = new mongoose.Schema({
    name: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
    price: { type: Number, required: true }
});

const ToyModel = mongoose.model('Toy', toySchema);

module.exports = ToyModel;