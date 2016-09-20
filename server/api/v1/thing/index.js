'use strict';

var express = require('express');
import * as controller from './thing.controller';
import * as auth from '../../../auth/auth.service';

var router = express.Router();

router.get('/', auth.isAuthorized(), controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
