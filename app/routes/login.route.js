module.exports = (app) => {
  const login = require("../controllers/login.controller");
  const router = require('express').Router();

  router.post("/genkey", login.genkey);
  router.post('/', login.login);

  app.use('/api/login', router);
};