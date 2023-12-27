"use client";
import { usePathname } from 'next/navigation';
import React from 'react'

 const redirectPathCompoennt = ({lang}:any) => {
    const pathName = usePathname()
    const redirectedPathName = (locale: string) => {
        if (!pathName) return '/'
        const segments = pathName.split('/')
        segments[1] = locale
        return segments.join('/')
    }


    return (
        <div>
            <select onChange={()=>redirectedPathName}>
                <option value="en">En</option>
                <option value="hi">Hin</option>
                <option value="te">Tel</option>
            </select>
        </div>
    )
}



export default redirectPathCompoennt;