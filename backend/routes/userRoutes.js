import express from 'express'


import {authUser, getUserProfile, registerUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router()

router.route('/register').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile);

export default router



// router.get('/', asyncHandler(async(req, res) => {
//     const users =await User.find({})
//     res.send(users);
//  })
// )

// router.get('/:id', asyncHandler(async(req, res) =>{
//     const user = await User.findById(req.params.id)
//     if(user){
//     res.json(user);
//     }
//     else{
//         res.status(404)
//         throw new Error('Product not Found');
//     }
// })
// )