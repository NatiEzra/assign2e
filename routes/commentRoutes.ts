import express from 'express';
import commentController from '../controller/commentController';
const router = express.Router();

router.post('/',commentController.createComment);
router.get('/', commentController.getAllComments);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);
router.get('/:id', commentController.getCommentById);


export default router;