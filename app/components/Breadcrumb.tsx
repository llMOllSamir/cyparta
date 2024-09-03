// components/Breadcrumb.js
"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useMemo } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';

const Breadcrumb = () => {
    const pathname = usePathname();
    const pathArray = useMemo(() => {
        return pathname.split('/').filter((path) => path);
    }, [pathname])

    return (
        <nav aria-label="breadcrumb">
            <ol className="flex space-x-2">
                {pathArray.map((path, index) => {
                    const href = `/${pathArray.slice(0, index + 1).join('/')}`;
                    return (
                        <li key={index} className="inline-flex items-center">
                            {index > 0 && <MdKeyboardArrowRight className='mx-2' size={"1.5rem"} />}
                            <Link href={href} className="text-black font-bold hover:underline capitalize">
                                {path}
                            </Link>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

export default Breadcrumb