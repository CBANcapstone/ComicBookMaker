const router = require('express').Router();
module.exports = router;

router.use('/', (req, res, next) => {
  // if (!req.user) {
  //   const error = new Error('Unauthorized. Please login to see that page.');
  //   error.status = 401;
  //   next(error);
  // } else {
    next();
  // }
});

router.use('/users', require('./users'));
router.use('/templates', require('./templates'));
router.use('/stories', require('./stories'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

