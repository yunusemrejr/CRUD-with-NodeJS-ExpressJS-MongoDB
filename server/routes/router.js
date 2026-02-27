/*  requiring ExpressJS */

const express = require('express');
const route = express.Router()
const services = require('../services/render');
const controller = require('../controller/controller');
const { userValidationRules, validate } = require('../middleware/validation');

/**
 * @description Root Route
 * @method GET /
 */
route.get('/', services.homeRoutes);

/**
 * @description add users
 * @method GET /add-user
 */
route.get('/add-user', services.add_user)

/**
 * @description for update user
 * @method GET /update-user
 */
route.get('/update-user', services.update_user)

// API Routes
/**
 * @description Create new user
 * @method POST /api/users
 */
route.post('/api/users', userValidationRules(), validate, controller.create);

/**
 * @description Get all users or single user
 * @method GET /api/users
 */
route.get('/api/users', controller.find);

/**
 * @description Update user by ID
 * @method PUT /api/users/:id
 */
route.put('/api/users/:id', userValidationRules(), validate, controller.update);

/**
 * @description Delete user by ID
 * @method DELETE /api/users/:id
 */
route.delete('/api/users/:id', controller.delete);

/**
 * @description Get user statistics
 * @method GET /api/stats
 */
route.get('/api/stats', controller.stats);

module.exports = route