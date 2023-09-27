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
import DefaultModal from '@/components/modal'

import { Button, Input, Tabs, Tab, useDisclosure } from '@nextui-org/react'
import { SearchIcon } from '@/components/icon'
import {
  Add,
  Add as AddIcon,
  CloseCircle,
  Filter,
  Filter as FilterIcon,
  SearchNormal1,
} from 'iconsax-react'
import { ToastComponent } from '@/components/Toast'
const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(breadcrumbAction.updateBreadcrumb(['Trang chủ', 'Quản lí ngành']))
  }, [])
  const columns = [
    { id: 'job', name: 'Ngành', sortable: true },
    { id: 'totalPrice', name: 'Doanh thu', sortable: true },
    { id: 'totalEmployee', name: 'Số lượng thợ', sortable: true },
    { id: 'totalJob', name: 'Tổng nghề', sortable: true },
  ]

  const initialData = [
    {
      id: 1,
      job: 'Công nghệ thông tin',
      totalPrice: '2.500.000.000đ',
      totalEmployee: '12000 người',
      totalJob: '32 nghề',
    },
    {
      id: 2,
      job: 'Công nghệ thông tin',
      totalPrice: '2.500.000.000đ',
      totalEmployee: '12000 người',
      totalJob: '32 nghề',
    },
    {
      id: 3,
      job: 'Công nghệ thông tin',
      totalPrice: '2.500.000.000đ',
      totalEmployee: '12000 người',
      totalJob: '32 nghề',
    },
    {
      id: 4,
      job: 'Công nghệ thông tin',
      totalPrice: '2.500.000.000đ',
      totalEmployee: '12000 người',
      totalJob: '32 nghề',
    },
    {
      id: 5,
      job: 'Công nghệ thông tin',
      totalPrice: '2.500.000.000đ',
      totalEmployee: '12000 người',
      totalJob: '32 nghề',
    },
    {
      id: 6,
      job: 'Công nghệ thông tin',
      totalPrice: '2.500.000.000đ',
      totalEmployee: '12000 người',
      totalJob: '32 nghề',
    },
    {
      id: 7,
      job: 'Công nghệ thông tin',
      totalPrice: '2.500.000.000đ',
      totalEmployee: '12000 người',
      totalJob: '32 nghề',
    },
    {
      id: 8,
      job: 'Công nghệ thông tin',
      totalPrice: '2.500.000.000đ',
      totalEmployee: '12000 người',
      totalJob: '32 nghề',
    },
    {
      id: 9,
      job: 'Công nghệ thông tin',
      totalPrice: '2.500.000.000đ',
      totalEmployee: '12000 người',
      totalJob: '32 nghề',
    },
    {
      id: 10,
      job: 'Công nghệ thông tin',
      totalPrice: '2.500.000.000đ',
      totalEmployee: '12000 người',
      totalJob: '32 nghề',
    },
    {
      id: 11,
      job: 'Công nghệ thông tin',
      totalPrice: '2.500.000.000đ',
      totalEmployee: '12000 người',
      totalJob: '32 nghề',
    },
  ]
  return (
    <>
      <div className="flex justify-between mt-1 mb-2">
        <div className="">
          <Button
            size="md"
            className="rounded-[16px] px-[42px] text-base-drak-gray bg-transparent border-[2px] border-base-gray-2"
          >
            Chọn
          </Button>
        </div>
        <div className="flex gap-4">
          <div className="">
            <Input
              className="bg-transparent border-[1px] border-base-gray-2 rounded-2xl overflow-hidden"
              placeholder="Tìm kiếm"
              size="md"
              startContent={
                <SearchIcon className={'text-base-drak-gray text-xl'} />
              }
              type="text"
            />
          </div>
          <Button
            size="md"
            startContent={<Filter size="24" />}
            className="rounded-[16px] px-[19px] text-base-drak-gray bg-transparent text-sm border-[2px] border-base-gray-2"
          >
            Bộ lọc
          </Button>
          <CreateNewJob />
        </div>
      </div>
      <TableComponent
        columns={columns}
        initialData={initialData}
        rowsPerPage={10}
        onRowAction={id => router.push(`job-management/${id}`)}
        // multiSelectTable="multiple"
      />
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Head>
        <title>Quản lí ngành</title>
      </Head>
      <>{page}</>
    </Layout>
  )
}

export default Page

const CreateNewJob = () => {
  const listJobs = [
    { id: 1, title: 'Dog Trainer' },
    { id: 2, title: 'Medical Assistant' },
    { id: 3, title: 'President of Sales' },
    { id: 4, title: 'Nursing Assistant' },
    { id: 5, title: 'Marketing Coordinator' },
    { id: 6, title: 'President of Sales' },
    { id: 7, title: 'Web Designer' },
    { id: 8, title: 'Web Designer' },
    { id: 9, title: 'Web Designer' },
  ]
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure()

  const [job, setJob] = useState('')

  const handleAdd = () => {
    if (!!job.length) {
      onClose()
      ToastComponent({ message: 'Thêm mới Ngành thành công', type: 'success' })
    } else {
      ToastComponent({
        message: 'Vui lòng nhập thông tin Ngành',
        type: 'error',
      })
    }
  }
  return (
    <>
      <Button
        onPress={onOpen}
        startContent={<Add size="24" color="#fff" />}
        size="md"
        className="rounded-[16px] px-[18px] text-white bg-primary-blue text-sm"
      >
        Tạo mới
      </Button>
      <DefaultModal
        modalTitle="Tạo mới ngành"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        styleModalTitle={'text-base-black-1'}
        onConfirm={handleAdd}
        propsModal={{
          size: '5xl',
        }}
        modalBody={
          <div className="min-h-[50vh] flex flex-col gap-2">
            <div className="text-base-black-1">
              <div className="text-sm 13inch:text-base font-semibold mb-2">
                Nhập tên ngành
              </div>
              <Input
                variant="bordered"
                size="md"
                style={{ fontSize: '14px' }}
                placeholder="Công nghệ thông tin"
                value={job}
                onChange={(e: any) => setJob(e.target.value)}
              />
            </div>
            <div className="text-base-black-1">
              <div className="text-sm 13inch:text-base font-semibold mb-2">
                Nghề
              </div>
              <div className="w-full flex flex-col gap-4">
                <Input
                  variant="bordered"
                  size="md"
                  style={{ fontSize: '14px' }}
                  placeholder="Tìm kiếm"
                  startContent={<SearchNormal1 size="24" color="#282828" />}
                />
                <div className="flex">
                  <div className="text-base-black-1 text-xs 13inch:text-sm flex flex-shrink-0 px-4">
                    Đã chọn(18):
                  </div>
                  <div className="w-full flex gap-4 flex-wrap">
                    {listJobs.map(job => (
                      <div className="flex gap-1 items-center" key={job.id}>
                        <p className="text-primary-blue text-xs 13inch:text-sm font-semibold translate-y-[-4px]">
                          {job.title}
                        </p>
                        <span className="">
                          <CloseCircle
                            variant="Bulk"
                            color="#5A9DFF"
                            size={24}
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </>
  )
}
