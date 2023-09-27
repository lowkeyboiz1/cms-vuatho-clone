import { Tabs, Tab } from '@nextui-org/react'

import styles from './TabsApp.module.css'

export interface TabsAppType {
  id: string
  label: string
  content: any
}

function TabsApp({
  tabs,
  baseCss = '',
  tabCss = '',
  positionLineCss,
  cursorCss = '',
  tabListCss = '',
}: {
  tabs: any
  baseCss?: any
  tabCss?: any
  positionLineCss?: any
  cursorCss?: any
  tabListCss?: any
}) {
  return (
    <>
      <div className="relative">
        <div
          className={`absolute line border-b-[1px] border-base-gray-2 ${
            positionLineCss ? positionLineCss : 'top-[36px] left-[30px] right-6'
          }`}
        ></div>
        <Tabs
          aria-label="Dynamic tabs"
          items={tabs}
          variant="underlined"
          color="primary"
          classNames={{
            tabList: tabListCss ? tabListCss : styles.tabList,
            tab: tabCss ? tabCss : styles.tab,
            tabContent:
              'group-data-[selected=true]:text-[#246BFD] group-data-[selected=true]:font-semibold text-base text-[#969696]',
            cursor: cursorCss ? cursorCss : styles.cursor,
            panel: 'px-0',
            base: baseCss,
          }}
        >
          {(item: TabsAppType) => (
            <Tab key={item.id} title={item.label}>
              <div className="">{item.content}</div>
            </Tab>
          )}
        </Tabs>
      </div>
    </>
  )
}

export default TabsApp
