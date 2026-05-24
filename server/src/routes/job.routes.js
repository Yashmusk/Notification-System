const express = require('express');
const router = express.Router();
const {
  createJob,
  getJobs,  updateJob
} = require('../controllers/job.controller');
const authMiddleware = require('../middlewares/auth.middleware');



router.post(
  '/',
  authMiddleware,
  createJob
);

router.get(
  '/',
  authMiddleware,
  getJobs
);

router.put(
  '/update/:id',
  authMiddleware,
  updateJob
);

module.exports = router;