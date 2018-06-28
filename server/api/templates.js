const router = require('express').Router();
const { Template } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  Template.findAll().then(templates => res.json(templates));
});
