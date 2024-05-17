import express from 'express'
import { isAuthenticated } from '../middlewares/authentication'
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index.html')
})

export default router
