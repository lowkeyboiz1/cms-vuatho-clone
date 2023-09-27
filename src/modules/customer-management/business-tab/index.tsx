import { useRouter } from 'next/router'

import TotalEmployee from '@/components/form/summary'
import { SearchIcon } from '@/components/icon'
import TableComponent from '@/components/table/table'

import { Button, Input, useDisclosure } from '@nextui-org/react'
import { Add, CloseCircle, Filter, Man, Woman } from 'iconsax-react'
import DefaultModal from '@/components/modal'
import SearchInput from '@/components/input/search'
import { ToastComponent } from '@/components/Toast'
import { useState } from 'react'

const BussinessCustomer = () => {
  const router = useRouter()

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

  return (
    <div className="">
      <TotalEmployee title={'Tổng số lượng doanh nghiệp'} quality={500} />
      <div className="flex justify-between mt-8">
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
              required
              className="bg-transparent border-[1px] border-base-gray-2 rounded-2xl overflow-hidden"
              placeholder="Tìm kiếm"
              size="md"
              startContent={
                <SearchIcon className={'text-base-drak-gray text-xl'} />
              }
              type="text"
            />
          </div>
          <FilterComponentBussinessCustomer />
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
          initialData={initialData}
          rowsPerPage={8}
          multiSelectTable="multiple"
          onRowAction={id =>
            router.push(`customer-management/bussinessId=${id}`)
          }
        />
      </div>
    </div>
  )
}

export default BussinessCustomer

const FilterComponentBussinessCustomer = () => {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure()

  const [searchJobValue, setSeatchJobValue] = useState('')
  const [selectedGender, sSelectedGender] = useState<string>('')
  const [selectedRank, setSelectedRank] = useState<string[]>([])

  const optionsGender = ['Nam', 'Nữ']

  const optionsRank = ['Đồng', 'Bạc', 'Vàng']

  const handleSelectRank = (e: any) => {
    const clone = [...selectedRank]
    if (clone.includes(e)) {
      setSelectedRank(() => clone.filter(i => i !== e))
    } else {
      setSelectedRank([...clone, e])
    }
  }

  const handleConfirm = () => {
    if (!!selectedGender.length || !!selectedRank.length) {
      onClose()
    } else {
      ToastComponent({
        message: 'Vui lòng nhập đầy đủ thông tin',
        type: 'error',
      })
    }
  }
  return (
    <>
      <Button
        onPress={onOpen}
        size="md"
        startContent={<Filter size="24" />}
        className="rounded-[16px] px-[19px] text-base-drak-gray bg-transparent text-sm border-[2px] border-base-gray-2"
      >
        Bộ lọc
      </Button>
      <DefaultModal
        modalTitle={
          <div className="flex gap-3 items-center text-primary-blue">
            <span>
              <Filter size={24} />
            </span>
            <p className="font-bold text-2xl">Bộ lọc</p>
          </div>
        }
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        styleModalTitle={'text-base-black-1'}
        onConfirm={handleConfirm}
        propsModal={{
          size: '5xl',
        }}
        modalBody={
          <>
            <div className="space-y-6 min-h-[400px]">
              <div className="space-y-2 mt-2">
                <span className="text-base font-semibold">Ngành nghề</span>
                <SearchInput styleInput="w-full" />
              </div>
              <div className="space-y-2 flex gap-2 flex-col">
                <div className="flex gap-2 flex-col">
                  <span className="text-base font-semibold">Xếp hạng</span>
                  <div className="flex gap-4">
                    {optionsRank.map(e => (
                      <div key={e}>
                        <input
                          type="checkbox"
                          id={e}
                          value={e}
                          name="gender"
                          checked={optionsRank.includes(e)}
                          onChange={() => handleSelectRank(e)}
                          hidden
                        />
                        <label
                          htmlFor={e}
                          className={`${
                            selectedRank.includes(e)
                              ? 'bg-primary-blue/70 text-white'
                              : 'bg-base-gray'
                          } transition ease-in-out px-4 py-2 rounded-full flex flex-col justify-center items-center cursor-pointer`}
                          // style={{ borderColor: `${selectedGender.includes(e) ? '#246BFD' : 'transparent'}` }}
                        >
                          {e}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-base font-[600]">Giới tính</span>
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
                          } transition ease-in-out px-4 py-2 rounded-full flex flex-col justify-center items-center cursor-pointer`}
                          // style={{ borderColor: `${selectedGender.includes(e) ? '#246BFD' : 'transparent'}` }}
                        >
                          <div className="flex gap-2">
                            <span>
                              {e === 'Nam' ? (
                                <Man size="24" />
                              ) : (
                                <Woman size="24" />
                              )}
                            </span>
                            <span>{e}</span>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        }
        propsModalFooter={
          <>
            <Button
              onClick={() => {
                sSelectedGender('')
                setSelectedRank([])
              }}
              size="md"
              className="rounded-[16px] px-[19px] text-base-drak-gray bg-transparent text-sm border-[2px] border-base-gray-2"
            >
              Bỏ chọn
            </Button>
          </>
        }
      />
    </>
  )
}
