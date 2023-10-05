import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import { MenuSidebar } from '@/constants'
import { Accordion, AccordionItem } from '@nextui-org/react'

const SideBar = () => {
  const router = useRouter()
  const pathnameRouter = router.pathname;

  const [menuActive, setMenuActive] = useState<string>(String(MenuSidebar.find((e: any) => e.children.some((ce: any) => pathnameRouter.includes(ce.url) || (ce?.children?.some((cce: any) => pathnameRouter.includes(cce.url)))))?.title))
  const [menuContent, setMenuContent] = useState<any>(MenuSidebar.find(e => e.title === menuActive))

  const _HandleSelectMenu = (title: string) => {
    setMenuActive(title)
    setMenuContent(MenuSidebar.find(e => e.title === title))
  }

  return (
    <aside className="w-1/5 z-[2] fixed bg-primary-blue h-screen overflow-hidden">
      <div className="w-full flex justify-start py-4 pl-6">
        <Link href="/" className="">
            <Image alt="logo" src="/logo.svg" width={90} height={32} className="object-cover skew-x-[12deg]" />
        </Link>
      </div>
      <div className="w-full flex rounded-r-xl min-h-screen">
        <div className="2xl:min-w-[18%] min-w-[22%] items-center">
          {MenuSidebar?.map((item: any) => (
            <button
              key={item.title}
              onClick={_HandleSelectMenu.bind(this, item.title)}
              className={`py-3 w-full aspect-square h-fit flex flex-col justify-center items-center gap-1 transition text-white ${menuActive == item.title ? 'bg-white/10' : ''}`}
            >
              <div className='2xl:scale-100 scale-[0.85]'>
                {React.cloneElement(item.icon, {
                  variant: menuActive == item.title && 'Bold',
                  size: 25
                })}
              </div>
              <span className='2xl:text-[9px] text-[8.5px]'>{item.title}</span>
            </button>
          ))}
        </div>
        <div className="w-full bg-black/10 pb-2 overflow-y-auto">
          <h4 className="p-4 text-base text-center font-bold text-white">
            {menuActive !== 'undefined' ? menuActive : ''}
          </h4>
          {menuContent?.children &&
            <div className='flex flex-col'>
              {menuContent.children.map((e: any) => 
                <>
                  {e.children?.length > 0 ?
                    <Accordion
                      defaultExpandedKeys={[String(menuContent.children.find((e: any) => e.children.some((ce: any) => pathnameRouter.includes(ce.url)))?.title)]}
                      key={e.title}
                      variant="splitted"
                      selectionMode="multiple"
                      itemClasses={{
                        base: 'group-[.is-splitted]:px-0 group-[.is-splitted]:bg-transparent -mx-2 group-[.is-splitted]:rounded-none group-[.is-splitted]:shadow-none',
                        title: 'font-normal text-sm text-white font-[600]',
                        trigger: 'p-4 data-[hover=true]:bg-white/5 flex items-center',
                        indicator: 'text-medium text-white',
                        content: 'py-0',
                      }}
                    >
                      <AccordionItem
                        aria-label={e.title}
                        title={e.title}
                        key={e.title}
                      >
                        <div className='flex flex-col'>
                          {e?.children.map((ce: any) => (
                            <Link
                              href={ce?.url}
                              key={ce.title}
                              className={`w-full p-4 text-left 2xl:text-sm text-[13px] transition border-r-4 ${
                                pathnameRouter.includes(ce.url)
                                  ? 'bg-[#FF8F34]/10 text-[#FF8F34] border-[#FF8F34] font-[600]'
                                  : 'hover:bg-[#FF8F34]/5 hover:border-[#FF8F34]/40 text-white border-transparent'
                              }`}
                            >
                              {ce?.title}
                            </Link>
                          ))}
                        </div>
                      </AccordionItem>
                    </Accordion>
                    :
                    <Link
                      key={e.title}
                      className={`w-full p-4 text-left 2xl:text-sm text-[13px] transition border-r-4 ${
                        pathnameRouter.includes(e.url)
                          ? 'bg-[#FF8F34]/10 text-[#FF8F34] border-[#FF8F34] font-[600]'
                          : 'hover:bg-[#FF8F34]/5 hover:border-[#FF8F34]/40 text-white border-transparent'
                      }`}
                      href={e.url}
                    >
                      {e.title}
                    </Link>
                  }
                </>
              )}
            </div>
          }
        </div>
      </div>
    </aside>
  )
}

export default SideBar
