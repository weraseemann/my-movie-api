const jwtSecret = 'your_jwt_secret'; //Same key used in the JWTStrategy

const jwt = require('jsonwebtoken'),
    passport = require('passport');

require('./passport'); //API local passport file

let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.Username, //This is ther username you are encoding in the JWT
        expiresIn: '7d', // This specifies that this token will exüpire in 7 days
        algorithm: 'HS256' //This is the algorithm used to "sign" or encode the values of the JWT
    });
}

//Post login.
module.exports = (router) => {
    router.post('/login', (req,res) => {
        passport.authenticate('local', { session: false }, (error, user, info) => {
            if (error || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user: user
                });
            }
            req.login(user, { session: false}, (error) => {
                if (error) {
                    res.send(error);
                }
                let token = generateJWTToken(user.toJSON());
                return res.json({ user: user, token: token }); //This is, in fact, ES6 shorthand for res.json({ user: user, token: token }). With ES6, if your keys are the same as your values, you can use this shorthand.
            });
        })(req,res);
    });
}
