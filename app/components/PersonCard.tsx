import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { CiMail } from 'react-icons/ci'
import { MdOutlineBusinessCenter } from 'react-icons/md'
import { AiOutlineEdit } from 'react-icons/ai'
import { cookies } from 'next/headers'
export default async function PersonCard() {
    const userToken = cookies().get('token')?.value
    const response = await fetch('https://cyparta-backend-gf7qm.ondigitalocean.app/api/profile/', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`
        },
        next: { revalidate: 0 }
    })

    const data = await response.json()

    return (
        <div className='border-b py-4 border-gray-400 border-opacity-40 items-center flex flex-col md:flex-row gap-2'>
            <Image priority={true} src={data?.cover} width={100} height={100} alt="Profile" className='rounded-md size-24' />
            <div className='flex flex-col gap-2'>
                <h2 className='font-bold text-2xl'>{data?.name} </h2>
                <p className='flex text-base font-light gap-1 items-center'>
                    <MdOutlineBusinessCenter className=' ' size={"1.4rem"} />
                    {data?.bio}
                </p>
                <p className='flex text-base font-light gap-1 items-center'>
                    <CiMail className=' ' size={"1.4rem"} />
                    <Link href={`mailto:${data?.email}`} >{data?.email}</Link>
                </p>
            </div>
            <Link href={"/dashboard/employees/profile/edit"} className='flex gap-2 items-center justify-center md:ms-auto md:me-20 text-sm font-light md:mt-auto bg-black text-white px-6 py-2 rounded-md '>
                <AiOutlineEdit size={"1.4rem"} />
                Edit Profile
            </Link>
        </div>
    )
}
