const express = require('express')
const bcrypt = require('bcrypt')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./db.json')
const db = low(adapter)

// Initialize Express app
const app = express()
db.read();
db.data ||= { users: [] };
db.write();

// Define a JWT secret key. This should be isolated by using env variables for security
const jwtSecretKey = 'dsfdsfsdfdsvcsvdfgefg'

// Set up CORS and JSON middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
    res.send('Auth API.\nPlease use POST /auth & POST /verify for authentication')
})

app.post('/auth', (req, res) => {
    const { email, password } = req.body
    console.log(email, password);

    // Look up the user entry in the database
    const user = db.get('users').find({ email }).value();

    // If found, compare the hashed passwords and generate the JWT token for the user
    if (user) {
        bcrypt.compare(password, user.password, function (_err, result) {
            if (!result) {
                return res.status(401).json({ message: 'Invalid password' })
            } else {
                let loginData = {
                    email,
                    signInTime: Date.now(),
                }

                const token = jwt.sign(loginData, jwtSecretKey)
                res.status(200).json({ message: 'success', token })
            }
        })
        // If no user is found, hash the given password and create a new entry in the auth db with the email and hashed password
    } else if (user === undefined || user.length === 0) {
        bcrypt.hash(password, 10, function (_err, hash) {
            console.log({ email, password: hash })
            db.get('users').push({ email, password: hash }).write()

            let loginData = {
                email,
                signInTime: Date.now(),
            }

            const token = jwt.sign(loginData, jwtSecretKey)
            res.status(200).json({ message: 'success', token })
        })
    }
})

app.post('/verify', (req, res) => {
    const tokenHeaderKey = 'jwt-token'
    const authToken = req.headers[tokenHeaderKey]
    try {
        const verified = jwt.verify(authToken, jwtSecretKey)
        if (verified) {
            return res.status(200).json({ status: 'logged in', message: 'success' })
        } else {
            // Access Denied
            return res.status(401).json({ status: 'invalid auth', message: 'error' })
        }
    } catch (error) {
        // Access Denied
        return res.status(401).json({ status: 'invalid auth', message: 'error' })
    }
})

app.post('/check-account', (req, res) => {
    const { email } = req.body

    console.log(req.body)

    const user = db
        .get('users')
        .value()
        .filter((user) => email === user.email)

    console.log(user)

    res.status(200).json({
        status: user.length === 1 ? 'User exists' : 'User does not exist',
        userExists: user.length === 1,
    })
})

app.listen(3080)