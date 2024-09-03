"use client"
import React, { useState } from 'react'
import { Links } from './SideBar'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

type props = {
    link: Links
}
export default function LinksComponent({ link }: props) {
    const [show, setShow] = useState(false)
    const pathname = usePathname()

    return (
        <div className='w-full flex flex-col gap-4'>
            <Link href={link.path} className={`capitalize text-base font-bold  p-2   ps-16 flex justify-start w-full items-center
                ${(pathname === link.path || (pathname.startsWith(link.path) && link.children)) ? "bg-red-200 bg-opacity-50   border-s-4 rounded-e-full text-red-600  border-red-600 " : ""} `}>
                <div className='flex items-center   gap-2 '>{link.icon && <link.icon className='font-medium' size={"1.6rem"} />}{link.title}</div>
                {link.children &&
                    <MdOutlineKeyboardArrowRight size={"1.6rem"} className={`${pathname.startsWith(link.path) ? "rotate-90" : ""}  w-fit ms-auto me-4 transition-all  duration-300`} onClick={() => setShow(!show)} />
                }
            </Link>
            {
                <ul className={`flex flex-col gap-4 items-center justify-center w-full ${(link.children && pathname.includes(link.path)) ? "h-full" : "h-0 overflow-hidden"} transition-all duration-400 `}>
                    {link.children?.map((item, index) => (
                        <li key={index} className='w-full ps-24 '>
                            <Link href={item.path} className={`${pathname.includes(item.path) && "text-gray-400"} flex gap-2 `} >
                                {item.icon && <item.icon className='font-medium' size={"1.6rem"} />}
                                {item.title}</Link>
                        </li>
                    ))}
                </ul>
            }
        </div >
    )
}
