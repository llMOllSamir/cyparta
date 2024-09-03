"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import logo from '../../../public/cypartal logo 1.svg'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ImSpinner2 } from 'react-icons/im'
import { ResponseLoginData } from '@/app/api/auth/login/route'
import { useRouter } from 'next/navigation'

export default function Login() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const route = useRouter()
    //  validation schema
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Email is Required'),
        password: Yup.string().required('Password is Required').min(6, 'Must be 6 characters or more')
    })

    type ResponseData = {
        message: "Login successful" | "Login failed"
        data: ResponseLoginData
    }

    // login handler
    const onSubmit = async (values: { email: string, password: string }) => {
        setLoading(true)
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            const data: ResponseData = await res.json()
            setLoading(false)
            if (data.message === "Login successful") {
                setError(null)
                localStorage.setItem("token", data.data.access)
                route.push("/dashboard")
            }
            if (data.message === "Login failed") {
                setError(data.message)
            }
        } catch (error) {
            setError("Something went wrong")
        } finally {
            setLoading(false)
        }
    }
    // handle Form
    const { handleSubmit, handleReset, handleBlur, handleChange, values, errors, touched } = useFormik<{ email: string, password: string }>({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit
    })

    return (
        <section className='flex flex-col items-center justify-center gap-6 w-full select-none  '>
            <Image alt='Cyparta' priority={true} className='w-auto h-auto' src={logo} width={200} height={200} />
            <form onSubmit={handleSubmit} onReset={handleReset} className='flex shadow  flex-col items-center justify-center min-w-96 md:w-[600px] gap-4 p-10 rounded-lg border-opacity-50 border-2 border-gray-400' >
                {error && <p className='text-base text-red-600 font-bold'>{error}</p>}
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor="email" className='font-semibold text-sm'>Email Address</label>
                    <input onChange={handleChange} onBlur={handleBlur} value={values.email} type="text" placeholder='Email' id='email' name='email' className={`border-opacity-50 border ${(errors.email && touched.email) ? "border-red-600" : "border-gray-400"} focus:border-black px-4 py-2 rounded-md w-full bg-transparent`} />
                    {errors.email && touched.email && <p className='text-red-500 text-sm font-bold'>{errors.email}</p>}
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor="password" className='font-semibold text-sm '>Password</label>
                    <div className='relative'>
                        <input onChange={handleChange} onBlur={handleBlur} value={values.password} type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' id='password' className={`border-opacity-50 border ${(errors.password && touched.password) ? "border-red-600" : "border-gray-400"} focus:border-black px-4 py-2 rounded-md w-full bg-transparent`} />
                        {
                            values.password.length > 0 &&
                            <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute right-2 top-1/2 -translate-y-1/2'>
                                {showPassword ? <AiOutlineEye size={"1.5rem"} /> : <AiOutlineEyeInvisible size={"1.5rem"} />}
                            </button>
                        }
                    </div>
                    {errors.password && touched.password && <p className='text-red-500 text-sm font-bold'>{errors.password}</p>}
                </div>

                <button type='submit' disabled={loading} className='bg-black text-white mt-10  py-2 rounded-md mx-auto w-3/4'>
                    {loading ? <ImSpinner2 size={"1.5rem"} className='mx-auto animate-spin' />
                        : "Login"}
                </button>
            </form>
        </section>
    )
}
