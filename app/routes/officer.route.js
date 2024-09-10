module.exports = (app) => {
    const officer = require('../controllers/officer.controller');
    const router = require('express').Router();
    const authJwt = require('../Middleware/authJwt');

    // All routes use authJwt.verifyToken middleware

    router.get("/", officer.findAllOfficers);
    router.post('/create-Officer', officer.upload.single('profilePicture'),officer.createOfficer);
    router.get('/userProfile', authJwt.verifyToken,officer.getUserProfile);
    router.put('/officers/:id', authJwt.verifyToken, officer.updateOfficer);

    app.use("/Officers", router);
};