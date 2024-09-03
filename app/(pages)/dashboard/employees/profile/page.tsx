import { cookies } from 'next/headers'
import React from 'react'

export type UserData = {
    id: number,
    name: string,
    email: string,
    phone: string,
    image: string,
    last_login: null,
    first_name: string,
    last_name: string,
    date_joined: string,
    created: string,
    updated: string,
    uip: null,
    bio: string,
    cover: string,
    contract_email: null,
    contract_number: null,
    groups: [],
    user_permissions: []
}
export default async function page() {
    const userToken = cookies().get('token')?.value

    const response = await fetch('https://cyparta-backend-gf7qm.ondigitalocean.app/api/profile/', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`
        },
        next: { revalidate: 0 }
    })

    const data: UserData = await response.json()

    const fixDate = (dateString: string) => {
        const date = new Date(dateString)
        const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' }).replace(/,/, ' /');
        return formattedDate
    }
    return (
        <>
            <form className='  grid grid-cols-1  md:grid-cols-2 gap-4 sm:w-3/4 sm:mx-auto md:mx-0  md:w-10/12 2xl:w-4/6'>
                <FormInput title='First Name' value={data.first_name} />
                <FormInput title='Last Name' value={data.last_name} />
                <FormInput title='Mobile Number' value={data.phone} />
                <FormInput title='Email Address' value={data.email} />
                <FormInput title='Date Of Birth' value={fixDate(data.date_joined)} />
                <FormInput title='Marital Status' value={"Single"} />
                <FormInput title='Gender' value={"Male"} />
                <FormInput title='Nationality' value={"Egypt"} />
                <FormInput title='Address' value={"Alexandria"} />
                <FormInput title='City' value={"Alexandria"} />
                <FormInput title='State' value={"Alexandria"} />
                <FormInput title='Zip Code' value={"12334"} />
            </form>
            <div className='flex flex-col md:flex-row md:items-center flex-wrap gap-2 md:gap-x-20 mt-2 '>
                <FormInput title='Works hours' value={"10 hour"} />
                <FormInput title='Salary/hour' value={"300 EGP"} />
                <FormInput title='Total salary' color="red" value={"54000 EGP"} />
            </div>
        </>
    )
}

type InputProps = {
    title: string,
    value: string
    color?: string
}
function FormInput({ title, value, color }: InputProps) {


    return <div className='flex flex-col gap-2'>
        <label htmlFor="" className={`capitalize  ${color ? `text-${color}-600 font-bold` : "text-gray-400"}  `}>{title}</label>
        <input type="text" readOnly value={value}
            className='bg-transparent border-b border-gray-400 border-opacity-40  pb-2  font-bold cursor-pointer focus:outline-none  ' />
    </div>

}