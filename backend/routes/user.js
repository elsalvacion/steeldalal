const router = require('express').Router()
const connection = require('../config/db')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register' , (req, res) => {
    try {
        const {email, shippingAddress, name} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(req.body.password, salt)
        // find if user exist
        connection.query(`select email from users where email = ?`, [email], (existCheckErr, existCheckRes) => {
            if(existCheckErr) {
                res.status(400).json({
                    msg: 'Error while checking if user exist'
                })
            }
            else if(existCheckRes.length > 0) {
                res.status(400).json({msg: 'email already exist'})
            } else {
                connection.query(`
                insert into users(name, email, password, shippingAddress) values(?, ?, ?, ?);
                `, [name, email, password, shippingAddress], (createUserErr, createUserRes) => {
                    if(createUserErr) {
                        res.status(400).json({msg: 'Error while creating user'})
                    }else {
                        res.json({
                            name,
                            email,
                            shippingAddress,
                            token: jwt.sign({ id: createUserRes.insertId }, process.env.JWT_SECRET, {
                                expiresIn: '30d'
                            })
                        })
                    }
                })
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Server Error'})
    }
})


router.post('/login' , (req, res) => {
    try {
        const {email, password} = req.body;
        
        // find if user exist
        connection.query(`select * from users where email = ?`, [email], (existCheckErr, existCheckRes) => {
            if(existCheckErr) {
                res.status(400).json({
                    msg: 'Error while checking if user exist'
                })
            }
            else if(existCheckRes.length === 0) {
                res.status(400).json({msg: 'Email do not exist. Try registering.'})
            }
            else {
                const {name, shippingAddress, id, password: hashedPass} = existCheckRes[0]

                if(!bcrypt.compareSync(password, hashedPass)) {
                    res.status(400).json({
                        msg: 'Incorrect password'
                    })
                } else {

                    res.json({
                        name,
                        email,
                        shippingAddress,
                        token: jwt.sign({ id}, process.env.JWT_SECRET, {
                            expiresIn: '30d'
                        })
                    })
                }
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Server Error'})
    }
})

module.exports = router