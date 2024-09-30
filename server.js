const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models'); // Import your models

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sync database
sequelize.sync()
  .then(() => console.log("Database synced"))
  .catch(err => console.error("Failed to sync database:", err));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const { User, Address } = require('./models');

app.post('/register', async (req, res) => {
    const { name, address } = req.body;

    try {
        // Create a new user
        const user = await User.create({ name });
        
        // Create a new address associated with the user
        await Address.create({ userId: user.id, address });

        return res.status(201).json({ message: 'User and address created successfully', userId: user.id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
