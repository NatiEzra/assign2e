import express from 'express';
const router = express.Router();
import commentController from '../controller/commentController';

router.post('/',commentController.createComment);
router.get('/', commentController.getAllComments);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

export default router;