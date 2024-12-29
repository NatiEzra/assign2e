import express from 'express';
import commentController from '../controller/commentController';
const router = express.Router();

import {authMiddleware} from '../controller/authController';

router.post('/', authMiddleware, commentController.createComment);
router.get('/', commentController.getAllComments);
router.put('/:id', authMiddleware, commentController.updateComment);
router.delete('/:id', authMiddleware, commentController.deleteComment);
router.get('/:id', commentController.getCommentById);


export default router;