import Styles from './EKYC.module.css'

import { Tab, Tabs } from '@nextui-org/react'

const EKYCTab: React.FC = () => {
  const listTab = [
    {
      id: 'papers',
      label: 'Giấy tờ',
      content: <PaperTab />,
    },
    {
      id: 'experience',
      label: 'Kinh nghiệm',
      content: <ExperienceTab />,
    },
  ]

  return (
    <div className="bg-white rounded-2xl">
      <Tabs
        aria-label="EKYC's Worker User Information Tab"
        items={listTab}
        variant="light"
        color="primary"
        classNames={{
          tab: 'bg-base-gray px-4 h-10',
          cursor: 'bg-primary-blue w-full',
          tabList: 'gap-6',
          tabContent: Styles.tabContent,
        }}
      >
        {item => (
          <Tab key={item.id} title={item.label}>
            <div className="pt-3 min-h-[300px]">{item.content}</div>
          </Tab>
        )}
      </Tabs>
    </div>
  )
}

const PaperTab: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className={Styles.displayFlexPaperTab}>
        <div className={Styles.widthFormPaperTab}>
          <h6 className="font-semibold text-sm 13inch:text-base mb-2">
            Căn cước công dân mặt trước
          </h6>
          <div className="text-sm flex justify-between bg-base-gray px-4 h-[40px] items-center rounded-lg">
            <span className="text-xs 13inch:text-base font-normal w-full max-w-[10px] truncate overflow-hidden">
              cccdmattruoc.docx
            </span>
            <button className="text-primary-blue font-semibold text-xs 13inch:text-base">
              Xem
            </button>
          </div>
        </div>
        <div className={Styles.widthFormPaperTab}>
          <h6 className="font-semibold text-xs 13inch:text-base mb-2">
            Căn cước công dân mặt sau
          </h6>
          <div className="text-sm flex justify-between bg-base-gray px-4 h-[40px] items-center rounded-lg">
            <span className="text-xs 13inch:text-base font-normal w-full max-w-[10px] truncate overflow-hidden">
              cccdmatsau.docx
            </span>
            <button className="text-primary-blue font-semibold text-xs 13inch:text-base">
              Xem
            </button>
          </div>
        </div>
      </div>
      <div className={Styles.widthFormPaperTab}>
        <h6 className="font-semibold text-xs 13inch:text-base mb-2">
          Giấy xác nhận hạnh kiểm
        </h6>
        <div className="text-sm flex justify-between bg-base-gray px-4 h-[40px] items-center rounded-lg">
          <span className="font-normal w-full max-w-[10px] truncate overflow-hidden text-xs 13inch:text-base">
            xacnhanhanhkiem.docx
          </span>
          <button className="text-primary-blue font-semibold text-xs 13inch:text-base">
            Xem
          </button>
        </div>
      </div>
      <div className={Styles.widthFormPaperTab}>
        <h6 className="font-semibold text-xs 13inch:text-base mb-2">
          Giấy xác nhận nhân thân
        </h6>
        <div className="text-sm flex justify-between bg-base-gray px-4 h-[40px] items-center rounded-lg text-xs 13inch:text-base">
          <span className="font-normal w-full max-w-[10px] truncate overflow-hidden ">
            xacnhannhanthan.docx
          </span>
          <button className="text-primary-blue font-semibold">Xem</button>
        </div>
      </div>
    </div>
  )
}

const ExperienceTab: React.FC = () => {
  const listExp = [
    {
      id: 'exp-1',
      job: 'Tài xế công',
      company: 'Grab',
      timeline: '01/01/2020 - 01/01/2023',
    },
    {
      id: 'exp-2',
      job: 'Tài xế công nghệ',
      company: 'Tesla',
      timeline: '01/01/2020 - 01/01/2023',
    },
  ]
  return (
    <div className="flex flex-col gap-6">
      {listExp.map(e => (
        <div
          key={e.id}
          className="text-base-gray rounded-2xl border-[1px] border-base-gray-2 p-6 flex gap-6"
        >
          <div className="flex flex-col gap-2 ">
            <h6 className=" text-xs 13inch:text-base font-semibold">
              Công việc
            </h6>
            <span className="font-normal text-xs 13inch:text-base py-3 px-4 flex items-center bg-base-gray rounded-lg">
              {e.job}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <h6 className="font-semibold text-xs 13inch:text-base">Công ty</h6>
            <span className="font-normal text-xs 13inch:text-sm py-3 px-4 flex items-center bg-base-gray rounded-lg">
              {e.company}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <h6 className="font-semibold text-xs 13inch:text-base">
              Thời gian làm việc
            </h6>
            <span className="font-normal text-xs 13inch:text-sm py-3 px-4 flex items-center bg-base-gray rounded-lg">
              {e.timeline}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <h6 className="font-semibold text-xs 13inch:text-base">
              Bằng cấp liên quan
            </h6>
            <div className="flex gap-4">
              <div className="text-xs 13inch:text-sm text-base-black-1 flex gap-4 13inch:gap-2 bg-base-gray px-4 h-[40px] items-center rounded-lg">
                <span className="font-normal w-full">bangcap.docx</span>
                <button className="text-primary-blue font-semibold">Xem</button>
              </div>
              <div className="text-xs 13inch:text-sm text-base-black-1 flex gap-4 13inch:gap-2 bg-base-gray px-4 h-[40px] items-center rounded-lg">
                <span className="font-normal w-full">bangcap.pdf</span>
                <button className="text-primary-blue font-semibold">Xem</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default EKYCTab
