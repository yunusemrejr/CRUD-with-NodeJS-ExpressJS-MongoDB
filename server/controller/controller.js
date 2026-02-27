var Userdb = require('../model/model');

// Create and save a new user
exports.create = async (req, res) => {
    try {
        // Validate request
        if (!req.body) {
            return res.status(400).send({ 
                success: false,
                message: "Content cannot be empty!" 
            });
        }

        // Check if email already exists
        const existingUser = await Userdb.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).send({ 
                success: false,
                message: "Email already exists!" 
            });
        }

        // Create new user
        const user = new Userdb({
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender,
            status: req.body.status,
            phone: req.body.phone,
            address: req.body.address
        });

        // Save user in the database
        const data = await user.save();
        res.redirect('/add-user');
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while creating the user"
        });
    }
};

// Retrieve and return all users or a single user
exports.find = async (req, res) => {
    try {
        if (req.query.id) {
            const id = req.query.id;
            const data = await Userdb.findById(id);
            
            if (!data) {
                return res.status(404).send({ 
                    success: false,
                    message: "User not found with id " + id 
                });
            }
            res.send(data);
        } else {
            // Support for pagination, search, and sorting
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            const search = req.query.search || '';
            const sortBy = req.query.sortBy || 'createdAt';
            const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

            let query = {};
            if (search) {
                query = {
                    $or: [
                        { name: { $regex: search, $options: 'i' } },
                        { email: { $regex: search, $options: 'i' } }
                    ]
                };
            }

            const users = await Userdb.find(query)
                .sort({ [sortBy]: sortOrder })
                .skip(skip)
                .limit(limit);

            const total = await Userdb.countDocuments(query);

            res.send({
                success: true,
                data: users,
                pagination: {
                    total,
                    page,
                    pages: Math.ceil(total / limit),
                    limit
                }
            });
        }
    } catch (err) {
        res.status(500).send({ 
            success: false,
            message: err.message || "Error occurred while retrieving user information" 
        });
    }
};

// Update a user by user id
exports.update = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({ 
                success: false,
                message: "Data to update cannot be empty" 
            });
        }

        const id = req.params.id;
        
        // Check if email is being updated and if it already exists
        if (req.body.email) {
            const existingUser = await Userdb.findOne({ 
                email: req.body.email, 
                _id: { $ne: id } 
            });
            if (existingUser) {
                return res.status(400).send({ 
                    success: false,
                    message: "Email already exists!" 
                });
            }
        }

        const data = await Userdb.findByIdAndUpdate(id, req.body, { 
            new: true,
            runValidators: true 
        });

        if (!data) {
            return res.status(404).send({ 
                success: false,
                message: `Cannot update user with id ${id}. User not found!` 
            });
        }

        res.send({
            success: true,
            message: "User updated successfully",
            data
        });
    } catch (err) {
        res.status(500).send({ 
            success: false,
            message: err.message || "Error updating user information" 
        });
    }
};

// Delete a user with specified user id
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Userdb.findByIdAndDelete(id);

        if (!data) {
            return res.status(404).send({
                success: false,
                message: `Cannot delete user with id ${id}. User not found!`
            });
        }

        res.send({
            success: true,
            message: "User deleted successfully"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message || "Could not delete user with id " + req.params.id
        });
    }
};

// Get user statistics
exports.stats = async (req, res) => {
    try {
        const total = await Userdb.countDocuments();
        const active = await Userdb.countDocuments({ status: 'Active' });
        const inactive = await Userdb.countDocuments({ status: 'Inactive' });
        const maleCount = await Userdb.countDocuments({ gender: 'Male' });
        const femaleCount = await Userdb.countDocuments({ gender: 'Female' });

        res.send({
            success: true,
            stats: {
                total,
                active,
                inactive,
                male: maleCount,
                female: femaleCount
            }
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message || "Error retrieving statistics"
        });
    }
};