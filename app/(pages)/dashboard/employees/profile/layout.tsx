
import PersonCard from '@/app/components/PersonCard'
import { Metadata } from 'next'
import React from 'react'
import Tabs from './Tabs'

export const metadata: Metadata = {
    title: "Profile"
}

type Props = {
    children: React.ReactNode
}
export default function layout({ children }: Props) {
    return (
        <div className='grow'>
            <PersonCard />
            <Tabs />
            {children}
        </div>
    )
}
