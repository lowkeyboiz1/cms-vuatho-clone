import { ReactElement, RefObject, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import Link from 'next/link'

import { NextPageWithLayout } from '../_app'
import { breadcrumbAction } from '@/store/slices/loggedSlice/breadcrumbSlice'
import { Layout } from '@/components'
import TableComponent from '@/components/table/table'
import DefaultModal from '@/components/modal'
import { v4 as uuidv4 } from 'uuid'
import {
  Button,
  Input,
  Tabs,
  Tab,
  useDisclosure,
  Textarea,
  Checkbox,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react'
import { ExportIcon, SearchIcon } from '@/components/icon'
import {
  Add,
  Add as AddIcon,
  Filter,
  DocumentUpload as DocumentUploadIcon,
  RecordCircle as CircleIcon,
  Trash,
} from 'iconsax-react'
import Image from 'next/image'
import { ToastComponent } from '@/components/Toast'
import SelectButton from '@/components/SelectButton'
import instance from '@/services/axiosConfig'

const Page: NextPageWithLayout = () => {
  const [listQuestionFromApi, setListQuestionFromApi] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      breadcrumbAction.updateBreadcrumb(['Trang chủ', 'Quản lí câu hỏi']),
    )
  }, [])

  const callApiListQuestion = async () => {
    const respone = await instance.get('/input-testing/questions', {
      params: {
        page: 1,
        limit: 10,
      },
    })
    setListQuestionFromApi(respone.data)
  }

  useEffect(() => {
    callApiListQuestion()
  }, [])

  const tabs = [
    {
      id: 'question',
      label: 'Quy tắc ứng xử',
      content: <QuestionTab listQuestionFromApi={listQuestionFromApi} />,
    },
    {
      id: 'profession',
      label: 'Nghiệp vụ',
      content: <div>hi</div>,
    },
  ]

  return (
    <>
      <Tabs
        aria-label="Tab about personal customers and bussiness customers"
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
            'group-data-[selected=true]:text-[#246BFD] font-semibold text-xs 13inch:text-base',
          panel: 'px-0',
        }}
      >
        {item => (
          <Tab
            key={item.id}
            title={<span className="uppercase">{item.label}</span>}
          >
            <div>{item.content}</div>
          </Tab>
        )}
      </Tabs>
    </>
  )
}

const QuestionInfo = ({
  onClose,
  detailQuestion,
}: {
  onClose: any
  detailQuestion: any
}) => {
  const inputUpload: RefObject<HTMLInputElement> = useRef(null)

  const [errorQuestionContent, sErrorQuestionContent] = useState<boolean>(false)
  const [errorQuestionTime, sErrorQuestionTime] = useState<boolean>(false)
  const [errorQuestionPoint, sErrorQuestionPoint] = useState<boolean>(false)
  const [errorAnswer, sErrorAnswer] = useState<boolean>(false)

  const initData = {
    question: '123',
    attachments: [
      {
        id: 'fa948052-5182-4405-ac85-60f4c7156370',
        file: '/images/Rectangle 3538.png',
      },
      {
        id: '213ae9f6-5fab-4533-99d2-f3057ebf56dd',
        file: 'https://i.pinimg.com/474x/4e/00/d6/4e00d6fefc62f1f26ada55a1f4f100c1.jpg',
      },
    ],
    answers: [
      {
        id: 'answer-1',
        content: '213213',
        is_correct: true,
      },
      {
        id: 'answer-2',
        content: '213',
        is_correct: false,
      },
    ],
    time: 123,
    point: 123,
  }

  const [listData, setListData] = useState<any>(detailQuestion)

  console.log(listData.time)

  const checkConditionAnswer =
    listData.answers.filter((answer: any) => answer.content !== '').length >=
      2 &&
    listData.answers.filter((answer: any) => answer.is_correct).length >= 1
  const _HandleDeleteFile = (type: string, id?: any) => {
    if (type == 'item') {
      const attachments = listData?.attachments.filter(
        (image: any) => image.id !== id,
      )
      setListData({
        ...listData,
        attachments,
      })
    } else if (type == 'all') {
      setListData({
        ...listData,
        attachments: [],
      })
    }
  }
  const _HandleAddAnswer = () => {
    const newAnswer = { id: Date.now(), content: '', is_correct: false }
    setListData({
      ...listData,
      answers: [...listData.answers, newAnswer],
    })
  }
  const BtnDeleteAnswer = (id: any) => {
    const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure()

    const _HandleCheckDelete = (id: any) => {
      const itemToDelete = listData?.answers.find((e: any) => e.id === id.id)

      if (itemToDelete) {
        const { content, is_correct } = itemToDelete

        if (content !== '' || is_correct) {
          onOpen()
        } else {
          const answers = listData?.answers.filter((e: any) => e.id !== id.id)
          setListData({ ...listData, answers })
        }
      }
    }
    return (
      <>
        <Button
          onClick={_HandleCheckDelete.bind(this, id)}
          isDisabled={listData?.answers.length > 2 ? false : true}
          className="text-red-500 bg-red-100 rounded-full ml-3"
          isIconOnly
          size="md"
        >
          <Trash variant="Bulk" />
        </Button>
        <DefaultModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onConfirm={_HandleActionAnswer.bind(this, 'delete', id)}
          btnCloseContent="Trở về"
          modalTitle={'Hủy câu trả lời'}
          modalBody={
            <p className="py-3">
              Bạn có chắc là muốn hủy câu trả lời chứ? Câu trả lời sẽ không thể
              khôi phục một khi đã hủy!
            </p>
          }
        />
      </>
    )
  }

  const _HandleActionAnswer = (
    type: string,
    id: any,
    typeChange?: any,
    value?: any,
  ) => {
    if (type == 'delete') {
      const answers = listData?.answers.filter((e: any) => e.id !== id.id)

      setListData({ ...listData, answers })
    } else if (type == 'change') {
      const answers = listData?.answers.map((e: any) => {
        if (e.id == id) {
          if (typeChange == 'content') {
            return { ...e, content: value.target.value }
          } else if (typeChange == 'answer') {
            return { ...e, is_correct: !e.is_correct }
          }
        }
        return e
      })
      setListData({ ...listData, answers })
    }
  }

  const _HandleChangeValue = (type: any, value?: any) => {
    if (type === 'uploadFile') {
      const newFiles = Array.from(value.target.files) as File[]

      if (newFiles.length > 0) {
        const attachments = newFiles.map(file => ({
          id: uuidv4(),
          file: URL.createObjectURL(file),
          // thumb: file,
        }))

        setListData((prevData: any) => ({
          ...prevData,
          attachments: [...prevData.attachments, ...attachments],
        }))
      }

      if (inputUpload.current) {
        inputUpload.current.value = ''
      }
    } else {
      setListData({ ...listData, [type]: value?.target.value })
    }
  }

  const _HandleSubmit = () => {
    if (
      listData.question == '' ||
      listData.time == 0 ||
      listData.point == 0 ||
      !checkConditionAnswer
    ) {
      listData.question == '' && sErrorQuestionContent(true)
      listData.time == 0 && sErrorQuestionTime(true)
      listData.point == 0 && sErrorQuestionPoint(true)
      !checkConditionAnswer && sErrorAnswer(true)
      ToastComponent({
        message: 'Vui lòng nhập đầy đủ thông tin',
        type: 'error',
      })
    } else {
      sErrorQuestionContent(false)
      sErrorQuestionTime(false)
      sErrorQuestionPoint(false)
      sErrorAnswer(false)
      ToastComponent({
        message: 'Sửa câu hỏi thành công',
        type: 'success',
      })
      onClose()
    }
  }
  return (
    <>
      <ModalBody className="max-h-[60vh] py-0">
        <form onSubmit={_HandleSubmit.bind(this)} className="">
          <h5 className="text-xl mt-1 13inch:text-2xl font-bold mb-4">
            Tạo mới câu hỏi
          </h5>
          <div className="bg-white rounded-2xl space-y-8 pb-28">
            <div className="space-y-2">
              <div>
                <label className="text-sm 13inch:text-base font-semibold">
                  Nội dung câu hỏi <span className="text-red-500">*</span>
                </label>
                <Textarea
                  minRows={1}
                  value={listData.question}
                  size="md"
                  onChange={_HandleChangeValue.bind(this, 'question')}
                  placeholder="Nhập câu hỏi..."
                  validationState={
                    errorQuestionContent && listData.question == ''
                      ? 'invalid'
                      : 'valid'
                  }
                  errorMessage={
                    <span
                      className={`${
                        errorQuestionContent && listData.question == ''
                          ? 'visible'
                          : 'invisible'
                      } transition`}
                    >
                      Nhập nội dung câu hỏi
                    </span>
                  }
                  variant="bordered"
                  className="text-xs 13inch:text-sm"
                  classNames={{
                    label: 'text-sm 13inch:text-base font-semibold mb-2',
                    inputWrapper: 'py-1 px-4',
                    input: 'placeholder:text-base-drak-gray',
                  }}
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm 13inch:text-base font-semibold">
                    Đính kèm Video/Hình ảnh/PDF
                    <span className="text-xs 13inch:text-sm opacity-30 font-[400] ml-1">
                      (Tùy chọn)
                    </span>
                  </label>
                  <input
                    onChange={_HandleChangeValue.bind(this, 'uploadFile')}
                    type="file"
                    ref={inputUpload}
                    accept="image/png, image/jpeg, image/gif"
                    hidden
                    multiple
                    id="upload"
                  />
                  <div className="flex gap-3">
                    <label
                      htmlFor="upload"
                      className="w-fit rounded-xl bg-[#cce2fc] text-[#0c77f1] px-3.5 py-2 flex gap-2 text-xs 13inch:text-sm items-center cursor-pointer"
                    >
                      <DocumentUploadIcon variant="Bulk" />
                      <span>Tải lên</span>
                    </label>
                    {listData?.attachments.length > 0 && (
                      <Button
                        onClick={_HandleDeleteFile.bind(this, 'all')}
                        variant="flat"
                        color="danger"
                        startContent={<Trash variant="Bulk" />}
                        className="w-fit text-xs 13inch:text-sm"
                      >
                        Xóa tất cả
                      </Button>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 overflow-x-auto scroll-smooth pb-1">
                  {listData?.attachments.map((e: any) => (
                    <div
                      key={e.id}
                      className="relative min-w-fit h-fit group overflow-hidden rounded-md"
                    >
                      <Image
                        width={160}
                        height={160}
                        src={e.file}
                        alt={`Uploaded ${e.id}`}
                        className="min-w-[160px] h-40 object-cover"
                      />
                      <div className="h-0 w-0 transition bg-black/10 backdrop-blur-md absolute top-0 group-hover:h-full group-hover:w-full" />
                      <div className="absolute right-1.5 top-1.5 group-hover:block hidden">
                        <Button
                          onClick={_HandleDeleteFile.bind(this, 'item', e.id)}
                          isIconOnly
                          className="text-red-500 bg-red-100 drop-shadow-xl rounded-full"
                        >
                          <Trash variant="Bulk" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm 13inch:text-base font-semibold">
                  Câu trả lời <span className="text-red-500">*</span>
                </label>
                <Button
                  className="text-xs 13inch:text-sm"
                  variant="flat"
                  color="primary"
                  startContent={<AddIcon size={20} />}
                  onClick={_HandleAddAnswer}
                >
                  Thêm câu trả lời
                </Button>
              </div>
              <div className="space-y-1.5">
                {listData?.answers.map((e: any, i: any) => (
                  <div key={e.id} className="flex items-center">
                    <Checkbox
                      value={e.id}
                      isSelected={e.is_correct}
                      onValueChange={_HandleActionAnswer.bind(
                        this,
                        'change',
                        e.id,
                        'answer',
                      )}
                      radius="full"
                      icon={<CircleIcon variant="Bold" color="#fff" />}
                      className="relative z-[1] text-xs 13inch:text-sm"
                    >
                      <span
                        className={`${
                          e.is_correct
                            ? 'bg-primary-blue text-white'
                            : 'bg-base-gray'
                        } transition-background h-9 w-9 rounded-full font-medium text-xs 13inch:text-sm flex flex-col items-center justify-center ml-10`}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                    </Checkbox>
                    <Textarea
                      value={e.answer}
                      onChange={_HandleActionAnswer.bind(
                        this,
                        'change',
                        e.id,
                        'answer',
                      )}
                      minRows={1}
                      placeholder="Nhập câu trả lời ..."
                      variant="bordered"
                      className="text-xs 13inch:text-sm w-full -ml-12"
                      classNames={{
                        inputWrapper: 'py-2 px-4 pl-14',
                        input:
                          'placeholder:text-base-drak-gray text-xs 13inch:text-sm',
                        label: 'p-0',
                      }}
                    />
                    <BtnDeleteAnswer id={e.id} />
                  </div>
                ))}
              </div>
              <span
                className={`${
                  errorAnswer && !checkConditionAnswer ? 'visible' : 'invisible'
                } text-[13px] text-red-500`}
              >
                Vui lòng nhập câu trả lời và chọn đáp án
              </span>
            </div>
            <div className="space-y-2">
              <label className="text-sm 13inch:text-base font-semibold">
                Thời gian cho câu hỏi <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                defaultValue={'khang'}
                onChange={_HandleChangeValue.bind(this, 'time')}
                variant="bordered"
                placeholder="Nhập số giây"
                validationState={
                  errorQuestionTime && listData.time == 0 ? 'invalid' : 'valid'
                }
                errorMessage={
                  <span
                    className={`${
                      errorQuestionTime && listData.time == 0
                        ? 'visible'
                        : 'invisible'
                    } transition`}
                  >
                    Nhập thời gian câu hỏi
                  </span>
                }
                endContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">Giây</span>
                  </div>
                }
                classNames={{
                  inputWrapper: 'h-12 px-4',
                  input: 'placeholder:text-base-drak-gray',
                }}
                className="w-96"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm 13inch:text-base font-semibold">
                Điểm cho câu hỏi <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                value={
                  listData?.point !== undefined
                    ? listData?.point.toString()
                    : undefined
                }
                onChange={_HandleChangeValue.bind(this, 'point')}
                variant="bordered"
                placeholder="Nhập số điểm"
                validationState={
                  errorQuestionPoint && listData?.point == 0
                    ? 'invalid'
                    : 'valid'
                }
                errorMessage={
                  <span
                    className={`${
                      errorQuestionPoint && listData?.point == 0
                        ? 'visible'
                        : 'invisible'
                    } transition`}
                  >
                    Nhập điểm câu hỏi
                  </span>
                }
                endContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">Điểm</span>
                  </div>
                }
                classNames={{
                  inputWrapper: 'h-12 px-4',
                  input: 'placeholder:text-base-drak-gray',
                }}
                className="w-96"
              />
            </div>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <div className="flex gap-5">
          <Button
            className="border-primary-blue text-primary-blue font-semibold min-w-[120px] py-5 text-base"
            variant="bordered"
            onPress={onClose}
          >
            Hủy
          </Button>
          <Button
            className="bg-primary-blue text-white font-semibold min-w-[120px] py-5 text-base"
            onPress={_HandleSubmit.bind(this)}
          >
            Xác nhận
          </Button>
        </div>
      </ModalFooter>
    </>
  )
}

const QuestionTab = ({ listQuestionFromApi }: { listQuestionFromApi: any }) => {
  const columns = [
    { id: 'question', name: 'Câu hỏi', sortable: true },
    { id: 'career', name: 'Nghề nghiệp', sortable: true },
    { id: 'point', name: 'Điểm', sortable: true },
    { id: 'time', name: 'Thòi gian', sortable: true },
    { id: 'type', name: 'Dạng câu hỏi', sortable: true },
    { id: 'action', name: 'Hành động' },
    { id: 'user', name: 'User', sortable: true },
  ]

  const renderCell = (
    dataItem: (typeof listQuestionFromApi)[number],
    columnKey: React.Key,
  ) => {
    const cellValue = dataItem[columnKey as keyof typeof dataItem]

    switch (columnKey) {
      case 'action':
        return (
          <div>
            <p className="text-xs 13inch:text-sm">{cellValue}</p>
            <span className="text-base-drak-gray text-xs 13inch:text-sm">
              {dataItem.timeAction}
            </span>
          </div>
        )
      case 'question':
        return <p className="w-60">{cellValue}</p>
      default:
        return <div className="text-xs 13inch:text-sm">{cellValue}</div>
    }
  }

  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure()
  const [select, setSelect] = useState<boolean>(false)

  const [listSelected, setListSelected] = useState([])

  const [detailQuestion, setDetailQuestion] = useState({})

  const handleCallApiDetailQuestion = async (id: number) => {
    const respone = await instance.get(`/input-testing/questions/${id}`)
    setDetailQuestion(respone.data)
  }
  const _HandleClickDetail = async (id: number) => {
    await handleCallApiDetailQuestion(id)
    onOpen()
  }

  return (
    <div>
      <div className="flex justify-between mt-1 mb-2">
        <SelectButton
          listSelected={listSelected}
          select={select}
          setSelect={setSelect}
        />
        <div className="flex gap-4">
          <Input
            className="bg-transparent border-[1px] border-base-gray-2 rounded-2xl overflow-hidden"
            placeholder="Tìm kiếm"
            size="md"
            startContent={
              <SearchIcon className={'text-base-drak-gray text-xl'} />
            }
            type="text"
          />
          <Button
            size="md"
            startContent={<Filter size="20" className="flex flex-shrink-0" />}
            className="rounded-[16px] px-8 text-base-drak-gray bg-transparent text-xs 13inch:text-sm border-[2px] border-base-gray-2"
          >
            Bộ lọc
          </Button>
          {/* <Link
            href="/question-management/form"
            className="rounded-[16px] px-[19px] text-white bg-primary-blue text-xs 13inch:text-sm flex items-center gap-2 min-w-fit"
          >
            <Add size="20" color="#fff" />
            Tạo mới
          </Link> */}
          <CreateNew />
        </div>
      </div>
      <TableComponent
        columns={columns}
        initialData={listQuestionFromApi}
        rowsPerPage={10}
        renderCell={renderCell}
        onRowAction={_HandleClickDetail}
        multiSelectTable={select ? 'multiple' : 'single'}
        handleSelected={setListSelected}
      />
      <DefaultModal
        modalTitle="Chi tiết câu hỏi"
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        onConfirm={() => {}}
        propsModal={{
          size: '3xl',
        }}
        customBody={
          <QuestionInfo onClose={onClose} detailQuestion={detailQuestion} />
        }
      />
    </div>
  )
}

export default Page

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Head>
        <title>Quản lí câu hỏi</title>
      </Head>
      <>{page}</>
    </Layout>
  )
}

const CreateNew = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const router = useRouter()

  return (
    <>
      <Button
        onPress={onOpen}
        size="md"
        className="rounded-[16px] px-4 13inch:px-[19px] text-white bg-primary-blue text-xs 13inch:text-sm flex items-center gap-2"
      >
        <Add size="24" color="#fff" />
        Tạo mới
      </Button>
      <DefaultModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        modalTitle={'Tạo mới câu hỏi'}
        propsModal={{
          size: '3xl',
        }}
        modalBody={
          <div className="pb-6">
            <p className="text-base-black-1 text-sm py-6">
              Vui lòng chọn 1 trong 2 cách bên dưới để tạo câu hỏi!
            </p>
            <div className="flex gap-6">
              <div className="flex relative flex-col h-[200px] text-[#3748A0]  items-center justify-center w-full border-[1px] border-base-gray-2 rounded-2xl">
                <input
                  type="file"
                  className="w-full h-[200px] opacity-0 absolute top-0 left-0 ring-0 bottom-0 cursor-pointer"
                />
                <span className="">
                  <ExportIcon />
                </span>
                <p className="text-[#3748A0]">Tải lên file Excel</p>
              </div>
              <div
                onClick={() => router.push('/question-management/form')}
                className="flex flex-col h-[200px] text-[#3748A0] cursor-pointer items-center justify-center w-full border-[1px] border-base-gray-2 rounded-2xl"
              >
                <span className="">
                  <Add size={24} color="#3748A0" />
                </span>
                <p className="text-[#3748A0]">Tạo thủ công từng câu</p>
              </div>
            </div>
          </div>
        }
      />
    </>
  )
}
