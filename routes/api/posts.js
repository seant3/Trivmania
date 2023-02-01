import express from 'express';
const router = express.Router();
import postsCtrl from '../../controllers/posts.js';


/*---------- Public Routes ----------*/
router.post('/', postsCtrl.create);
router.get('/', postsCtrl.index);
console.log(postsCtrl, "postsCtrl ><><><><><><")

/*---------- Protected Routes ----------*/




export default router;