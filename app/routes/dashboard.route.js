module.exports = (app) => {
  //const dashboard = require("../controllers/dashboard.controller");
  const router = require('express').Router();

  app.get('/dashboard', (req, res) => {
    res.send('Dashboard Page');
  });

  app.use('/dashboard', router);
};
