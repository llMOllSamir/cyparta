import Breadcrumb from '@/app/components/Breadcrumb'
import Header from '@/app/components/Header'
import { Metadata } from 'next'
import React from 'react'
import avatar from "@/public/assists/images/image.png"



export const metadata: Metadata = {
    title: "Employees",
}

type Props = {
    children: React.ReactNode
}
export default function layout({ children }: Props) {
    return (
        < >
            <Breadcrumb />
            {children}
        </ >
    )
}
