import { ReactElement, useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { NextPageWithLayout } from '../_app'
import { breadcrumbAction } from '@/store/slices/loggedSlice/breadcrumbSlice'
import { Layout } from '@/components'
import { DepartmentIcon } from '@/components/icon'
import TableComponent from '@/components/table/table'
import SummaryForm from '@/components/form/summary'

import { Button, Input, Tabs, Tab } from '@nextui-org/react'
import { SearchIcon } from '@/components/icon'
import { Add, Filter } from 'iconsax-react'

const Page: NextPageWithLayout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      breadcrumbAction.updateBreadcrumb([
        {title: 'Trang chủ', url: '/'}, 
        {title: 'Quản lí nhân viên Vua Thợ'}
      ]),
    )
  }, [])

  const tabs = [
    {
      id: 'employee',
      label: 'NHÂN VIÊN VUA THỢ',
      content: <EmployeeTab />,
    },
    {
      id: 'Department',
      label: 'PHÒNG BAN',
      content: <DepartmentTab />,
    },
  ]

  return (
    <Tabs
      aria-label="Tab about employees and departments"
      items={tabs}
      variant="underlined"
      color="primary"
      classNames={{
        base: 'pb-2 rounded-b-2xl w-full',
        tabList:
          'gap-6 w-full relative rounded-none p-0 border-b border-divider',
        cursor: 'w-full bg-[#246BFD]',
        tab: 'max-w-fit px-2 h-12',
        tabContent:
          'group-data-[selected=true]:text-[#246BFD] font-[600] text-base',
      }}
    >
      {item => (
        <Tab key={item.id} title={item.label}>
          <div>{item.content}</div>
        </Tab>
      )}
    </Tabs>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Head>
        <title>Quản lí nhân viên Vua Thợ</title>
      </Head>
      <>{page}</>
    </Layout>
  )
}

const DepartmentTab: React.FC = () => {
  const dataDepartment = [
    {
      title: 'Ban quản lý',
      desc: 'Nơi ban hành những quyết định chiến lược, dài hạn và ngắn hạn ảnh hưởng đến hoạt động của công ty',
    },
    {
      title: 'Phòng kế toán',
      desc: 'Thực hiện công việc về nghiệp vụ chuyên môn tài chính kế toán, bao gồm quản lý hạch toán, lập báo cáo tài chính, và xử lý các vấn đề liên quan đến tài chính của công ty',
    },
    {
      title: 'Phòng nhân sự',
      desc: 'Đảm nhiệm vai trò về tất cả vấn đề liên quan đến nhân sự của công ty, bao gồm tuyển dụng, đào tạo, quản lý hiệu suất, và chăm sóc nhân viên',
    },
    {
      title: 'Phòng marketing',
      desc: 'Chịu trách nhiệm xây dựng và triển khai chiến lược marketing, quảng cáo, và quản lý thương hiệu của công ty để thu hút và giữ chân khách hàng',
    },
    {
      title: 'Phòng kỹ thuật',
      desc: 'Đảm nhiệm công việc liên quan đến nghiên cứu, phát triển, và thiết kế sản phẩm hoặc dịch vụ của công ty',
    },
    {
      title: 'Phòng bán hàng',
      desc: 'Chịu trách nhiệm tiếp cận khách hàng, xây dựng mối quan hệ và thực hiện các hoạt động bán hàng để đạt được doanh số bán hàng',
    },
    {
      title: 'Phòng hành chính',
      desc: 'Quản lý các hoạt động hành chính của công ty, bao gồm quản lý văn phòng, hỗ trợ hành chính cho các phòng ban khác, và xử lý các vấn đề liên quan đến văn bản, tài liệu, và hợp đồng',
    },
  ]
  return (
    <div className="pb-5">
      <h5 style={{ marginBottom: 24 }} className="text-3xl font-bold">
        Tổng quan phòng ban
      </h5>
      <div className="grid grid-cols-4 gap-5">
        <div
          className={`p-6 bg-white rounded-2xl flex flex-col gap-6 min-h-[280px] shadow-[4px_4px_16px_0_rgba(0,18,38,0.08)]`}
        >
          <div className="space-y-2">
            <h6 className="text-base">Tổng số lượng</h6>
            <h6 className="text-xl font-bold">7 Phòng ban</h6>
          </div>
          <div className="flex flex-col justify-center items-center h-full">
            <DepartmentIcon />
          </div>
        </div>
        {dataDepartment.map(item => (
          <div
            key={item.title}
            className="bg-white rounded-2xl p-6 space-y-6 min-h-[280px] shadow-[4px_4px_16px_0_rgba(0,18,38,0.08)]"
          >
            <h6 className="text-xl font-bold">{item.title}</h6>
            <p className="text-base">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const EmployeeTab: React.FC = () => {
  const router = useRouter()

  const columns = [
    { id: 'fullName', name: 'Họ tên', sortable: true },
    { id: 'dob', name: 'Ngày sinh' },
    { id: 'email', name: 'Email' },
    { id: 'location', name: 'Vị trí', sortable: true },
    { id: 'deparment', name: 'Phòng ban', sortable: true },
  ]

  const initialData = [
    {
      id: 1,
      fullName: 'Alice',
      dob: '28/01/1999',
      email: 'tainangtre@gmail.com',
      location: 'TP HCM',
      deparment: 'Thợ sửa máy lạnh',
    },
    {
      id: 2,
      fullName: 'flice',
      dob: '22/02/1999',
      email: 'tainangtre@gmail.com',
      location: 'TP HCM',
      deparment: 'Thợ sửa máy lạnh',
    },
    {
      id: 3,
      fullName: 'elice',
      dob: '23/04/1999',
      email: 'tainangtre@gmail.com',
      location: 'TP HCM',
      deparment: 'Thợ sửa máy lạnh',
    },
    {
      id: 4,
      fullName: 'qlice',
      dob: '27/06/1999',
      email: 'tainangtre@gmail.com',
      location: 'TP HCM',
      deparment: 'Thợ sửa máy lạnh',
    },
    {
      id: 5,
      fullName: 'ylice',
      dob: '26/02/1999',
      email: 'tainangtre@gmail.com',
      location: 'TP HCM',
      deparment: 'Thợ sửa máy lạnh',
    },
    {
      id: 6,
      fullName: 'hlice',
      dob: '25/07/1999',
      email: 'tainangtre@gmail.com',
      location: 'TP HCM',
      deparment: 'Thợ sửa máy lạnh',
    },
    {
      id: 7,
      fullName: 'mlice',
      dob: '21/08/1999',
      email: 'tainangtre@gmail.com',
      location: 'TP HCM',
      deparment: 'Thợ sửa máy lạnh',
    },
    {
      id: 8,
      fullName: 'tlice',
      dob: '22/04/1999',
      email: 'tainangtre@gmail.com',
      location: 'TP HCM',
      deparment: 'Thợ sửa máy lạnh',
    },
  ]

  //pagination
  const [page, setPage] = useState<number>(1)
  const rowsPerPage = 3

  return (
    <div className="">
      <SummaryForm title="Tổng số lượng nhân viên" quality={1000} />
      <div className="flex justify-between mt-4">
        <div className="">
          <Button
            size="lg"
            className="rounded-[16px] px-[42px] text-base-drak-gray bg-transparent border-[2px] border-base-gray-2"
          >
            Chọn
          </Button>
        </div>
        <div className="flex gap-4">
          <Input
            className="bg-transparent border-[1px] border-base-gray-2 rounded-2xl"
            placeholder="Tìm kiếm"
            size="lg"
            startContent={
              <SearchIcon className={'text-base-drak-gray text-xl'} />
            }
            type="text"
          />
          <Button
            size="lg"
            startContent={<Filter size="20" />}
            className="rounded-[16px] px-[19px] text-base-drak-gray bg-transparent text-sm border-[2px] border-base-gray-2 flex flex-shrink-0"
          >
            Bộ lọc
          </Button>
          <Button
            size="lg"
            className="rounded-[16px] px-[19px] text-white bg-primary-blue text-sm font-semibold flex flex-shrink-0"
            startContent={<Add size={20} />}
          >
            Tạo mới
          </Button>
        </div>
      </div>
      <div className="mt-8">
        <TableComponent
          columns={columns}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          multiSelectTable="multiple"
          initialData={initialData}
          onRowAction={id => router.push(`employee-management/${id}`)}
        />
      </div>
    </div>
  )
}

export default Page