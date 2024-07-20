const express = require('express');
const User = require('../models/User'); // Adjust the path as necessary

const router = new express.Router();

router.put('/update/:email', async (req, res) => {
    const email = req.params.email;
    const updates = req.body;
    const allowedUpdates = ['phone', 'year', 'linkedin', 'github'];
    const isValidOperation = Object.keys(updates).every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        Object.keys(updates).forEach(update => user[update] = updates[update]);
        await user.save();

        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/details/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.send({
            email: user.email,
            name: user.name,
            phone: user.phone || '',
            year: user.year || '',
            linkedin: user.linkedin || '',
            github: user.github || ''
        });
    } catch (error) {
        res.status(400).send(error);
    }
});
6

module.exports = router;
