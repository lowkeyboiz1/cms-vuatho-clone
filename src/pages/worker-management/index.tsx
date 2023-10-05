import { ReactElement, useEffect, useCallback, useMemo, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { Layout } from '@/components'
import { NextPageWithLayout } from '../_app'
import { breadcrumbAction } from '@/store/slices/loggedSlice/breadcrumbSlice'
import { SearchIcon, UserIcon } from '@/components/icon'
import TableComponent from '@/components/table/table'
import SearchInput from '@/components/input/search'
import ModalComponent from '@/components/modal/index'
import { ToastComponent } from '@/components/Toast'
import SelectButton from '@/components/SelectButton'
import Pagi from '@/components/pagination'

import { Button, Input, useDisclosure } from '@nextui-org/react'
import { Filter, Filter as FilterIcon, Man, Woman } from 'iconsax-react'

const Page: NextPageWithLayout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      breadcrumbAction.updateBreadcrumb([
        { title: 'Trang chủ', url: '/' },
        { title: 'Quản lý User thợ' },
      ]),
    )
  }, [])

  const router = useRouter()

  const columns = [
    { id: 'name', name: 'Họ tên', sortable: true },
    { id: 'gender', name: 'Giới tính', sortable: true },
    { id: 'dob', name: 'Ngày sinh' },
    { id: 'totalIcome', name: 'Tổng thu nhập', sortable: true },
    { id: 'job', name: 'Ngành nghề', sortable: true },
    { id: 'phone', name: 'Số điện thoại' },
  ]

  const initialData = [
    {
      id: 'worker-1',
      name: 'Alice',
      gender: 'Nam',
      dob: '12/23/2000',
      totalIcome: 123123,
      job: 'Thợ điện',
      phone: '012313213',
    },
    {
      id: 'worker-2',
      name: 'slice',
      gender: 'Nữ',
      dob: '12/23/2000',
      totalIcome: 345345,
      job: 'Thợ điện',
      phone: '012313213',
    },
    {
      id: 'worker-3',
      name: 'vlice',
      gender: 'Nam',
      dob: '12/23/2000',
      totalIcome: 123123,
      job: 'Thợ điện',
      phone: '012313213',
    },
    {
      id: 'worker-4',
      name: 'rlice',
      gender: 'Nữ',
      dob: '12/23/2000',
      totalIcome: 345345,
      job: 'Thợ điện',
      phone: '012313213',
    },
    {
      id: 'worker-5',
      name: 'wlice',
      gender: 'Nam',
      dob: '12/23/2000',
      totalIcome: 123123,
      job: 'Thợ điện',
      phone: '012313213',
    },
  ]

  const renderCell = (
    dataItem: (typeof initialData)[number],
    columnKey: React.Key,
  ) => {
    const cellValue = dataItem[columnKey as keyof typeof dataItem]

    switch (columnKey) {
      case 'totalIcome':
        return <p>{cellValue.toLocaleString()}đ</p>
      default:
        return cellValue
    }
  }

  const [filterValue, setFilterValue] = useState('')

  const onClear = useCallback(() => {
    setFilterValue('')
  }, [])

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value)
    } else {
      setFilterValue('')
    }
  }, [])

  const hasSearchFilter = Boolean(filterValue)

  const filteredItems = useMemo(() => {
    let filteredUsers = [...initialData]

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter(
        user => user?.name.toLowerCase().includes(filterValue.toLowerCase()),
      )
    }
    return filteredUsers
  }, [filterValue])
  const [select, setSelect] = useState<boolean>(false)

  const [listSelected, setListSelected] = useState([])

  //pagination
  const [page, setPage] = useState<number>(1)
  const rowsPerPage = 3

  return (
    <>
      <div className="flex mb-4 gap-6">
        <div className="w-[300px] h-[100px] 13inch:w-[400px] 13inch:h-[110px] rounded-[16px] p-6 bg-primary-blue flex flex-col justify-center">
          <div className="flex items-center gap-4">
            <div className="h-[40px] 13inch:h-[56px] w-[40px] 13inch:w-[56px] rounded-full bg-[#92BEFF] flex items-center justify-center">
              <UserIcon />
            </div>
            <div className="flex flex-col text-white">
              <div className="text-xs 13inch:text-sm">Tổng số lượng thợ</div>
              <div className="text-xl 13inch:text-2xl font-bold">500.000</div>
            </div>
          </div>
        </div>
        <div className="w-[300px] h-[100px] 13inch:w-[400px] 13inch:h-[110px] rounded-[16px] p-4 bg-white flex flex-col justify-center">
          <div className="flex flex-col ">
            <div className="text-xs 13inch:text-sm font-semibold">
              Thợ đã EKYC
            </div>
            <div className="text-xl 13inch:text-2xl font-bold text-primary-blue">
              500.000
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <SelectButton
          listSelected={listSelected}
          select={select}
          setSelect={setSelect}
        />
        <div className="flex gap-4">
          <div className="">
            <SearchInput
              value={filterValue}
              onChange={onSearchChange}
              onClear={onClear}
            />
          </div>
          <FilterModal />
        </div>
      </div>
      <div className="mt-8">
        <TableComponent
          columns={columns}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          initialData={filteredItems}
          renderCell={renderCell}
          onRowAction={id => router.push(`worker-management/${id}`)}
          multiSelectTable={select ? 'multiple' : 'single'}
          handleSelected={setListSelected}
        />
      </div>
      <div className='absolute bottom-5 w-full'>
        <Pagi totalItem={8} page={page} onChange={page => setPage(page)} totalPage={Math.ceil(filteredItems.length / rowsPerPage)} />
      </div>
    </>
  )
}
Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Head>
        <title>Quản lý User thợ</title>
      </Head>
      <>{page}</>
    </Layout>
  )
}

const FilterModal = () => {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure()

  const optionsGender = ['Nam', 'Nữ']

  const [selectedGender, sSelectedGender] = useState<string>('')

  const ModalBody = (
    <div className="space-y-6 min-h-[400px]">
      <div className="space-y-2 mt-2">
        <span className="text-sm 13inch:text-base font-semibold">
          Ngành nghề
        </span>
        <SearchInput styleInput="w-full" />
      </div>
      <div className="space-y-2">
        <span className="text-sm 13inch:text-base font-semibold">
          Giới tính
        </span>
        <div className="flex space-x-5">
          {optionsGender.map(e => (
            <div key={e}>
              <input
                type="radio"
                id={e}
                value={e}
                name="gender"
                checked={selectedGender.includes(e)}
                onChange={() => sSelectedGender(e)}
                hidden
              />
              <label
                htmlFor={e}
                className={`${
                  selectedGender.includes(e)
                    ? 'bg-primary-blue/70 text-white'
                    : 'bg-base-gray'
                } transition ease-in-out px-3 py-2 rounded-full flex flex-col justify-center items-center cursor-pointer`}
                // style={{ borderColor: `${selectedGender.includes(e) ? '#246BFD' : 'transparent'}` }}
              >
                <div className="flex gap-2 items-center justify-center">
                  <span>
                    {e === 'Nam' ? <Man size="20" /> : <Woman size="20" />}
                  </span>
                  <span className="text-xs 13inch:text-sm">{e}</span>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const handleConfirm = () => {
    if (selectedGender.length === 0) {
      ToastComponent({
        message: 'Vui lòng nhập đầy đủ thông tin',
        type: 'error',
      })
    } else {
      onClose()
    }
  }
  return (
    <>
      <Button
        onPress={onOpen}
        size="md"
        startContent={<Filter size="24" />}
        className="rounded-[16px] px-[19px] text-base-drak-gray bg-transparent border-[2px] border-base-gray-2"
      >
        Bộ lọc
      </Button>
      <ModalComponent
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onConfirm={handleConfirm}
        modalTitle={
          <div className="flex items-center gap-2">
            <FilterIcon size="24" />
            <span>Bộ lọc</span>
          </div>
        }
        btnAnotherContent="Bỏ chọn"
        propsModal={{
          size: '3xl',
        }}
        modalBody={ModalBody}
      />
    </>
  )
}

export default Page
