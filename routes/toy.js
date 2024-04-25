var express = require('express');
var router = express.Router();
var ToyModel = require('../models/ToyModel');

// Get all toys
router.get('/', async (req, res) => {
  try {
    const toys = await ToyModel.find();
    res.render('toy/index', { toys });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// Get toy detail
router.get('/detail/:id', async (req, res) => {
  try {
    const toy = await ToyModel.findById(req.params.id);
    res.render('toy/info', { toy });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});
router.get('/add', (req, res) => {
  res.render('toy/add');
});

// Add new toy
router.post('/add', async (req, res) => {
  try {
    // Create a new toy object based on the data received from the form
    const newToy = new ToyModel({
      name: req.body.name,
      content: req.body.content,
      image: req.body.image,
      country: req.body.country,
      price: req.body.price
    });

    // Save the new toy to the database
    await newToy.save();

    // Redirect to the home page or any other appropriate page
    res.redirect('/toy');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// Edit toy
router.get('/edit/:id', async (req, res) => {
  try {
    const toy = await ToyModel.findById(req.params.id);
    res.render('toy/edit', { toy });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/edit/:id', async (req, res) => {
  try {
    const { name, price, content, image, country } = req.body;
    await ToyModel.findByIdAndUpdate(req.params.id, { name, price, content, image, country });
    res.redirect('/toy');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete toy
router.get('/delete/:id', async (req, res) => {
  try {
    const toy = await ToyModel.findById(req.params.id);
    if (!toy) {
      return res.status(404).send('Toy not found');
    }
    res.render('toy/delete', { toy });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/delete/:id', async (req, res) => {
  try {
    const toy = await ToyModel.findByIdAndDelete(req.params.id);
    if (!toy) {
      return res.status(404).send('Toy not found');
    }
    res.redirect('/toy'); // Redirect to the toy list page after deletion
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Drop all toys
router.get('/drop', async (req, res) => {
  try {
    await ToyModel.deleteMany({});
    res.redirect('/toy');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route for toy home page
router.get('/home', async (req, res) => {
  try {
    const toys = await ToyModel.find();
    res.render('toy/home', { toys });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
