const express = require('express');
const router = express.Router();

const programRoutes = require('./programRoutes');
const tagRoutes = require('./tagRoutes');
const programTagsRoutes = require('./programTagsRoutes');

// PATH localhost:3000/programs/${programRoutes}
router.use('/programs', programRoutes);


// PATH localhost:3000/tags/${tagRoutes}
router.use('/tags', tagRoutes);

router.use('/program-tags', programTagsRoutes);

module.exports = router;
