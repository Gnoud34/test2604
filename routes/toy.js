var express = require('express');
var router = express.Router();
var ToyModel = require('../models/ToyModel');
var CountryModel = require('../models/CountryModel');

// Get all toys
router.get('/', async (req, res) => {
  try {
    const toys = await ToyModel.find().populate('country');
    res.render('toy/index', { toys });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});
//get

// Get toy detail

router.get('/detail/:id', async (req, res) => {
  let id = req.params.id;
  var toy = await ToyModel.findById(id).populate('country');
  res.render('toy/info', { toy });
});
// Add new toy
router.get('/add', async (req, res) => {
  var countries = await CountryModel.find({});
  res.render('toy/add', { countries });
});
router.post('/add', async (req, res) => {
  var toy = req.body;
  await ToyModel.create(toy);
  res.redirect('/toy');
});
// Edit toy
router.get('/edit/:id', async (req, res) => {
  try {
    var id = req.params.id;
    var toy = await ToyModel.findById(id).populate('country');
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
