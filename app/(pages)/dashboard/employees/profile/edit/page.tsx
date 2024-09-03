"use client"
import React, { useState, useEffect } from 'react'
import { UserData } from '../page'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'

export default function Edit() {
    const [data, setData] = useState<UserData | null>(null)
    const router = useRouter()
    const onSubmit = async (values: { first_name: string, last_name: string, phone: string }) => {
        try {
            const response = await fetch('/api/profile/edit', {
                method: 'POST',
                body: JSON.stringify(values)
            })
            if (response.ok) {
                const data: { data: UserData } = await response.json()
                setData(data.data)
                router.push('/dashboard/employees/profile')
            }
        } catch (error) {

        }
    }

    const { values, handleSubmit, handleChange } = useFormik<{ first_name: string, last_name: string, phone: string, bio: string }>({
        initialValues: {
            first_name: data?.first_name || '',
            last_name: data?.last_name || '',
            phone: data?.phone || '',
            bio: data?.bio || '',
        },
        onSubmit
    })
    const fetchData = async () => {
        const response = await fetch('/api/profile', {
            method: 'GET',

        })
        const data: { data: UserData } = await response.json()
        setData(data.data)
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        data &&
        <form onSubmit={handleSubmit} className='  grid grid-cols-1  md:grid-cols-2 gap-4 sm:w-3/4 sm:mx-auto md:mx-0  md:w-10/12 2xl:w-4/6'>
            <FormInput title='First Name' name={"first_name"} value={values.first_name} change={handleChange} />
            <FormInput title='Last Name' name={"last_name"} value={values.last_name} change={handleChange} />
            <FormInput title='Mobile Number' name={"phone"} value={values.phone} change={handleChange} />
            <FormInput title='Bio' name={"bio"} value={values.bio} change={handleChange} />
            <button type='submit' className='md:col-span-2 bg-black mt-5 flex items-center justify-center w-fit mx-auto text-white py-2 px-20 rounded'>Edit</button>
        </form>

    )
}


type InputProps = {
    title: string
    value: string
    name: string
    change: (event: React.ChangeEvent<HTMLInputElement>) => void
}
function FormInput({ title, value, change, name }: InputProps) {


    return <div className='flex flex-col gap-2'>
        <label htmlFor="" className={`capitalize  text-gray-400  `}>{title}</label>
        <input type="text" value={value}
            onChange={change} name={name}
            className='bg-transparent border-b border-gray-400 border-opacity-40  pb-2  font-bold cursor-pointer focus:outline-none  ' />
    </div>

}