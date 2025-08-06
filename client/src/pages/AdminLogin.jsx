import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/user/user.slice'
import { useNavigate } from 'react-router-dom'
import { showToast } from '@/helpers/showToast'
import { getEvn } from '@/helpers/getEnv'

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(3, 'Password is required'),
})

const AdminLogin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = async (values) => {
        try {
            const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(values),
            })
            const data = await response.json()
            if (!response.ok) {
                return showToast('error', data.message)
            }
            if (data.user.role !== 'admin') {
                return showToast('error', 'Access denied: Admins only')
            }
            dispatch(setUser(data.user))
            showToast('success', 'Admin login successful')
            navigate('/admin/categories') // redirect to admin dashboard or categories page
        } catch (error) {
            showToast('error', error.message)
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-96 p-6 border rounded shadow">
                    <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter your password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full mt-4">Login</Button>
                </form>
            </Form>
        </div>
    )
}

export default AdminLogin