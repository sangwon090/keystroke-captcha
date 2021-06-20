const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(3001, () => {
    console.log('서버가 시작되었습니다.');
})