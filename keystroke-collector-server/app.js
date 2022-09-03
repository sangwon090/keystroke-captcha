const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const fileStore = require('session-file-store')(session);

const config = require('./config.json');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    store: new fileStore(),
}));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/script', require('./routes/script'));
app.use('/api/debug', require('./routes/debug'));

app.listen(config.port, () => {
    console.log(`포트 ${config.port}에서 Express 서버가 시작됨.`);
});

mongoose.connect(config.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log(`mongodb 서버에 연결됨.`);
});