import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'
import { setTimeout } from 'timers';


type Props = {

    children: React.ReactNode
}
export default function ProtectedRoute({ children }: Props) {

    setTimeout(() => {
        const userTojen: string | undefined = cookies().get("token")?.value;
        if (!userTojen) {
            redirect("/login")
        }
    }, 1000)
    return (
        children
    )
}
