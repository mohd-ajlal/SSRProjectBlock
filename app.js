const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const restaurantRoutes = require('./routes/restaurants');

const app = express();


mongoose.connect('mongodb://localhost:27017/restaurant-management')
    .then(() => {
        console.log('Database connection established');
    })
    .catch((err) => {
        console.log('Database connection error: ' + err);
    });


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/restaurants', restaurantRoutes);


app.get('/', (req, res) => {
    res.redirect('/restaurants');
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running at PORT ${port}`);
});