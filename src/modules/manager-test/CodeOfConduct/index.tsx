import { useEffect, useState } from 'react'
import { ExportIcon, SearchIcon } from '@/components/icon'
import TableComponent from '@/components/table/table'
import DefaultModal from '@/components/modal'
import {
  Button,
  Checkbox,
  Input,
  Textarea,
  useDisclosure,
} from '@nextui-org/react'
import {
  Add,
  ArrowDown2,
  CloseCircle,
  Filter,
  SearchNormal1,
} from 'iconsax-react'
import { ToastComponent } from '@/components/Toast'
import { useRouter } from 'next/router'
import SelectButton from '@/components/SelectButton'

function CodeOfConduct(this: any) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const [listData, setListData] = useState({
    job: 'Web dev',
    testTitle: 'Go go go',
    testDescription: 'hihi hehe hoho',
    testIntruction: 'Điền đầy đủ là không lỗi',
    listQuestionAdd: [
      {
        id: 1,
        title: 'Công việc của một nhà quản lý dự án là gì?',
        job: 'Medical Assistant',
        time: 5,
        point: 1,
      },
      {
        id: 2,
        title: 'Công việc của một nhà quản lý dự án là gì?',
        job: 'Medical Kh',
        time: 5,
        point: 1,
      },
    ],
  })
  const [onSending, setOnSending] = useState<boolean>(false)

  const [errorJob, setErrorJob] = useState(false)
  const [errorTestTitle, setErrorTestTitle] = useState(false)
  const [errorTestDescription, setErrorTestDescription] = useState(false)
  const [errorTestIntruction, setErrorTestIntruction] = useState(false)
  const [errorQuestion, setErrorQuestion] = useState(false)

  const columns = [
    { id: 'idTest', name: 'ID bài test', sortable: true },
    { id: 'title', name: 'Tiêu đề', sortable: true },
    { id: 'job', name: 'Nghề nghiệp', sortable: true },
    { id: 'time', name: 'Thời gian', sortable: true },
    { id: 'result', name: 'Điểm', sortable: true },
  ]

  const initialData = [
    {
      id: 1,
      idTest: '#1231231',
      title: 'Tiêu đề bài test',
      job: 'Điện lạnh',
      time: '15:00',
      result: '7 Điểm',
    },
    {
      id: 2,
      idTest: '#48942',
      title: 'Tiêu đề bài test',
      job: 'Điện lạnh',
      time: '15:00',
      result: '10 Điểm',
    },
    {
      id: 3,
      idTest: '#1245',
      title: 'Tiêu đề bài test',
      job: 'Điện lạnh',
      time: '15:00',
      result: '8 Điểm',
    },
    {
      id: 4,
      idTest: '#75564',
      title: 'Tiêu đề bài test',
      job: 'Điện lạnh',
      time: '15:00',
      result: '8 Điểm',
    },
    {
      id: 5,
      idTest: '#754',
      title: 'Tiêu đề bài test',
      job: 'Điện lạnh',
      time: '15:00',
      result: '1 Điểm',
    },
    {
      id: 6,
      idTest: '#654',
      title: 'Tiêu đề bài test',
      job: 'Điện lạnh',
      time: '15:00',
      result: '1 Điểm',
    },
    {
      id: 7,
      idTest: '#3456',
      title: 'Tiêu đề bài test',
      job: 'Điện lạnh',
      time: '15:00',
      result: '1 Điểm',
    },
    {
      id: 8,
      idTest: '#76543',
      title: 'Tiêu đề bài test',
      job: 'Điện lạnh',
      time: '15:00',
      result: '1 Điểm',
    },
    {
      id: 9,
      idTest: '#6789',
      title: 'Tiêu đề bài test',
      job: 'Điện lạnh',
      time: '15:00',
      result: '8 Điểm',
    },
  ]

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
  const listQuestion = [
    {
      id: 1,
      title: 'Công việc của một nhà quản lý dự án là gì?',
      job: 'Medical Assistant',
      time: 5,
      point: 1,
    },
    {
      id: 2,
      title: 'Công việc của một nhà quản lý dự án là gì?',
      job: 'Marketing Coordinator',
      time: 5,
      point: 1,
    },
    {
      id: 3,
      title: 'Công việc của một nhà quản lý dự án là gì?',
      job: 'Web Designer',
      time: 5,
      point: 1,
    },
    {
      id: 4,
      title: 'Công việc của một nhà quản lý dự án là gì?',
      job: 'Điện lạnh',
      time: 5,
      point: 1,
    },
    {
      id: 5,
      title: 'Công việc của một nhà quản lý dự án là gì?',
      job: 'Dog Trainer',
      time: 5,
      point: 1,
    },
    {
      id: 6,
      title: 'Công việc của một nhà quản lý dự án là gì?',
      job: 'President of Sales',
      time: 5,
      point: 1,
    },
    {
      id: 7,
      title: 'Công việc của một nhà quản lý dự án là gì?',
      job: 'Nursing Assistant',
      time: 5,
      point: 1,
    },
  ]

  const [id, setId] = useState<any>()

  const _handleSelect = (id: any) => {
    onOpen()
    setId(id)
  }
  const handleDelete = (id: number) => {
    const updatedListQuestionAdd = listData.listQuestionAdd.filter(
      item => item.id !== id,
    )

    setListData({
      ...listData,
      listQuestionAdd: updatedListQuestionAdd,
    })
  }

  const _ServerSending = async () => {
    // api
    setTimeout(() => {
      setOnSending(false)
    }, 1000)
    onClose()
    ToastComponent({ message: 'Lưu bài test thành công', type: 'success' })
  }

  useEffect(() => {
    onSending && _ServerSending()
  }, [onSending])

  const handleCreate = () => {
    if (
      !listData.job.length ||
      !listData.testTitle.length ||
      !listData.testDescription.length ||
      !listData.testIntruction.length ||
      !listData.listQuestionAdd.length
    ) {
      listData.job.length === 0 && setErrorJob(true)
      listData.testTitle.length === 0 && setErrorTestTitle(true)
      listData.testDescription.length === 0 && setErrorTestDescription(true)
      listData.testIntruction.length === 0 && setErrorTestIntruction(true)
      listData.listQuestionAdd.length === 0 && setErrorQuestion(true)

      ToastComponent({
        message: 'Vui lòng nhập đầy đủ thông tin',
        type: 'error',
      })
    } else {
      setOnSending(true)

      // onClose()
    }
  }
// log
  const handleSubmit = () => {
    handleCreate()
  }

  const _HandleChangeValue = (type: string, value?: any) => {
    if (type === 'listQuestionAdd') {
      setListData({ ...listData, [type]: value })
    } else {
      setListData({ ...listData, [type]: value?.target.value })
    }
  }
  const [arrChecked, setArrChecked] = useState<any[]>([])

  const [select, setSelect] = useState<boolean>(false)

  const [listSelected, setListSelected] = useState([])
  const router = useRouter()
  //lo
  return (
    <>
      <div className="flex justify-between mt-[20px]">
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
          <FilterCompoent />
          <Button
            size="md"
            onClick={() => router.push('/test-management/form')}
            className="rounded-[16px] px-4 13inch:px-[19px] text-white bg-primary-blue text-xs 13inch:text-sm flex items-center gap-2"
          >
            <Add size="24" color="#fff" />
            Tạo mới
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <TableComponent
          columns={columns}
          initialData={initialData}
          rowsPerPage={8}
          onRowAction={_handleSelect}
          multiSelectTable={select ? 'multiple' : 'single'}
          handleSelected={setListSelected}
        />
        <DefaultModal
          modalTitle={`Chi tiết câu hỏi ${id}`}
          subModalTitle="#1231231"
          onOpenChange={onOpenChange}
          isOpen={isOpen}
          btnCloseContent="Trở về"
          btnConfirmContent={onSending ? 'Loading' : 'Lưu'}
          propsBtnConfirm={{
            isDisabled: onSending,
          }}
          onConfirm={() => handleSubmit()}
          propsModal={{
            size: '5xl',
          }}
          modalBody={
            <div className="flex flex-col gap-2 rounded-2xl mt-4">
              <div className="w-full flex flex-col gap-4">
                <InputTest
                  title="Ngành nghề"
                  placeholder="Tìm kiếm"
                  errorMessage="Vui lòng tìm và thêm ngành nghề"
                  data={listData.job}
                  setData={_HandleChangeValue.bind(this, 'job')}
                  errorStatus={errorJob && listData.job.length == 0}
                  startContent={
                    <SearchNormal1
                      size="24"
                      color="#969696"
                      className="pointer-events-none flex-shrink-0"
                    />
                  }
                />
                <div className="flex">
                  <div className="text-base-black-1 text-sm flex flex-shrink-0 px-4">
                    Đã chọn(18):
                  </div>
                  <div className="w-full flex gap-4 flex-wrap">
                    {listJobs.map(job => (
                      <div className="flex gap-1 items-center" key={job.id}>
                        <p className="text-primary-blue text-sm font-semibold">
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
              <InputTest
                title="Tên bài test"
                placeholder="Nhập tên..."
                errorStatus={errorTestTitle && listData.testTitle.length == 0}
                errorMessage="Vui lòng nhập thông tin"
                data={listData.testTitle}
                setData={_HandleChangeValue.bind(this, 'testTitle')}
              />
              <InputTest
                title="Mô tả bài test"
                placeholder="Nhập mô tả..."
                errorMessage="Vui lòng nhập thông tin"
                data={listData.testDescription}
                setData={_HandleChangeValue.bind(this, 'testDescription')}
                errorStatus={
                  errorTestDescription && listData.testDescription.length == 0
                }
                textArea
              />
              <InputTest
                title="Hướng dẫn bài test"
                placeholder="Nhập hướng dẫn..."
                errorMessage="Vui lòng nhập thông tin"
                data={listData.testIntruction}
                setData={_HandleChangeValue.bind(this, 'testIntruction')}
                errorStatus={
                  errorTestIntruction && listData.testIntruction.length == 0
                }
                textArea
              />
              <div className="input-control flex flex-col gap-2">
                <div className="text-sm 13inch:text-base font-semibold">
                  Chọn câu hỏi <span className="text-red-700">*</span>
                </div>
                <div className="flex flex-col gap-2">
                  {listData.listQuestionAdd.length > 0 && (
                    <div className="w-full">
                      <div className="border-[1px] border-base-gray-2 rounded-2xl p-4 flex flex-col gap-2">
                        {listData.listQuestionAdd.map((item: any) => (
                          <QuestionsAdded
                            key={item.id}
                            job={item.job}
                            time={item.time}
                            title={item.title}
                            point={item.point}
                            handleClick={() => handleDelete(item.id)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex gap-2 items-center">
                    <AddQuestionModal
                      arrChecked={arrChecked}
                      setArrChecked={setArrChecked}
                      listQuestionAdd={listData.listQuestionAdd}
                      setListQuestionAdd={_HandleChangeValue.bind(
                        this,
                        'listQuestionAdd',
                      )}
                    />
                    {errorQuestion && listData.listQuestionAdd.length == 0 && (
                      <span className="text-sm text-[#FF4343]">
                        Vui lòng thêm câu hỏi
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          }
          propsModalFooter={
            <div className="flex items-center justify-between w-[60%]">
              <div className="text-sm 13inch:text-base font-semibold flex gap-[10px]">
                <p className="text-base-drak-gray">Tổng số câu:</p>
                <span className="text-primary-blue ">{arrChecked?.length}</span>
              </div>
              <div className="text-sm 13inch:text-base font-semibold flex gap-[10px]">
                <p className="text-base-drak-gray">Tổng thời gian:</p>
                <span className="text-primary-blue ">
                  {arrChecked.reduce(
                    (accumulator, item) => accumulator + item.time,
                    0,
                  )}
                </span>
              </div>
              <div className="text-sm 13inch:text-base font-semibold flex gap-[10px]">
                <p className="text-base-drak-gray">Tổng điểm:</p>
                <span className="text-primary-blue ">
                  {arrChecked.reduce(
                    (accumulator, item) => accumulator + item.point,
                    0,
                  )}
                </span>
              </div>
            </div>
          }
        />
      </div>
    </>
  )
}

export default CodeOfConduct

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
          <label className="text-sm 13inch:text-base font-semibold mt-2">
            {title} <span className="text-red-700">*</span>
          </label>
          <Input
            size="md"
            className="text-xs 13inch:text-sm"
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
          <label className="text-sm 13inch:text-base font-semibold mt-2">
            {title} <span className="text-red-700">*</span>
          </label>
          <Textarea
            variant={'bordered'}
            labelPlacement="outside"
            placeholder={placeholder}
            minRows={1}
            size="md"
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

const ItemSelect = ({
  title,
  job,
  time,
  point,
  handleChange,
  icon,
  defaultSelected = false,
  isChecked,
}: {
  title: string
  job: string
  time: number
  point: number
  handleChange: any
  icon?: any
  defaultSelected?: boolean
  isChecked: any
}) => {
  return (
    <div className="w-full">
      <Checkbox
        defaultSelected={defaultSelected}
        isSelected={isChecked}
        size="md"
        classNames={{
          base: 'w-full max-w-none flex py-4',
          label: 'w-full',
        }}
        onChange={handleChange}
        icon={icon}
      >
        <div className="w-full flex gap-12 justify-between text-sm">
          <p className="w-full ml-[50px]">{title}</p>
          <div className="flex w-full gap-12 justify-end">
            <p className="max-w-fit font-semibold">{job}</p>
            <p className="max-w-fit">{time} Phút</p>
            <p className="max-w-fit">{point} điểm</p>
          </div>
        </div>
      </Checkbox>
    </div>
  )
}

const QuestionsAdded = ({
  handleClick,
  title,
  job,
  time,
  point,
}: {
  handleClick: any
  title: string
  job: string
  time: string
  point: string
}) => {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure()

  // const handleDelete = (id: number) => {
  //   handleChange(id)
  //   setListQuestionAdd([...listQuestionAdd].filter(item => item.id !== id))
  // }

  const handleDelete = () => {
    handleClick()
    onClose()
  }
  return (
    <div className="w-full flex justify-between text-xs 13inch:text-sm items-center p-4">
      <p className="w-full">{title}</p>
      <div className="flex w-full gap-12 justify-end">
        <p className="font-semibold">{job}</p>
        <p className="">{time} Phút</p>
        <p className="">{point} điểm</p>
        <span className="cursor-pointer" onClick={onOpen}>
          <CloseCircle size={24} variant="Bulk" color="#f47373" />
        </span>
        <DefaultModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onConfirm={handleDelete}
          modalTitle={'Xóa câu hỏi'}
          modalBody={<p>Bạn có chắc là muốn hủy xóa câu hỏi này chứ?</p>}
        />
      </div>
    </div>
  )
}

const AddQuestionModal = ({
  setListQuestionAdd,
  listQuestionAdd,
  arrChecked,
  setArrChecked,
}: {
  setListQuestionAdd: any
  listQuestionAdd: any
  arrChecked: any
  setArrChecked: any
}) => {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure()

  const listQuestion = [
    {
      id: 1,
      title: 'Công việc của một nhà quản lý dự án là gì?',
      job: 'Medical Assistant',
      time: 5,
      point: 1,
    },
    {
      id: 2,
      title: 'Công việc của một nhà quản lý dự án là gì?',
      job: 'Marketing Coordinator',
      time: 5,
      point: 1,
    },
    {
      id: 3,
      title: 'Công việc của một nhà quản lý dự án là gì?',
      job: 'Web Designer',
      time: 5,
      point: 1,
    },
    {
      id: 4,
      title: 'Công việc của một nhà quản lý dự án là gì?',
      job: 'Điện lạnh',
      time: 5,
      point: 1,
    },
    {
      id: 5,
      title: 'Công việc của một nhà quản lý dự án là gì?',
      job: 'Dog Trainer',
      time: 5,
      point: 1,
    },
    {
      id: 6,
      title: 'Công việc của một nhà quản lý dự án là gì?',
      job: 'President of Sales',
      time: 5,
      point: 1,
    },
    {
      id: 7,
      title: 'Công việc của một nhà quản lý dự án là gì?',
      job: 'Nursing Assistant',
      time: 5,
      point: 1,
    },
  ]

  useEffect(() => {
    setArrChecked(listQuestionAdd)
  }, [listQuestionAdd])

  const submitAddQuestion = () => {
    handleSubmit()
    onClose()
  }

  const handleChange = (id: any) => {
    const isIdChecked = arrChecked.some((item: any) => item.id === id)
    if (isIdChecked) {
      const newArr = arrChecked.filter((item: any) => item.id !== id)
      setArrChecked(newArr)
    } else {
      const newItem = listQuestion.find(item => item.id === id)
      setArrChecked([...arrChecked, newItem])
    }
  }

  const handleSubmit = () => {
    setListQuestionAdd(arrChecked)
  }

  return (
    <>
      <Button
        onPress={onOpen}
        size="md"
        className="rounded-[16px] px-12 text-primary-blue border-[2px] border-primary-blue bg-transparent text-xs mb-2 13inch:text-sm font-semibold"
      >
        Thêm
      </Button>
      <DefaultModal
        modalTitle="Thêm câu hỏi"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onConfirm={submitAddQuestion}
        btnConfirmContent={'Thêm'}
        hiddenBtnCancel
        propsModal={{
          size: '5xl',
        }}
        propsModalFooter={
          <div className="flex items-center justify-between w-[60%]">
            <div className="text-sm 13inch:text-base font-semibold flex gap-[10px]">
              <p className="text-base-drak-gray">Tổng số câu:</p>
              <span className="text-primary-blue ">{arrChecked?.length}</span>
            </div>
            <div className="text-sm 13inch:text-base font-semibold flex gap-[10px]">
              <p className="text-base-drak-gray">Tổng thời gian:</p>
              <span className="text-primary-blue ">
                {arrChecked.reduce(
                  (accumulator: any, item: any) => accumulator + item.time,
                  0,
                )}
              </span>
            </div>
            <div className="text-sm 13inch:text-base font-semibold flex gap-[10px]">
              <p className="text-base-drak-gray">Tổng điểm:</p>
              <span className="text-primary-blue ">
                {arrChecked.reduce(
                  (accumulator: any, item: any) => accumulator + item.point,
                  0,
                )}
              </span>
            </div>
          </div>
        }
        modalBody={
          <>
            <div className="w-full">
              <div className="flex gap-4">
                <div className=" w-full">
                  <Input
                    variant="bordered"
                    className="bg-transparent border-[1px] border-base-gray-2 rounded-2xl w-full"
                    placeholder="Tìm kiếm"
                    startContent={<SearchNormal1 size="24" color="#969696" />}
                    size="md"
                    type="text"
                  />
                </div>
                <Button
                  size="md"
                  endContent={<ArrowDown2 size="24" color="#969696" />}
                  className="rounded-[16px] text-base-drak-gray bg-transparent text-sm border-[2px] border-base-gray-2 gap-12 flex-shrink-0"
                >
                  Ngành nghề
                </Button>
                <Button
                  size="md"
                  endContent={<ArrowDown2 size="24" color="#969696" />}
                  className="rounded-[16px] text-base-drak-gray bg-transparent text-sm border-[2px] border-base-gray-2 gap-12 flex-shrink-0"
                >
                  Thời gian
                </Button>
                <Button
                  size="md"
                  endContent={<ArrowDown2 size="24" color="#969696" />}
                  className="rounded-[16px] text-base-drak-gray bg-transparent text-sm border-[2px] border-base-gray-2 gap-12 flex-shrink-0"
                >
                  Điểm
                </Button>
              </div>
            </div>
            <div className="w-full">
              {listQuestion.map((item: any) => (
                <ItemSelect
                  key={item.id}
                  job={item.job}
                  title={item.title}
                  point={item.point}
                  time={item.time}
                  isChecked={arrChecked.some(
                    (checkedItem: any) => checkedItem.id === item.id,
                  )}
                  handleChange={() => handleChange(item.id)}
                />
              ))}
            </div>
          </>
        }
      />
    </>
  )
}

const FilterCompoent = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const [searchJobValue, setSearchJobValue] = useState('')
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

  return (
    <>
      <Button
        onPress={onOpen}
        size="md"
        startContent={<Filter size="24" />}
        className="rounded-[16px] px-[19px] text-base-drak-gray bg-transparent text-xs 13inch:text-sm border-[2px] border-base-gray-2"
      >
        Bộ lọc
      </Button>
      <DefaultModal
        modalTitle={
          <div className="flex gap-3 items-center">
            <span>
              <Filter size={24} />
            </span>
            <p className="text-lg 13inch:text-xl">Bộ lọc</p>
          </div>
        }
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onConfirm={onClose}
        btnAnotherContent="Bỏ chọn"
        propsModal={{
          size: '5xl',
        }}
        modalBody={
          <div className="w-full flex flex-col gap-4 min-h-[50vh]">
            <InputTest
              title="Ngành nghề"
              placeholder="Tìm kiếm"
              errorMessage="Vui lòng tìm và thêm ngành nghề"
              data={searchJobValue}
              setData={setSearchJobValue}
              startContent={
                <SearchNormal1
                  size="24"
                  color="#969696"
                  className="pointer-events-none flex-shrink-0"
                />
              }
            />
            <div className="flex">
              <p className="text-base-black-1 text-sm 13inch:text-sm flex flex-shrink-0 px-4 translate-y-[-2px]">
                Đã chọn(18):
              </p>
              <div className="w-full flex gap-4 flex-wrap">
                {listJobs.map(job => (
                  <div className="flex gap-1 items-center" key={job.id}>
                    <p className="text-primary-blue text-xs 13inch:text-sm font-semibold">
                      {job.title}
                    </p>
                    <span className="">
                      <CloseCircle variant="Bulk" color="#5A9DFF" size={24} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
        propsModalFooter={
          <Button
            className="border-primary-blue text-primary-blue font-[600] w-[110px] 13inch:w-[120px] py-3 13inch:py-5 text-sm 13inch:text-base"
            variant="bordered"
            size="md"
          >
            Bỏ chọn(8)
          </Button>
        }
      />
    </>
  )
}
