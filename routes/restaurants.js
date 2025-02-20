const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurants');


router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({});
        res.render('index', { restaurants });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching restaurants");
    }
});


router.get('/new', (req, res) => {
    res.render('new');
});


router.post('/', async (req, res) => {
    try {
        const newRestaurant = new Restaurant(req.body);
        await newRestaurant.save();
        res.redirect(`/restaurants/${newRestaurant._id}`);
    } catch (err) {
        console.error(err);
        res.status(400).render('restaurants/new', { error: err.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await Restaurant.findById(id);
        if (!restaurant) {
            return res.status(404).send('Restaurant not found');
        }
        res.render('show', { restaurant });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error finding restaurant");
    }
});

router.get('/:id/edit', async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await Restaurant.findById(id);
        if (!restaurant) {
            return res.status(404).send('Restaurant not found');
        }
        res.render('edit', { restaurant });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error finding restaurant");
    }
});


router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const existingRestaurant = await Restaurant.findById(id);
        req.body.restaurantId = existingRestaurant.restaurantId;
        
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, req.body, { 
            new: true, 
            runValidators: true 
        });
        res.redirect(`/restaurants/${updatedRestaurant._id}`);
    } catch (err) {
        console.error(err);
        res.status(400).send("Error updating restaurant");
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Restaurant.findByIdAndDelete(id);
        res.redirect('/restaurants');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting restaurant");
    }
});

module.exports = router;