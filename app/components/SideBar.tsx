"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import logo from '../../public/cypartal logo 1.svg'
import { usePathname, useRouter } from 'next/navigation'
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IconType } from 'react-icons'
import { GrGroup } from "react-icons/gr";
import { IoPersonOutline } from "react-icons/io5";
import { BiTask } from "react-icons/bi";
import { IoMdPaper } from "react-icons/io";
import { CiDollar } from "react-icons/ci";
import { RiTaskLine } from "react-icons/ri";
import { IoWalletOutline } from "react-icons/io5";
import LinksComponent from './Links'
import { FaThList } from "react-icons/fa";



export type Links = {
    path: string
    title: string
    icon?: IconType
    children: {
        title: string
        path: string
        icon?: IconType
    }[] | null
}


export default function SideBar() {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)
    const route = useRouter()



    const links: Links[] = [
        { path: "/dashboard", icon: MdOutlineSpaceDashboard, title: "Dashboard", children: null },
        {
            path: "/dashboard/employees", title: "Employees", icon: GrGroup, children: [
                { path: "/dashboard/employees/profile", title: "Profile", icon: IoPersonOutline },
                { path: "/dashboard/employees/attendance", title: "Attendance", icon: BiTask },
                { path: "/dashboard/employees/tasks", title: "Tasks", icon: IoMdPaper },
            ]
        },
        { path: "/dashboard/payroll", title: "Payroll", children: null, icon: CiDollar },
        { path: "/dashboard/holidays", title: "Holidays", children: [], icon: RiTaskLine },
        { path: "/dashboard/advanced-payment", title: "Advanced Payment", children: null, icon: IoWalletOutline },
    ]





    return (
        pathname !== "/login" && (
            <>
                <button
                    className={`
                    size-10 rounded-md p-1.5 bg-gray-400 bg-opacity-50 flex justify-center items-center lg:hidden 
                    fixed top-1 left-1  z-50 transition-all duration-300`}
                    onClick={() => setOpen(!open)}
                >
                    <FaThList size={"100%"} />
                </button>
                <aside className={`
            fixed top-0 left-0 bottom-0  z-40 bg-[#E9E9E9]   ${open ? "w-80 p-4 " : "w-0 overflow-hidden"}
            lg:static  lg:overflow-visible lg:w-80 lg:p-4 transition-all duration-300`}>
                    <div className='size-full  rounded-3xl border-gray-400 border   w-72 shadow border-opacity-50  '>
                        <Image onClick={() => route.push("/")} src={logo} alt="logo" width={200} height={200} priority={true} className='w-8/12 mx-auto mt-5 cursor-pointer' />
                        <nav className="flex flex-col justify-center items-center mt-20 gap-10  ">
                            {
                                links.map((link, index) => <LinksComponent link={link} key={index} />)
                            }
                        </nav>
                    </div>
                </aside></>)
    )
}
