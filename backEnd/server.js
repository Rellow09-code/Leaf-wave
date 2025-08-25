const express = require('express');
const app = express();
const PORT = 3000;
const pool = require('./config/database');
const cors = require('cors');

//Routes
const serverRoute = require('./routes/index');
const authRoute = require('./routes/auth');

//Pre server configurations
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.use((req, res, next) => {
  res.removeHeader('Cross-Origin-Opener-Policy'); // or don't set it at all
  next();
});

//mounting routes
app.use('/',serverRoute);
app.use('/auth',authRoute);


// app.listen(PORT,()=>{
//     console.log(`server is running on porrt ${PORT}`);
// })

module.exports = app;