import { handleError } from "../helpers/handleError.js"
import Category from "../models/category.model.js"
export const addCategory = async (req, res, next) => {
    try {
        const { name, slug } = req.body
        if (!name || !slug) {
            return res.status(400).json({ message: 'Name and slug are required.' })
        }

        const existingCategory = await Category.findOne({ slug })
        if (existingCategory) {
            return res.status(409).json({ message: 'Category slug already exists.' })
        }

        const category = new Category({ name, slug })
        await category.save()

        res.status(201).json({ message: 'Category added successfully.', category })
    } catch (error) {
        console.error('Add category error:', error)  // Detailed error logging
        res.status(500).json({ message: 'Internal server error.', error: error.message })  // Include error message in response for debugging
    }
}
export const showCategory = async (req, res, next) => {
    try {
        const { categoryid } = req.params
        const category = await Category.findById(categoryid)
        if (!category) {
            next(handleError(404, 'Data not found.'))
        }
        res.status(200).json({
            category
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}
export const updateCategory = async (req, res, next) => {
    try {
        const { name, slug } = req.body
        const { categoryid } = req.params
        const category = await Category.findByIdAndUpdate(categoryid, {
            name, slug
        }, { new: true })

        res.status(200).json({
            success: true,
            message: 'Category updated successfully.',
            category
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}
export const deleteCategory = async (req, res, next) => {
    try {
        const { categoryid } = req.params
        await Category.findByIdAndDelete(categoryid)
        res.status(200).json({
            success: true,
            message: 'Category Deleted successfully.',
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}
export const getAllCategory = async (req, res, next) => {
    try {
        const category = await Category.find().sort({ name: 1 }).lean().exec()
        res.status(200).json({
            category
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}