module.exports =(app) => {
    const officer =require('../controllers/officer.controller')
    const router = require('express').Router()
    const authJwt = require('../Middleware/authJwt');

    router.get("/",officer.findAllOfficers)
    router.post('/create-Officer', officer.upload, officer.createOfficer);
    router.get('/userProfile', authJwt.verifyToken, officer.getUserProfile);

    app.use("/Officers",router)
}