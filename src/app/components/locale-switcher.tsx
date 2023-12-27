'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { FaGlobe } from "react-icons/fa";

export default function LocaleSwitcher({ lang }: { lang: string }) {
  const pathName = usePathname()
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  const languageMenu = [
    { "name": "English", "value": "en" },
    { "name": "తెలుగు", "value": "te" },
    { "name": "हिंदी", "value": "hi" },
  ]

  const checkLang = () => {
    if (lang) {
      const data = languageMenu.filter((item) => { return item?.value == lang })
      if (data.length)
        return data[0]?.name
    }
    return "English"
  };


  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-wrap">
      <div className="relative inline-block text-left ">
        <button onClick={handleDropdownToggle} type="button" className="text-white w-36 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >
          <FaGlobe />&nbsp; {checkLang()} {" "}<svg className={`w-2.5 h-2.5 ml-2.5 transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {isOpen && (
          <div
            id="dropdown"
            className="z-10 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-36 dark:bg-gray-700"
            style={{ bottom: "calc(100% + 0.5rem)" }} // Adjust the positioning
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              {languageMenu.map((locale, i) => {
                return (
                  <li key={i} className="shadow hover:bg-gray-300 hover:text-black rounded-md m-1">
                    <Link href={redirectedPathName(locale.value)}>
                      <button className="block p-1 hover:text-blue-100"> {locale.name}</button>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}