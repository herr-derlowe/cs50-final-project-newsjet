const db = require('./db');
const bcrypt = require('bcrypt');

function getUsers(userid = 0){
    if (userid == 0) {
        //console.log(userid)
        const userRecords = db.query('SELECT * FROM users', []);
        if (userRecords.length != 0) {
            return userRecords;
        }
        return false;
    } else {
        const userRecords = db.query('SELECT * FROM users WHERE id = ?', [userid]);
        if (userRecords.length != 0) {
            return userRecords;
        }
        return 'No user found';
    }
}

function checkUsername(username){
    const userRecords = db.query('SELECT * FROM users WHERE username = ?', [username])
    //console.log(userRecords);
    if (userRecords.length != 0) {
        return true;
    }
    return false
}

async function createUser(userData) {
    // const {username, password} = {
    //     username: userData.username,
    //     password: await hashPassword(userData.password)
    // }
    
    //console.log(password)
    const result = db.run(
        'INSERT INTO users (username, password) VALUES (?, ?)', 
        [userData.username, await hashPassword(userData.password)]);

    if (result.changes) {
        return true;
    }
    return false;
}

async function loginUser(userLogin){
    const userRecords = db.query('SELECT * FROM users WHERE username = ?', [userLogin.username]);
    const isValid = await validatePassword(userLogin.password, userRecords[0].password);
    //console.log(loginInfo)
    if (isValid) {
        return {
            id: userRecords[0].id,
            username: userRecords[0].username
        }
    } else {
        return false;
    }
}

async function updateUserPassword(updateData){
    const userToUpdate = db.query('SELECT * FROM users WHERE id = ?', [updateData.id]);
    const isValid = await validatePassword(updateData.oldpassword, userToUpdate[0].password);
    if (!isValid) {
        return false
    }
    const result = db.run(
        'UPDATE users SET password = ? WHERE id = ?', 
        [await hashPassword(updateData.password), updateData.id]);

    if (result.changes) {
        return true;
    }
    return false;
}

async function hashPassword(passwordText) {
    return await bcrypt.hash(passwordText, 10);
}

async function validatePassword(passwordText, passwordHash) {
    const result = await bcrypt.compare(passwordText, passwordHash);
    return result;
}

module.exports = {
    createUser,
    checkUsername,
    loginUser,
    updateUserPassword,
    getUsers
}