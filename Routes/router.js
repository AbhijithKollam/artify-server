const userController = require('../Controllers/userController')
const express = require('express')
const artController = require('../Controllers/artController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware');
const multerConfig = require('../Middlewares/multerMiddleware');
const profileController= require('../Controllers/profileController')

const router = new express.Router();

// define paths
router.post('/user/register',userController.register)
router.post('/user/login',userController.login)
router.post('/art/add',jwtMiddleware,multerConfig.single('artImage') ,artController.addArt)
router.get('/art/home-art',artController.getHomeArt)
router.get('/art/all-art',jwtMiddleware,artController.getAllArt)
router.get('/art/user-art',jwtMiddleware,artController.getUserArt)

router.delete('/art/remove/:id',jwtMiddleware,artController.deleteUserArt)


router.put('/art/edit/:id',jwtMiddleware,multerConfig.single('artImage'),artController.editUserArt)

router.post('/profile/add',jwtMiddleware,multerConfig.single('profileImage'),profileController.addProfile)

router.get('/profile/get',jwtMiddleware,profileController.getUserProfile)

router.put('/profile/edit/:id',jwtMiddleware,multerConfig.single('profileImage'),profileController.editProfile)

router.post('/art/cart',jwtMiddleware,artController.addCart)

router.get('/get-cart',jwtMiddleware ,artController.getCart)

router.delete('/cart/remove/:id',jwtMiddleware,artController.deleteUserCart)

router.get('/get-profile/:artistName' ,profileController.getProfile)

router.delete('/cart/deleteAfter',jwtMiddleware,artController.deleteAfterCart)




module.exports= router;