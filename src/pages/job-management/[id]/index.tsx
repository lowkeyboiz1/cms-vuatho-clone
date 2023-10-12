import React, { useEffect, ReactElement, useState } from 'react'
import { useDispatch } from 'react-redux'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { NextPageWithLayout } from '@/pages/_app'
import { breadcrumbAction } from '@/store/slices/loggedSlice/breadcrumbSlice'
import { Layout } from '@/components'
import TableComponent from '@/components/table/table'
import { SearchIcon } from '@/components/icon'
import DefaultModal from '@/components/modal'
import Pagi from '@/components/pagination'
import { ToastComponent } from '@/components/Toast'

import { Add, Add as AddIcon, Filter } from 'iconsax-react'
import { Button, Input, useDisclosure } from '@nextui-org/react'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const params = router.query
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      breadcrumbAction.updateBreadcrumb([
        {title: 'Trang chủ', url: '/'}, 
        {title: 'Quản lí ngành', url: '/job-management'},
        {title: 'Quản lí nghề'}
      ]),
    )
  }, [])

  const columns = [
    { id: 'STT', name: 'STT', sortable: true },
    { id: 'nameJob', name: 'Tên nghề', sortable: true },
    { id: 'action', name: 'Hành động', sortable: true },
    { id: 'User', name: 'User', sortable: true },
  ]

  const initialData = [
    {
      id: 1,
      STT: '1',
      nameJob: 'Lập trình viên',
      action: 'Tạo mới',
      time: '11:20 20/10/2023',
      User: 'Tươi',
    },
    {
      id: 2,
      STT: '2',
      nameJob: 'Lập trình viên',
      action: 'Tạo mới',
      time: '11:20 20/10/2023',
      User: 'Tươi',
    },
    {
      id: 3,
      STT: '3',
      nameJob: 'Lập trình viên',
      action: 'Tạo mới',
      time: '11:20 20/10/2023',
      User: 'Tươi',
    },
  ]

  const renderCell = (
    dataItem: (typeof initialData)[number],
    columnKey: React.Key,
  ) => {
    const cellValue = dataItem[columnKey as keyof typeof dataItem]

    switch (columnKey) {
      case 'action':
        return (
          <div className="flex flex-col">
            <strong>{cellValue}</strong>
            <span>{dataItem.time}</span>
          </div>
        )
      default:
        return <span className="absolute -top-2 max-h-fit">{cellValue}</span>
    }
  }

  //pagination
  const [page, setPage] = useState<number>(1)
  const rowsPerPage = 3

  return (
    <>
      <div className="font-bold text-[32px] mt-3">Tên ngành</div>
      <div className="flex justify-between my-4">
        <div className="">
          <Button
            size="lg"
            className="rounded-[16px] px-[42px] text-base-drak-gray bg-transparent border-[2px] border-base-gray-2"
          >
            Chọn
          </Button>
        </div>
        <div className="flex gap-4">
          <div className="">
            <Input
              className="bg-transparent border-[1px] border-base-gray-2 rounded-2xl"
              placeholder="Tìm kiếm"
              size="lg"
              startContent={
                <SearchIcon className={'text-base-drak-gray text-xl'} />
              }
              type="text"
            />
          </div>
          <Button
            size="lg"
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
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        initialData={initialData}
        renderCell={renderCell}
        // multiSelectTable="multiple"
      />
      <div className='absolute bottom-5 w-full'>
        <Pagi totalItem={8} page={page} onChange={page => setPage(page)} totalPage={Math.ceil(initialData.length / rowsPerPage)} />
      </div>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Head>
        <title>Quản lí nghề</title>
      </Head>
      <>{page}</>
    </Layout>
  )
}

export default Page

const CreateNewJob = () => {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure()

  const [job, setJob] = useState('')

  const handleComfirm = () => {
    if (!!job.length) {
      onClose()
      ToastComponent({ message: 'Thêm mới Nghề thành công', type: 'success' })
    } else {
      ToastComponent({
        message: 'Vui lòng nhập thông tin Nghề',
        type: 'error',
      })
    }
  }

  return (
    <>
      <Button
        onPress={onOpen}
        startContent={<Add size="24" color="#fff" />}
        size="lg"
        className="rounded-[16px] px-[18px] text-white bg-primary-blue text-sm"
      >
        Tạo mới
      </Button>
      <DefaultModal
        modalTitle="Tạo mới Nghề"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        styleModalTitle={'text-base-black-1'}
        onConfirm={handleComfirm}
        propsModal={{
          size: '5xl',
        }}
        modalBody={
          <div className="min-h-[50vh]">
            <div className="text-base-black-1 mt-6">
              <div className="text-base font-semibold mb-2">Nhập tên</div>
              <Input
                variant="bordered"
                size="lg"
                style={{ fontSize: '14px' }}
                placeholder="Lập trình viên"
                value={job}
                onChange={(e: any) => setJob(e.target.value)}
              />
            </div>
          </div>
        }
      />
    </>
  )
}
