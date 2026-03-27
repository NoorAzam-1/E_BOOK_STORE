import express from 'express';
import {loginUser,registerUser,adminLogin,forgotPassword,resetPassword,userProfile} from '../controllers/userController.js' 
import userAuth from '../middleware/userAuth.js';

const userRouter = express.Router();
userRouter.post('/forgot_password', forgotPassword);
userRouter.post('/reset_password', resetPassword);
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)

userRouter.get("/profile", userAuth, userProfile);

export default userRouter;