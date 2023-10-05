import { useState } from 'react'
import { useRouter } from 'next/router'

import SummaryForm from '@/components/form/summary'
import { SearchIcon } from '@/components/icon'
import TableComponent from '@/components/table/table'
import DefaultModal from '@/components/modal'
import SearchInput from '@/components/input/search'
import { ToastComponent } from '@/components/Toast'
import SelectButton from '@/components/SelectButton'
import Pagi from '@/components/pagination'

import { Button, Input, Textarea, useDisclosure } from '@nextui-org/react'
import { Add, Filter, Man, SearchNormal1, Woman } from 'iconsax-react'

const PersonalCustomer = () => {
  const router = useRouter()

  const columns = [
    { id: 'fullName', name: 'Họ tên', sortable: true },
    { id: 'phoneNumber', name: 'Số điện thoại', sortable: true },
    { id: 'email', name: 'Email', sortable: true },
    { id: 'ranking', name: 'Xếp hạng', sortable: true },
  ]

  const initialData = [
    {
      id: 1,
      fullName: 'Alice',
      phoneNumber: '0123456789',
      email: 'tainangtre@gmail.com',
      ranking: 'Vàng',
    },
    {
      id: 2,
      fullName: 'Alice',
      phoneNumber: '0123456789',
      email: 'tainangtre@gmail.com',
      ranking: 'Vàng',
    },
    {
      id: 3,
      fullName: 'Alice',
      phoneNumber: '0123456789',
      email: 'tainangtre@gmail.com',
      ranking: 'Đồng',
    },
    {
      id: 4,
      fullName: 'Alice',
      phoneNumber: '0123456789',
      email: 'tainangtre@gmail.com',
      ranking: 'Đồng',
    },
    {
      id: 5,
      fullName: 'Alice',
      phoneNumber: '0123456789',
      email: 'tainangtre@gmail.com',
      ranking: 'Vàng',
    },
    {
      id: 6,
      fullName: 'Alice',
      phoneNumber: '0123456789',
      email: 'tainangtre@gmail.com',
      ranking: 'Bạc',
    },
    {
      id: 7,
      fullName: 'Alice',
      phoneNumber: '0123456789',
      email: 'tainangtre@gmail.com',
      ranking: 'Bạc',
    },
    {
      id: 8,
      fullName: 'Alice',
      phoneNumber: '0123456789',
      email: 'tainangtre@gmail.com',
      ranking: 'Bạc',
    },
    {
      id: 9,
      fullName: 'Alice',
      phoneNumber: '0123456789',
      email: 'tainangtre@gmail.com',
      ranking: 'Đồng',
    },
  ]
  const [select, setSelect] = useState<boolean>(false)

  const [listSelected, setListSelected] = useState([])

  //pagination
  const [page, setPage] = useState<number>(1)
  const rowsPerPage = 3

  return (
    <>
      <SummaryForm title="Tổng số lượng khách" quality={500.0} />
      <div className="flex justify-between mt-8">
        <SelectButton
          listSelected={listSelected}
          select={select}
          setSelect={setSelect}
        />
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
          <FilterComponentPersonalTab />
          <Button
            size="md"
            startContent={<Add size="24" color="#fff" />}
            className="rounded-[16px] px-[19px] text-white bg-primary-blue text-sm"
          >Tạo mới</Button>
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
          onRowAction={id => router.push(`customer-management/customerId=${id}`)}
        />
      </div>
      <div className='absolute bottom-5 w-full'>
        <Pagi totalItem={8} page={page} onChange={page => setPage(page)} totalPage={Math.ceil(initialData.length / rowsPerPage)} />
      </div>
    </>
  )
}

export default PersonalCustomer

const FilterComponentPersonalTab = () => {
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
                <span className="text-base font-[600]">Ngành nghề</span>
                <SearchInput styleInput="w-full" />
              </div>
              <div className="space-y-2 flex gap-2 flex-col">
                <div className="flex gap-2 flex-col">
                  <span className="text-base font-[600]">Xếp hạng</span>
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
              size="lg"
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

const InputTest = ({
  title,
  startIcon,
  placeholder,
  errorMessage,
  textArea,
  data,
  setData,
  startContent,
  errorStatus = false,
}: {
  title: String
  startIcon?: any
  placeholder: any
  errorMessage: String
  textArea?: boolean
  startContent?: any
  data: any
  setData: any
  errorStatus?: boolean
}) => {
  return (
    <>
      {!textArea ? (
        <div className="input-control flex flex-col gap-2">
          <label className="text-base font-semibold">{title}</label>
          <Input
            className="text-sm"
            placeholder={placeholder}
            type="text"
            variant="bordered"
            validationState={errorStatus ? 'invalid' : 'valid'}
            value={data}
            onChange={setData}
            errorMessage={errorStatus ? errorMessage : ''}
            startContent={startContent}
            classNames={{
              errorMessage: 'text-[#FF4343]',
            }}
          />
        </div>
      ) : (
        <div className="input-control flex flex-col gap-1">
          <label className="text-base font-semibold">
            {title} <span className="text-red-700">*</span>
          </label>
          <Textarea
            variant={'bordered'}
            labelPlacement="outside"
            placeholder={placeholder}
            minRows={1}
            validationState={errorStatus ? 'invalid' : 'valid'}
            errorMessage={errorStatus ? errorMessage : ''}
            value={data}
            onChange={setData}
            classNames={{
              errorMessage: 'text-[#FF4343]',
            }}
          />
        </div>
      )}
    </>
  )
}
