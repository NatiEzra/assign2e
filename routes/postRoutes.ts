import express  from 'express';
const router = express.Router();
import postController from '../controller/postController';

router.post('/',postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
export default router;
