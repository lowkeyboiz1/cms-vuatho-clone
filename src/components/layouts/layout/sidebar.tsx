import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import { miniSidebar } from '@/constants'
import { Accordion, AccordionItem } from '@nextui-org/react'

const SideBar = () => {
  const router = useRouter()
  const pathnameRouter = router.pathname
  const [initSideBar, setInitSideBar] = useState(miniSidebar)
  const checkActiveMenu = findItemByUrl(miniSidebar, pathnameRouter)
  const [contentSideBar, setContentSideBar] = useState(
    miniSidebar.find(i => i.title === checkActiveMenu?.title),
  )

  const activeDropdown = checkActiveMenu?.children.find((i: any) => {
    if (i?.children?.some((ci: any) => ci.url === pathnameRouter)) return i
  })

  const [active, setActive] = useState(checkActiveMenu?.title)

  function findItemByUrl(items: any, targetUrl: any) {
    for (const item of items) {
      if (item.url === targetUrl) {
        return item
      }
      if (item.children && item.children.length > 0) {
        const foundInChildren = findItemByUrl(item.children, targetUrl)
        if (foundInChildren) {
          return item
        }
      }
    }
    return null
  }

  return (
    <aside className="w-1/5 13inch:w-[22%] z-[1] fixed">
      <div className="w-[119%] 13inch:w-[115%] flex items-center justify-center bg-[#246BFD] py-4 -skew-x-[12deg] rounded-lg -translate-x-8">
        <Link href="/" className="w-full h-full">
          <span className="relative w-[90px] h-6 13inch:w-[128px] 13inch:h-10 block mx-auto">
            <Image
              alt="logo"
              src="/logo.svg"
              fill
              className="object-cover skew-x-[12deg]"
            />
          </span>
        </Link>
      </div>
      <div className="bg-[#246BFD] w-full flex rounded-r-xl">
        <div className="w-1/5 13inch:w-1/4 items-center pt-6">
          {initSideBar?.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setContentSideBar(miniSidebar.find(i => i.title === item.title))
                setActive(item.title)
              }}
              className={`py-3 w-full flex flex-col justify-center items-center gap-1 transition rounded-l-lg h-[48px] 13inch:h-[68px] ${
                active == item.title
                  ? 'bg-[#63a1fd] text-white'
                  : 'hover:bg-[#4381ff] text-white/70 hover:text-white'
              }`}
            >
              <div
                className={`${
                  active === item.title
                    ? 'scale-110 13inch:scale-125'
                    : 'scale-100'
                } transition`}
              >
                {item.icon}
              </div>
              <span
                className={`${
                  active === item.title ? 'text-[0px]' : 'text-[9.5px]'
                } transition hidden 13inch:block`}
              >
                {item.title}
              </span>
            </button>
          ))}
        </div>
        <div className="w-full h-[calc(100vh-56px)] 13inch:h-[calc(100vh-72px)] bg-[#63a1fd] rounded-ss-xl px-3 pt-4 pb-2 overflow-y-auto">
          <h4 className="py-1 text-center text-base 13inch:text-lg font-bold mb-3 text-white">
            {contentSideBar && contentSideBar.title}
          </h4>
          <div className="space-y-1">
            {contentSideBar?.children &&
              contentSideBar?.children?.map((i: any) => {
                if (i?.children) {
                  return (
                    <Accordion
                      defaultExpandedKeys={[String(activeDropdown?.id)]}
                      key={i.id}
                      variant="splitted"
                      className="px-0"
                      selectionMode="multiple"
                      itemClasses={{
                        base: 'group-[.is-splitted]:px-0 w-full group-[.is-splitted]:bg-transparent group-[.is-splitted]:rounded-none group-[.is-splitted]:shadow-none',
                        title:
                          'font-normal text-xs 13inch:text-sm text-white/80 hover:text-white',
                        trigger:
                          'p-2 data-[hover=true]:bg-[#3787fe65] rounded-lg flex items-center',
                        indicator: 'text-medium text-white',
                        content:
                          'text-small px-2 ml-2 border-l-[1px] border-[#ccc] flex flex-col gap-1 mt-2',
                      }}
                    >
                      <AccordionItem
                        key={i?.id}
                        aria-label={`{ci}`}
                        title={i.title}
                      >
                        {i?.children.map((ci: any) => (
                          <button
                            key={i.id}
                            className={`w-full p-2 13inch:p-2.5 text-left text-xs 13inch:text-sm rounded-lg transition ${
                              pathnameRouter === ci?.url
                                ? 'bg-[#3786fe] scale-[1.02] text-white'
                                : 'hover:bg-[#3787fe65] text-white/80 hover:text-white'
                            }`}
                            onClick={() => router.push(ci?.url)}
                          >
                            {ci?.title}
                          </button>
                        ))}
                      </AccordionItem>
                    </Accordion>
                  )
                } else {
                  return (
                    <>
                      <button
                        key={i.id}
                        className={`w-full p-2.5 text-left text-xs 13inch:text-sm rounded-lg transition ${
                          pathnameRouter === i.url
                            ? 'bg-[#3786fe] scale-[1.02] text-white'
                            : 'hover:bg-[#3787fe65] text-white/80 hover:text-white'
                        }`}
                        onClick={() => router.push(i.url)}
                      >
                        {i.title}
                      </button>
                    </>
                  )
                }
              })}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default SideBar
