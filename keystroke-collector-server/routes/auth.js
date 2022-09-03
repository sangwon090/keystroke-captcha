const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

const regex_id = /^[a-zA-Z0-9]{4,16}$/;
const regex_email = /^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
const regex_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,64}$/;
const regex_memo = /^.{0,128}$/;



router.post('/register', (req, res) => {
    const { id, email, password, password_check, memo } = req.body;

    const createUser = (user) => {
        if(user) {
            res.redirect('/register?status=5');
        } else {
            if(!regex_id.test(id)) {
                res.redirect('/register?status=0');
            } else if(!regex_email.test(email)) {
                res.redirect('/register?status=1');
            } else if(password !== password_check) {
                res.redirect('/register?status=2');
            } else if(!regex_password.test(password)) {
                res.redirect('/register?status=3');
            } else if(!regex_memo.test(memo)) {
                res.redirect('/register?status=4');
            } else {
                User.create(id, email, bcrypt.hashSync(password, 10), memo);
                res.redirect('/');
            }
        }
    }

    const onError = (err) => {
        console.log(err);
        res.redirect('/register?status=500')
    }

    User.findOneById(id)
        .then(createUser)
        .catch(onError);
});



router.post('/login', (req, res) => {
    const { id, password } = req.body;

    const findUser = (user) => {
        if(!user) {
            res.redirect('/login?status=0');
        } else {
            if(user.verify(password)) {
                req.session.user = {
                    id: id,
                    authorized: true,
                };

                res.redirect('/');
            } else {
                res.redirect('/login?status=0');
            }
        }
    }

    const onError = (err) => {
        console.log(err);
        res.redirect('/register?status=500')
    }

    User.findOneById(id)
        .then(findUser)
        .catch(onError);
});



router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            res.status(500).json({
                status: 500,
                message: '로그아웃을 처리할 수 없습니다. 관리자에게 문의하세요.',
            });
        } else {
            res.redirect('/');
        }
    });
});



router.get('/is_authorized', (req, res) => {
    if(req.session.user) {
        res.json({
            result: true,
        });
    } else {
        res.json({
            result: false,
        });
    }
})



module.exports = router;