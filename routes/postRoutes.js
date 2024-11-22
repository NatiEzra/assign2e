const express = require('express');
const router = express.Router();
const  postmodel = require('../model/post');

const postController = require('../controller/postController');
router.post('/', postController.createPost);
router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);

module.exports = router;