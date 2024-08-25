const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const bodyParse = require('body-parser')
// Port setting
require('dotenv').config()
const PORT = process.env.PORT || 5000;


// middle ware เพื่อยอมรับไฟล์json form fontend
app.use(express.json())
// ยอมรับ key value 
app.use(express.urlencoded({extended: true}))
// 
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParse.json({ limit: '10mb' }))

// connect Database
const db = require('./app/models')
db.sequelize.sync({force:false}).then(() => { //force คือการ
    console.log('Database is connected... link:: http://localhost:8080/')
})


require("./app/routes/dashboard.route")(app);
require("./app/routes/analyze.route")(app);
require("./app/routes/login.route")(app);
require("./app/routes/officer.route")(app);
require("./app/routes/Project.route")(app);


app.listen(PORT, () => {
    console.log('Server connected at port 5000 link:: http://localhost:5000/')
})
