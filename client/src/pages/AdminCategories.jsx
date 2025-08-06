import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { showToast } from '@/helpers/showToast'
import { getEvn } from '@/helpers/getEnv'
import slugify from 'slugify'

const schema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    slug: z.string().min(3, 'Slug must be at least 3 characters long'),
})

const AdminCategories = () => {
    const user = useSelector(state => state.user)
    const [categories, setCategories] = useState([])

    if (!user.isLoggedIn || user.user.role !== 'admin') {
        return <Navigate to="/" />
    }

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            slug: '',
        },
    })

    const categoryName = form.watch('name')

    useEffect(() => {
        if (categoryName) {
            const slug = slugify(categoryName, { lower: true })
            form.setValue('slug', slug)
        }
    }, [categoryName])

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        try {
            const res = await fetch(`${getEvn('VITE_API_BASE_URL')}/category/all-category`)
            const data = await res.json()
            if (res.ok) {
                setCategories(data.category || data.categories || [])
            } else {
                showToast('error', data.message || 'Failed to load categories')
            }
        } catch (error) {
            showToast('error', error.message)
        }
    }

    const onSubmit = async (values) => {
        try {
            const res = await fetch(`${getEvn('VITE_API_BASE_URL')}/category/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            })
            const data = await res.json()
            if (!res.ok) {
                return showToast('error', data.message)
            }
            showToast('success', data.message)
            form.reset()
            fetchCategories()
        } catch (error) {
            showToast('error', error.message)
        }
    }

    return (
        <div className="max-w-screen-md mx-auto p-5">
            <Card>
                <CardContent>
                    <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Category name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Slug</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Slug" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full mt-4">Add Category</Button>
                        </form>
                    </Form>

                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-2">Existing Categories</h3>
                        <ul>
                            {categories.length === 0 && <li>No categories found.</li>}
                            {categories.map(cat => (
                                <li key={cat._id} className="border p-2 rounded mb-1">
                                    {cat.name} ({cat.slug})
                                </li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default AdminCategories