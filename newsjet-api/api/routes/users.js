const express = require("express");
const router = express.Router();
const userService = require('../services/userService');
const userOps = require('../validators/userOps');

router.get('/', (req, res, next) => {
    const userResult = userService.getUsers();
    switch (typeof(userResult)) {
        case 'object':
            res.status(200).json({
                message: 'List of users',
                users: userResult
            });
            break;

        default:
            res.status(500).json({
                message: 'Could not get users'
            });
            break;
    }
});

router.get('/:userId', (req, res, next) => {
    const userResult = userService.getUsers(req.params.userId);
    switch (typeof(userResult)) {
        case 'object':
            res.status(200).json({
                message: 'User found',
                user: userResult[0]
            });
            break;

        default:
            res.status(404).json({
                message: userResult
            });
            break;
    }
});

router.post('/register', (req, res, next) => {
    const newUser = {
        username: req.body.username,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    }
    try {
        //console.log(req.body);
        userOps.createUserSchema.validateSync(newUser, {abortEarly: false});
    } catch (e) {
        console.log(e.errors);
        if (e.errors !== undefined) {
            return res.status(422).json({
                errors: e.errors
            });
        }
    }
    
    try {
        const userExists = userService.checkUsername(newUser.username);
        if (userExists) {
            return res.status(422).json({
                message: 'Username already exists'
            });
        }
        userService.createUser(newUser).then((inResult) =>{
            console.log(inResult);
            if (inResult) {
                return res.status(201).json({
                    message: 'New user created'
                });
            } else {
                return res.status(422).json({
                    message: 'Could not create the user'
                });
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Could not create the user',
            errorDetail: error
        });
    }
});

router.post('/login', (req, res, next) => {
    try {
        //console.log(req.body);
        userOps.loginSchema.validateSync(req.body, {abortEarly: false});
    } catch (e) {
        console.log(e.errors);
        if (e.errors !== undefined) {
            return res.status(422).json({
                errors: e.errors
            });
        }
    }

    try {
        const userExists = userService.checkUsername(req.body.username);
        if (!userExists) {
            return res.status(422).json({
                message: 'Username does not exist'
            });
        }
        userService.loginUser(req.body).then((loginInfo) => {
            if (loginInfo) {
                return res.status(200).json({
                    message: 'Login succesful!',
                    userid: loginInfo.id,
                    username: loginInfo.username
                });
            } else {
                return res.status(401).json({
                    message: 'Incorrect password'
                });
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Could not log you in',
            errorDetail: error
        });
    }
});

router.patch('/updatepassword', (req, res, next) => {
    try {
        //console.log(req.body);
        userOps.editUserSchema.validateSync(req.body, {abortEarly: false});
    } catch (e) {
        console.log(e.errors);
        if (e.errors !== undefined) {
            return res.status(422).json({
                message: "Invalid data sent",
                errors: e.errors
            });
        }
    }
    try {
        userService.updateUserPassword(req.body).then((updateResult) => {
            if (updateResult) {
                return res.status(201).json({
                    message: 'User password updated!'
                });
            } else {
                return res.status(401).json({
                    message: 'Incorrect old password'
                });
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Could update password',
            errorDetail: error
        });
    }
});

module.exports = router;