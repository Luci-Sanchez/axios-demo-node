const router = require('express').Router();
const miscController = require('../controllers/misc.controller');

// Home
router.get('/', miscController.home);

// Cities
router.get('/cities', miscController.cities);
router.post('/cities', miscController.doCreateCity);
router.get('/cities/new', miscController.createCity);
router.get('/cities/:id', miscController.getCity);

// Courses
router.get('/restaurants', miscController.restaurants);
router.get('/restaurants/:id', miscController.getRestaurant);
router.get('/restaurants/:id/edit', miscController.editRestaurant);
router.post('/restaurants/:id/edit', miscController.doEditRestaurant)

module.exports = router;