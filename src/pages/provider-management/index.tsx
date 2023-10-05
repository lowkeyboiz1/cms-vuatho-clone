import { useDispatch } from 'react-redux'
import { ReactElement, useEffect, useState } from 'react'
import Head from 'next/head'

import { NextPageWithLayout } from '../_app'
import { breadcrumbAction } from '@/store/slices/loggedSlice/breadcrumbSlice'
import { Layout } from '@/components'
import { SearchIcon } from '@/components/icon'
import TableComponent from '@/components/table/table'
import Pagi from '@/components/pagination'
import SummaryForm from '@/components/form/summary'
import SelectButton from '@/components/SelectButton'

import { Add, Filter } from 'iconsax-react'
import { Button, Input } from '@nextui-org/react'

const Page: NextPageWithLayout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      breadcrumbAction.updateBreadcrumb([
        {title: 'Trang chủ', url: '/'}, 
        {title: 'Quản lí user nhà cung cấp'}
      ]),
    )
  }, [])

  const columns = [
    { id: 'provider', name: 'Tên nhà cung cấp', sortable: true },
    { id: 'phoneNumber', name: 'Số điện thoại', sortable: true },
    { id: 'email', name: 'Email', sortable: true },
    { id: 'scale', name: 'Quy mô', sortable: true },
  ]

  const initialData = [
    {
      id: 1,
      provider: 'Alice',
      phoneNumber: '0123456789',
      email: 'tainangtre@gmail.com',
      scale: 'Nhỏ',
    },
    {
      id: 2,
      provider: 'Alice',
      phoneNumber: '0123456789',
      email: 'tainangtre@gmail.com',
      scale: 'Nhỏ',
    },
    {
      id: 3,
      provider: 'Alice',
      phoneNumber: '0123456789',
      email: 'tainangtre@gmail.com',
      scale: 'Lớn',
    },
    {
      id: 4,
      provider: 'Alice',
      phoneNumber: '0123456789',
      email: 'tainangtre@gmail.com',
      scale: 'Lớn',
    },
    {
      id: 5,
      provider: 'Alice',
      phoneNumber: '0123456789',
      email: 'tainangtre@gmail.com',
      scale: 'Nhỏ',
    },
    {
      id: 6,
      provider: 'Alice',
      phoneNumber: '0123456789',
      email: 'tainangtre@gmail.com',
      scale: 'Nhỏ',
    },
    {
      id: 7,
      provider: 'Alice',
      phoneNumber: '0123456789',
      email: 'tainangtre@gmail.com',
      scale: 'Nhỏ',
    },
    {
      id: 8,
      provider: 'Alice',
      phoneNumber: '0123456789',
      email: 'tainangtre@gmail.com',
      scale: 'Nhỏ',
    },
    {
      id: 9,
      provider: 'Alice',
      phoneNumber: '0123456789',
      email: 'tainangtre@gmail.com',
      scale: 'Lớn',
    },
  ]
  const [select, setSelect] = useState<boolean>(false)

  const [listSelected, setListSelected] = useState([])

  //pagination
  const [page, setPage] = useState<number>(1)
  const rowsPerPage = 3

  return (
    <>
      <SummaryForm title="Tổng số lượng nhà cung cấp" quality={50} />
      <div className="flex justify-between mt-8">
        <SelectButton
          listSelected={listSelected}
          select={select}
          setSelect={setSelect}
        />
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
          <Button
            size="md"
            startContent={<Add size="24" color="#fff" />}
            className="rounded-[16px] px-[19px] text-white bg-primary-blue text-sm"
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
          initialData={initialData}
          // rowsPerPage={8}
          multiSelectTable={select ? 'multiple' : 'single'}
          handleSelected={setListSelected}
        />
      </div>
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
        <title>Quản lí user nhà cung cấp</title>
      </Head>
      <>{page}</>
    </Layout>
  )
}

export default Page
