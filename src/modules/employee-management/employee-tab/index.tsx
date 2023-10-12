import TotalEmployee from '@/components/form/summary'
import styles from './style.module.css'
import { Button, Input } from '@nextui-org/react'
import { SearchIcon } from '@/components/icon'
import { Add, Filter } from 'iconsax-react'
import TableComponent from '@/components/table/table'
import Pagi from '@/components/pagination'
import { useState } from 'react'

function Customer() {
  const columns = [
    { id: 'fullName', name: 'Họ tên', sortable: true },
    { id: 'birthDay', name: 'Ngày sinh', sortable: true },
    { id: 'email', name: 'Email', sortable: true },
    { id: 'location', name: 'Vị trí', sortable: true },
    { id: 'deparment', name: 'Phòng ban', sortable: true },
  ]

  const initialData = [
    {
      id: 1,
      fullName: 'Alice',
      birthDay: 25,
      email: 'tainangtre@gmail.com',
      location: 'TP HCM',
      deparment: 'Thợ sửa máy lạnh',
    },
    {
      id: 2,
      fullName: 'Alice',
      birthDay: 25,
      email: 'tainangtre@gmail.com',
      location: 'TP HCM',
      deparment: 'Thợ sửa máy lạnh',
    },
    {
      id: 3,
      fullName: 'Alice',
      birthDay: 25,
      email: 'tainangtre@gmail.com',
      location: 'TP HCM',
      deparment: 'Thợ sửa máy lạnh',
    },
    {
      id: 4,
      fullName: 'Alice',
      birthDay: 25,
      email: 'tainangtre@gmail.com',
      location: 'TP HCM',
      deparment: 'Thợ sửa máy lạnh',
    },
    {
      id: 5,
      fullName: 'Alice',
      birthDay: 25,
      email: 'tainangtre@gmail.com',
      location: 'TP HCM',
      deparment: 'Thợ sửa máy lạnh',
    },
    {
      id: 6,
      fullName: 'Alice',
      birthDay: 25,
      email: 'tainangtre@gmail.com',
      location: 'TP HCM',
      deparment: 'Thợ sửa máy lạnh',
    },
    {
      id: 7,
      fullName: 'Alice',
      birthDay: 25,
      email: 'tainangtre@gmail.com',
      location: 'TP HCM',
      deparment: 'Thợ sửa máy lạnh',
    },
    {
      id: 8,
      fullName: 'Alice',
      birthDay: 25,
      email: 'tainangtre@gmail.com',
      location: 'TP HCM',
      deparment: 'Thợ sửa máy lạnh',
    },
    {
      id: 9,
      fullName: 'Alice',
      birthDay: 25,
      email: 'tainangtre@gmail.com',
      location: 'TP HCM',
      deparment: 'Thợ sửa máy lạnh',
    },
  ]


  //a
  //pagination
  const [page, setPage] = useState<number>(1)
  const rowsPerPage = 3

  const [select, setSelect] = useState<boolean>(false)

  const [listSelected, setListSelected] = useState([])

  return (
    <div className="">
      <div className={styles.spacing}>
        <TotalEmployee title={'Tổng số lượng nhân viên'} quality={1000} />
      </div>
      <div className="">
        <div className="flex justify-between">
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
                className="bg-transparent border-[1px] border-base-gray-2 rounded-2xl"
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
            multiSelectTable={select ? 'multiple' : 'single'}
            handleSelected={setListSelected}
          />
        </div>
        <div className="absolute bottom-5 w-full">
          <Pagi
            totalItem={8}
            page={page}
            onChange={page => setPage(page)}
            totalPage={Math.ceil(initialData.length / rowsPerPage)}
          />
        </div>
      </div>
    </div>
  )
}

export default Customer
