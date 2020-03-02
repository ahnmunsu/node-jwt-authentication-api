const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/refresh', refresh);
router.post('/reject', reject);
router.get('/', getAll);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function refresh(req, res, next) {
    userService.refresh(req.body)
        .then(token => token ? res.json(token) : res.status(401).json({ message: 'Invalid refresh token' }))
        .catch(err => next(err));
}

function reject(req, res, next) {
    userService.reject(req.body)
        .then(() => res.send(204))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}
