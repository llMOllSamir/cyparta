"use client"
import React, { useState } from 'react'
import { IconType } from 'react-icons'
import { IoPerson } from "react-icons/io5";
import { MdOutlineBusinessCenter } from 'react-icons/md'
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Tabs() {
    const pathname = usePathname()
    type Tab = {
        title: string
        path: string
        icon: IconType
    }
    const tabs: Tab[] = [
        { title: "Personal Information", path: "/dashboard/employees/profile", icon: IoPerson },
        { title: "Professional Information", path: "/dashboard/employees/profile/professional-information", icon: MdOutlineBusinessCenter },
        { title: "Documents", path: "/dashboard/employees/profile/documents", icon: IoDocumentTextOutline },
        { title: "Account Access", path: "/dashboard/employees/profile/account-access", icon: MdLockOutline },
    ]

    return (
        <div className='  flex flex-start gap-8 md:w-fit pe-4 my-4 border-b border-gray-400 border-opacity-40 overflow-x-auto'>
            {tabs.map((tab, index) => (
                <Link
                    key={index}
                    href={tab.path}
                    className={`capitalize text-base  text-nowrap   flex justify-start  items-center py-2 gap-2
                    ${pathname === tab.path ? "text-red-600 border-b-4     border-red-600 " : ""} `}
                >
                    {tab.icon && <tab.icon className='font-medium' size={"1.4rem"} />}{tab.title}
                </Link>
            ))}
        </div>
    )
}
