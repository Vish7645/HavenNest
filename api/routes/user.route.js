// const express=require('express')
import express from 'express'
// const {test} = require('../controllers/user.controller.js')
import {test} from '../controllers/user.controller.js'

const router=express.Router()

router.get('/test',test)

export default router
// module.exports=router