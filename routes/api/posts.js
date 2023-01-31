import express from 'express';
const router = express.Router();
import postsCtrl from '../../controllers/posts.js';


/*---------- Public Routes ----------*/
router.post('/', postsCtrl.create);
router.get('/', postsCtrl.index);


/*---------- Protected Routes ----------*/




export default router;