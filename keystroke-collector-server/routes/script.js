const router = require('express').Router();
const script = require('../script.json');

const User = require('../models/user');
const Data = require('../models/data');

router.get('/download', (req, res) => {
    const sendScript = (user) => {
        if(!user) {
            throw new Error('로그인 하십시오.');
        } else {
            if(user.progress >= script.length) {
                res.json({
                    status: 100,
                    progress: user.progress,
                });
            } else {
                res.json({
                    status: 0,
                    language: script[user.progress].language,
                    progress: user.progress,
                    content: script[user.progress].content,
                });
            }
        }
    }

    const onError = (err) => {
        console.log(err);

        res.status(403).json({
            status: 403,
            message: (err.message == undefined) ? '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.' : err.message,
        });
    }

    User.findOneById(req.session.user.id)
        .then(sendScript)
        .catch(onError);
});

router.post('/submit', async (req, res) => {
    Data.create(req.session.user.id, req.body);

    const updateProgress = async (user) => {
        if(!user) {
            throw new Error('로그인 하십시오.');
        } else {
            user.progress += 1;
            await user.save();
        }
    }

    const onError = (err) => {
        console.log(err);

        res.status(403).json({
            status: 403,
            message: (err.message == undefined) ? '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.' : err.message,
        });
    }

    User.findOneById(req.session.user.id)
        .then(updateProgress)
        .catch(onError);


    res.send('OK');
});

module.exports = router;