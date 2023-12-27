"use client";

import { usePathname } from "next/navigation";

export default function Dropdown({lang}:any) {


    const pathName = usePathname()
    const redirectedPathName = (locale: string) => {
        if (!pathName) return '/'
        const segments = pathName.split('/')
        segments[1] = locale
        return segments.join('/')
    }


        return (
            <div >
                <select className="px-6 border p-1 my-2" onChange={(e) => redirectedPathName(e.target.value)}>
                    <option value="en">En</option>
                    <option value="hi">Hin</option>
                    <option value="te">Tel</option>
                </select>
            </div>
        )
    }