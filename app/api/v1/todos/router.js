const express = require('express');
const { index, find, create, update, toggle, destroy } = require('./controller');

const router = express.Router();

router.get('/', index);
router.post('/', create);

router.get('/:id', find);
router.put('/:id', update);
router.delete('/:id', destroy);

router.put('/:id/status', toggle);

module.exports = router;
