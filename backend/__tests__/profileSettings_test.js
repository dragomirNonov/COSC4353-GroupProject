const request = require("supertest");
const express = require('express');
const jwt = require("jsonwebtoken");
const router = require('./profileSettings'); // Import your router
const users = require("../data/usersData");

jest.mock('jsonwebtoken', () => ({
    verify: jest.fn(),
}));

describe ('profileSettings', () =>  {

    /* * * * * * * * * * *
    *     GET PROFILE    *
    * * * * * * * * * * */

    it('GET /api/profile should return user profile', async () => {
        // Create a valid token for existing user
        const token = jwt.sign({userId: 300}, "secretkey")
        const response = await request(express().use(router)).get('/api/profile')
        .set('token', token);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Profile get success');
    });

    it('GET /api/profile should return 404 with unknown user ID', async () => {
        // Create a valid token for non-existent user
        const token = jwt.sign({userId: 345}, "secretkey")
        const response = await request(express().use(router)).get('/api/profile')
        .set('token', token);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User not found');
    });

    it('GET /api/profile should return 500 with bad token', async () => {
        // Create a valid token for existing user
        const token = jwt.sign({userId: 300}, "secretkey")

        // Change token
        const tamperedToken = token.replace('badUser', 'badKey');
        const response = await request(express().use(router)).get('/api/profile')
        .set('token', tamperedToken);

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Internal server error');
    });

    /* * * * * * * * * * *
    *   UPDATE PROFILE   *
    * * * * * * * * * * */

    it('PUT /api/users/updateProfile should update user profile', async () => {

        // Create a valid token for existing user
        const token = jwt.sign({userId: 300}, "secretkey")

        const userUpdateData = {
            firstName: "newUserFirst",
            lastName: "newUserLast",
            address1: "111 newMain St",
            address2: "newApt 111",
            city: "newOnetown",
            state: "CA",
            zip: "11111",
        };

        const response = await request(express().use(router)).put('/api/users/updateProfile')
        .set('token', token)
        .send(userUpdateData);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Profile updated successfully');
    });

    it('PUT /api/users/updateProfile should return 404 with unknown user ID', async () => {

        // Create a valid token for non-existent user
        const token = jwt.sign({userId: 345}, "secretkey")

        const userUpdateData = {
            firstName: "newUser",
            lastName: "newUser",
            address1: "111 newMain St",
            address2: "",
            city: "newOnetown",
            state: "CA",
            zip: "11111",
        };

        const response = await request(express().use(router)).put('/api/users/updateProfile')
        .set('token', token)
        .send(userUpdateData);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User not found');
    });

    
    it('PUT /api/users/updateProfile should return 500 with bad token', async () => {
        // Create a valid token for existing user
        const token = jwt.sign({userId: 300}, "secretkey")

        // Change token
        const tamperedToken = token.replace('badUser', 'badKey');
        const response = await request(express().use(router)).put('/api/users/updateProfile')
        .set('token', tamperedToken);

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Internal server error');
    });

    it('PUT /api/users/updateProfile should return 401 with bad first name input', async () => {

        // Create a valid token for existing user
        const token = jwt.sign({userId: 300}, "secretkey")

        const userUpdateData = {
            firstName: "???",
            lastName: "newUser",
            address1: "111 NewMain St",
            address2: "",
            city: "NewOnetown",
            state: "CA",
            zip: "11111",
        };

        const response = await request(express().use(router)).put('/api/users/updateProfile')
        .set('token', token)
        .send(userUpdateData);

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid first name input.');
    });

    it('PUT /api/users/updateProfile should return 401 with bad address1 input', async () => {

        // Create a valid token for existing user
        const token = jwt.sign({userId: 300}, "secretkey")

        const userUpdateData = {
            firstName: "newUser",
            lastName: "newUser",
            address1: "Bad Address",
            address2: "",
            city: "NewOnetown",
            state: "CA",
            zip: "11111",
        };

        const response = await request(express().use(router)).put('/api/users/updateProfile')
        .set('token', token)
        .send(userUpdateData);

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid address 1 input.');
    });

    it('PUT /api/users/updateProfile should return 401 with bad address2 input', async () => {

        // Create a valid token for existing user
        const token = jwt.sign({userId: 300}, "secretkey")

        const userUpdateData = {
            firstName: "newUser",
            lastName: "newUser",
            address1: "111 NewMain St",
            address2: "? No apt",
            city: "NewOnetown",
            state: "CA",
            zip: "11111",
        };

        const response = await request(express().use(router)).put('/api/users/updateProfile')
        .set('token', token)
        .send(userUpdateData);

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid address 2 input.');
    });

    it('PUT /api/users/updateProfile should return 401 with bad city input', async () => {

        // Create a valid token for existing user
        const token = jwt.sign({userId: 300}, "secretkey")

        const userUpdateData = {
            firstName: "newUser",
            lastName: "newUser",
            address1: "111 NewMain St",
            address2: "? No apt",
            city: "",
            state: "CA",
            zip: "11111",
        };

        const response = await request(express().use(router)).put('/api/users/updateProfile')
        .set('token', token)
        .send(userUpdateData);

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid city input.');
    });

    it('PUT /api/users/updateProfile should return 400 with bad state input', async () => {

        // Create a valid token for existing user
        const token = jwt.sign({userId: 300}, "secretkey")

        const userUpdateData = {
            firstName: "newUser",
            lastName: "newUser",
            address1: "111 NewMain St",
            address2: "",
            city: "NewOnetown",
            state: "ZZ",
            zip: "11111",
        };

        const response = await request(express().use(router)).put('/api/users/updateProfile')
        .set('token', token)
        .send(userUpdateData);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Error updating profile: invalid input.');
    });

    it('PUT /api/users/updateProfile should return 401 with bad zipCode input', async () => {

        // Create a valid token for existing user
        const token = jwt.sign({userId: 300}, "secretkey")

        const userUpdateData = {
            firstName: "newUser",
            lastName: "newUser",
            address1: "111 NewMain St",
            address2: "",
            city: "NewOnetown",
            state: "CA",
            zip: "1111",
        };

        const response = await request(express().use(router)).put('/api/users/updateProfile')
        .set('token', token)
        .send(userUpdateData);

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid zip code input.');
    });

    /* * * * * * * * * * *
    *   UPDATE ACCOUNT   *
    * * * * * * * * * * */

    it('PUT /api/users/updateAccount should update user account', async () => {
        // Create a valid token for existing user
        const token = jwt.sign({userId: 300}, "secretkey")

        const accountUpdateData = {
            email: "newuser1@mail.com",
            password: "newPass1",
        };

        const response = await request(express().use(router)).put('/api/users/updateAccount')
        .set('token', token)
        .send(accountUpdateData);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Account updated successfully');
    });

    it('PUT /api/users/updateAccount should return 404 with unknown user ID', async () => {
        // Create a valid token for non-existent user
        const token = jwt.sign({userId: 345}, "secretkey")

        const accountUpdateData = {
            email: "newuser1@mail.com",
            password: "newPass1",
        };

        const response = await request(express().use(router)).put('/api/users/updateAccount')
        .set('token', token)
        .send(accountUpdateData);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User not found');
    });

    it('PUT /api/users/updateAccount should return 500 with bad token', async () => {
        // Create a valid token for existing user
        const token = jwt.sign({userId: 300}, "secretkey")
        
        // Change token
        const tamperedToken = token.replace('badUser', 'badKey');

        const accountUpdateData = {
            email: "newuser1@mail.com",
            password: "newPass1",
        };

        const response = await request(express().use(router)).put('/api/users/updateAccount')
        .set('token', tamperedToken)
        .send(accountUpdateData);

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Internal server error');
    });

    it('PUT /api/users/updateAccount should return 400 with no email or password input', async () => {
        // Create a valid token for existing user
        const token = jwt.sign({userId: 300}, "secretkey")

        const accountUpdateData = {
            email: "",
            password: "",
        };

        const response = await request(express().use(router)).put('/api/users/updateAccount')
        .set('token', token)
        .send(accountUpdateData);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Please enter a new email or password to update your account. ');
    });

    it('PUT /api/users/updateAccount should return 401 with bad email input', async () => {
        // Create a valid token for existing user
        const token = jwt.sign({userId: 300}, "secretkey")

        const accountUpdateData = {
            email: "oogabooga",
            password: "",
        };

        const response = await request(express().use(router)).put('/api/users/updateAccount')
        .set('token', token)
        .send(accountUpdateData);

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid email input.');
    });

    it('PUT /api/users/updateAccount should return 401 with same email as current email', async () => {
        // Create a valid token for existing user
        const token = jwt.sign({userId: 300}, "secretkey")
        const currentUser = users.find((user) => user.id === 300);
        const currentEmail = currentUser.email;

        const accountUpdateData = {
            email: currentEmail,
            password: "",
        };

        const response = await request(express().use(router)).put('/api/users/updateAccount')
        .set('token', token)
        .send(accountUpdateData);

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('New email cannot be the same as old email.');
    });

    it('PUT /api/users/updateAccount should return 401 with same password as current password', async () => {
        // Create a valid token for existing user
        const token = jwt.sign({userId: 300}, "secretkey")

        const accountUpdateData = {
            email: "",
            password: "asd",
        };

        const response = await request(express().use(router)).put('/api/users/updateAccount')
        .set('token', token)
        .send(accountUpdateData);

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('New password cannot be the same as old password.');
    });

});