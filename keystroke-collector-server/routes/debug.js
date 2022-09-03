const router = require('express').Router();
const script = require('../script.json');

const User = require('../models/user');
const Data = require('../models/data');

router.get('/get_data', (req, res) => {
    const sendData = (user) => {
        if(!user) {
            throw new Error('로그인 하십시오.');
        } else {
            User.findOne({id: req.session.user.id}).then((user) => {
                Data.find({user: user._id}).then((datas) => {
                    const data = {
                        account: {
                            'id': user.id,
                            'email': user.email,
                            'memo': user.memo,
                            'progress': user.progress,
                        },
                        data: datas
                    }
                    res.send(JSON.stringify(data));
                });
            })
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
        .then(sendData)
        .catch(onError);
});

module.exports = router;