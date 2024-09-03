"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { IconBaseProps } from 'react-icons';
import { CiLogout } from "react-icons/ci";



export default function Logout({ onClick, ...props }: IconBaseProps) {
    const [isLogedin, setIsLogedin] = useState(true)
    const route = useRouter()
    const handleLogout = async () => {
        try {
            const res = await fetch('/api/auth/logout', {
                method: 'POST',
            })
            console.log(res);

            localStorage.removeItem('token')
            setIsLogedin(false)
            route.push('/login')
        } catch (error) {

        }
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            setIsLogedin(false)
        }

    }, [setIsLogedin])


    return (
        isLogedin &&
        < CiLogout {...props} onClick={handleLogout} />
    )
}
