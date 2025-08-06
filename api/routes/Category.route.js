import express from 'express'
import { addCategory, deleteCategory, getAllCategory, showCategory, updateCategory } from '../controllers/Category.controller.js'
// import { onlyadmin } from '../middleware/onlyadmin.js'  // Remove this import

const CategoryRoute = express.Router()

// Remove onlyadmin middleware from routes
CategoryRoute.post('/add', addCategory)
CategoryRoute.put('/update/:categoryid', updateCategory)
CategoryRoute.get('/show/:categoryid', showCategory)
CategoryRoute.delete('/delete/:categoryid', deleteCategory)
CategoryRoute.get('/all-category', getAllCategory)

export default CategoryRoute