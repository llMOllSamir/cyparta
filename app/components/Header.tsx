import Image from 'next/image'
import React from 'react'
import { IoNotificationsOutline } from 'react-icons/io5';
import Logout from './Logout';
import { cookies } from 'next/headers';

export default async function Header() {
    const userToken = cookies().get('token')?.value

    const response = await fetch('https://cyparta-backend-gf7qm.ondigitalocean.app/api/profile/', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`
        },
        cache: "no-cache"
    })

    const data = await response.json()


    return (
        <header className='w-full flex items-center justify-end gap-4   p-4' >
            <Logout size={"1.6rem"} title='Logout' cursor={"pointer"} />
            <button className='flex items-center justify-center gap-2 size-10 bg-gray-400 bg-opacity-30 rounded-xl '>
                <IoNotificationsOutline size={"1.6rem"} />
            </button>
            <Image priority={true} width={50} height={50} src={data?.image} alt="avatar" className='rounded-full size-14' />
        </header>
    )
}
