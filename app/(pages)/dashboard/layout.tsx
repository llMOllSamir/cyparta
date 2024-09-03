import Header from "@/app/components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard",
};

type Props = {
    children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {


    return (
        <section className='w-full flex flex-col gap-4   px-8 '>
            <Header />
            {children}
        </section >
    );
}
