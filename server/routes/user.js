import express from 'express'
import {signInControllers,signUpCOntrollers} from '../controllers/users.js'

const router = express.Router();


router.post('/signin',signInControllers)
router.post('/signup',signUpCOntrollers)


export default router