require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth');
const trackRouter = require('./routes/trackRoutes');

const app = express();

app.use(bodyParser.json())
app.use(authRouter);
app.use(trackRouter);

const mongoUri = "mongodb://127.0.0.1:27017/track_db"

mongoose.connect(mongoUri, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected', () => {
    console.log('connected to mongo instance...')
})
mongoose.connection.on('error', (error)=> {
    console.log("Error connecting to mongodb", error);
})

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
})

app.listen(3001, () =>{
    console.log("listening on port 3001")
})