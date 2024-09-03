import { Metadata } from 'next'
import React from 'react'



export const metadata: Metadata = {
    title: "login",
    description: "Login to your account in Cyparta",
}

type Props = {
    children: React.ReactNode
}
export default function layout({ children }: Props) {
    return children
}
