import React from 'react'

const JobTab = () => {
  const dataJob = [
    {
      title: 'Sữa chữa điện nước',
      area: 'Quận 2, TPHCM',
      time: '21/02/2023'
    },{
      title: 'Sữa chữa cống nước',
      area: 'Quận 9, TPHCM',
      time: '29/02/2023'
    },{
      title: 'Sữa chữa máy lạnh',
      area: 'Quận 2, TPHCM',
      time: '31/05/2023'
    },
  ]
  return (
    <div className="space-y-6">
      {dataJob.map((e, i) => 
        <div key={e.title} className='space-y-2'>
          <div className="flex items-center justify-between">
            <h5 className="font-bold text-xl">{e.title}</h5>
            <div className="flex gap-2 items-center">
              <span className="">Mã ngành nghề</span>
              <span className="font-semibold text-base h-[40px] bg-base-gray px-4 rounded-lg flex items-center justify-center">{i + 1}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className=" font-semibold">Khu vực hoạt động</label>
              <p className="font-normal rounded-lg bg-base-gray px-4 py-2">{e.area}</p>
            </div>
            <div className="space-y-2">
              <label className=" font-semibold">Thời gian bắt đầu</label>
              <p className="font-normal rounded-lg bg-base-gray px-4 py-2">{e.time}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default JobTab
