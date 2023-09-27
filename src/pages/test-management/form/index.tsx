import { ReactElement, useEffect, useState } from 'react'
import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { Select, SelectItem } from '@nextui-org/select'

import { Layout } from '@/components'
import { breadcrumbAction } from '@/store/slices/loggedSlice/breadcrumbSlice'
import { NextPageWithLayout } from '@/pages/_app'
import DefaultModal from '@/components/modal'
import { ToastComponent } from '@/components/Toast'

import {
  Button,
  Checkbox,
  Input,
  Textarea,
  useDisclosure,
} from '@nextui-org/react'
import { Add, CloseCircle, SearchNormal1 } from 'iconsax-react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormInput } from '@/components/forms'

const Page: NextPageWithLayout = () => {
  const [listQuestionAdd, setListQuestionAdd] = useState<any[]>([])

  const [job, setJob] = useState('')
  const [testTitle, setTestTitle] = useState('')
  const [testDescription, setTestDescription] = useState('')
  const [testIntruction, setTestIntruction] = useState('')

  const [errorJob, setErrorJob] = useState(false)
  const [errorTestTitle, setErrorTestTitle] = useState(false)
  const [errorTestDescription, setErrorTestDescription] = useState(false)
  const [errorTestIntruction, setErrorTestIntruction] = useState(false)
  const [errorQuestion, setErrorQuestion] = useState(false)

  const router = useRouter()

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

  const handleCreate = () => {
    if (
      !job.length ||
      !testTitle.length ||
      !testDescription.length ||
      !testIntruction.length ||
      !listQuestionAdd.length
    ) {
      job.length === 0 && setErrorJob(true)
      testTitle.length === 0 && setErrorTestTitle(true)
      testDescription.length === 0 && setErrorTestDescription(true)
      testIntruction.length === 0 && setErrorTestIntruction(true)
      listQuestionAdd.length === 0 && setErrorQuestion(true)
      ToastComponent({
        message: 'Vui lòng nhập đầy đủ thông tin',
        type: 'error',
      })
    } else {
      console.log({
        job,
        testTitle,
        testDescription,
        testIntruction,
        listQuestionAdd,
      })
      ToastComponent({ message: 'Tạo bài test thành công', type: 'success' })
      router.push('/test-management')
    }
  }

  const handleDelete = (id: number) => {
    setListQuestionAdd([...listQuestionAdd].filter(item => item.id !== id))
  }

  const handleOpenModal = () => {
    if (
      !!job.length ||
      !!testTitle.length ||
      !!testDescription.length ||
      !!testIntruction.length ||
      !!listQuestionAdd.length
    ) {
      return true
    } else {
      return false
    }
  }

  const method = useForm({
    mode: 'onChange',
    defaultValues: {
      abc: '',
    },
  })

  const onSubmit = () => {
    console.log(method.getValues())
  }

  return (
    <>
      <p className="text-2xl 13inch:text-3xl font-bold">
        Tạo mới bài test quy tắc ứng xử
      </p>
      <div className="form p-8 flex flex-col gap-2 bg-white rounded-2xl mt-4 mb-[100px]">
        <div className="w-full flex flex-col gap-4">
          <InputTest
            title="Ngành nghề"
            placeholder="Tìm kiếm"
            errorMessage="Vui lòng tìm và thêm ngành nghề"
            data={job}
            setData={setJob}
            errorStatus={errorJob && job.length == 0}
            startContent={
              <SearchNormal1
                size="24"
                color="#969696"
                className="pointer-events-none flex-shrink-0"
              />
            }
          />
          <div className="flex">
            <div className="text-base-black-1 text-xs 13inch:text-sm flex flex-shrink-0 px-4">
              Đã chọn(18):
            </div>
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
        <InputTest
          title="Tên bài test"
          placeholder="Nhập tên..."
          errorStatus={errorTestTitle && testTitle.length == 0}
          errorMessage="Vui lòng nhập thông tin"
          data={testTitle}
          setData={setTestTitle}
        />
        <InputTest
          title="Mô tả bài test"
          placeholder="Nhập mô tả..."
          errorMessage="Vui lòng nhập thông tin"
          data={testDescription}
          setData={setTestDescription}
          errorStatus={errorTestDescription && testDescription.length == 0}
          textArea
        />
        <InputTest
          title="Hướng dẫn bài test"
          placeholder="Nhập hướng dẫn..."
          errorMessage="Vui lòng nhập thông tin"
          data={testIntruction}
          setData={setTestIntruction}
          errorStatus={errorTestIntruction && testIntruction.length == 0}
          textArea
        />
        <div className="input-control flex flex-col gap-2">
          <div className="text-sm 13inch:text-base font-semibold">
            Chọn câu hỏi <span className="text-red-700">*</span>
          </div>
          <div className="flex flex-col gap-2">
            {listQuestionAdd.length > 0 && (
              <div className="w-full">
                <div className="border-[1px] border-base-gray-2 rounded-2xl p-4 flex flex-col gap-2 mb-2">
                  {listQuestionAdd.map(item => (
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
                setListQuestionAdd={setListQuestionAdd}
                listQuestionAdd={listQuestionAdd}
              />
              {errorQuestion && listQuestionAdd.length == 0 && (
                <span className="text-sm text-[#FF4343]">
                  Vui lòng thêm câu hỏi
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <footer className="fixed bottom-0 right-0 left-0 py-4 px-12 z-10 bg-white flex gap-6 items-center justify-end shadow-[0px_-4px_16px_0px_rgba(0,0,0,0.08)]">
        <CancelComponent handleOpenModal={handleOpenModal} />
        <Button
          size="lg"
          startContent={<Add size="24" color="#fff" />}
          className="rounded-[16px] px-[33px] text-white bg-primary-blue text-sm font-semibold"
          onClick={handleCreate}
        >
          Tạo
        </Button>
      </footer>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      breadcrumbAction.updateBreadcrumb([
        'Trang chủ',
        'Quản lí bài test',
        'Tạo mới',
      ]),
    )
  }, [])

  return (
    <Layout>
      <Head>
        <title>Tạo mới</title>
      </Head>
      <>{page}</>
    </Layout>
  )
}

export default Page

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
  errorStatus: boolean
}) => {
  return (
    <>
      {!textArea ? (
        <div className="input-control flex flex-col gap-2">
          <label className="text-sm 13inch:text-base font-semibold">
            {title} <span className="text-red-700">*</span>
          </label>
          <Input
            className="text-sm"
            placeholder={placeholder}
            type="text"
            variant="bordered"
            validationState={errorStatus ? 'invalid' : 'valid'}
            value={data}
            onChange={(e: any) => {
              setData(e.target.value)
            }}
            errorMessage={errorStatus ? errorMessage : ''}
            startContent={startContent}
            classNames={{
              errorMessage: 'text-[#FF4343]',
            }}
          />
        </div>
      ) : (
        <div className="input-control flex flex-col gap-1">
          <label className="text-sm 13inch:text-base font-semibold">
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
            onChange={(e: any) => {
              setData(e.target.value)
            }}
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
        size="lg"
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
    <div className="w-full flex justify-between text-sm items-center p-4">
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
}: {
  setListQuestionAdd: any
  listQuestionAdd: any
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

  const [arrChecked, setArrChecked] = useState<any[]>([])

  useEffect(() => {
    setArrChecked(listQuestionAdd)
  }, [listQuestionAdd])

  const submitAddQuestion = () => {
    handleSubmit()
    onClose()
  }

  const handleChange = (id: any) => {
    const isIdChecked = arrChecked.some(item => item.id === id)
    if (isIdChecked) {
      const newArr = arrChecked.filter(item => item.id !== id)
      setArrChecked(newArr)
    } else {
      const newItem = listQuestion.find(item => item.id === id)
      setArrChecked([...arrChecked, newItem])
    }
  }

  const handleSubmit = () => {
    setListQuestionAdd(arrChecked)
  }
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
  const listTime = [
    { id: 1, title: '< 2 Phút' },
    { id: 2, title: 'Từ 2 - 5 Phút' },
    { id: 3, title: '> 5 Phút' },
  ]
  const listPoint = [
    { id: 1, title: '< 2 Điểm' },
    { id: 2, title: 'Từ 2 - 5 Điểm' },
    { id: 3, title: '> 5 Điểm' },
  ]
  return (
    <>
      <Button
        onPress={onOpen}
        size="md"
        className="rounded-[16px] px-12 text-primary-blue border-[2px] border-primary-blue bg-transparent text-sm font-semibold"
      >
        Thêm
      </Button>
      <DefaultModal
        modalTitle="Thêm câu hỏi"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hiddenBtnCancel
        onConfirm={submitAddQuestion}
        btnConfirmContent="Thêm"
        propsModal={{
          size: '5xl',
        }}
        modalBody={
          <>
            <div className="w-full mt-4">
              <div className="flex gap-4">
                <div className=" w-full">
                  <Input
                    variant="bordered"
                    className="bg-transparent border-[1px] border-base-gray-2 rounded-2xl w-[350px]"
                    placeholder="Tìm kiếm"
                    startContent={<SearchNormal1 size="24" color="#969696" />}
                    size="lg"
                    type="text"
                  />
                </div>

                <Select
                  items={listJobs}
                  size="sm"
                  placeholder="Ngành nghề"
                  variant="bordered"
                  radius="lg"
                  className=" text-base-drak-gray bg-transparent text-sm border-base-gray-2 gap-12"
                >
                  {job => <SelectItem key={job.id}>{job.title}</SelectItem>}
                </Select>

                <Select
                  items={listTime}
                  size="sm"
                  placeholder="Thời gian"
                  variant="bordered"
                  radius="lg"
                  className=" text-base-drak-gray bg-transparent text-sm border-base-gray-2 gap-12"
                >
                  {time => <SelectItem key={time.id}>{time.title}</SelectItem>}
                </Select>

                <Select
                  items={listPoint}
                  size="sm"
                  placeholder="Điểm"
                  variant="bordered"
                  radius="lg"
                  className=" text-base-drak-gray bg-transparent text-sm border-base-gray-2 gap-12"
                >
                  {point => (
                    <SelectItem key={point.id}>{point.title}</SelectItem>
                  )}
                </Select>
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
                    checkedItem => checkedItem.id === item.id,
                  )}
                  handleChange={() => handleChange(item.id)}
                />
              ))}
            </div>
          </>
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
    </>
  )
}

const CancelComponent = ({ handleOpenModal }: { handleOpenModal: any }) => {
  const router = useRouter()

  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure()

  const confirmCancle = () => {
    // handleOpenModal() ? onOpen() : submitDelete()
    handleOpenModal() ? onOpen() : submitDelete()
  }

  const submitDelete = () => {
    router.push('/test-management')
  }

  return (
    <>
      <Button
        size="md"
        className="rounded-[16px] px-12 text-primary-blue border-[2px] border-primary-blue bg-transparent text-sm font-semibold"
        onPress={confirmCancle}
      >
        Hủy
      </Button>
      <DefaultModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onConfirm={submitDelete}
        btnCloseContent="Trở về"
        modalTitle={'Hủy tạo bài test'}
        modalBody={
          <p className="py-2 text-sm 13inch:text-base">
            Bạn có chắc là muốn hủy tạo bài test chứ? Bài test sẽ không thể khôi
            phục một khi đã hủy!
          </p>
        }
      />
    </>
  )
}
