import React, {
  useEffect,
  ReactElement,
  useState,
  useRef,
  RefObject,
} from 'react'
import Head from 'next/head'
import { useDispatch } from 'react-redux'
import Image from 'next/image'

import { Layout } from '@/components'
import { NextPageWithLayout } from '@/pages/_app'
import { breadcrumbAction } from '@/store/slices/loggedSlice/breadcrumbSlice'
import DefaultModal from '@/components/modal'
import { ToastComponent } from '@/components/Toast'

import {
  Button,
  Checkbox,
  Input,
  Textarea,
  useDisclosure,
} from '@nextui-org/react'
import {
  RecordCircle as CircleIcon,
  Trash as TrashIcon,
  Add as AddIcon,
  DocumentUpload as DocumentUploadIcon,
  Edit as EditIcon,
} from 'iconsax-react'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/router'

const Page: NextPageWithLayout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      breadcrumbAction.updateBreadcrumb([
        'Trang chủ',
        'Quản lí câu hỏi',
        'Tạo mới',
      ]),
    )
  }, [])
  // const inputUpload = useRef();
  const inputUpload: RefObject<HTMLInputElement> = useRef(null)

  const [questionContent, sQuestionContent] = useState<string>('')
  const [questionTime, sQuestionTime] = useState<number>(0)
  const [questionPoint, sQuestionPoint] = useState<number>(0)
  const [listFile, sListFile] = useState<
    { id: string; file: string; thumb: File | null }[]
  >([])
  const [answerList, sAnswerList] = useState<
    { id: any; content: string; checked: boolean }[]
  >([
    { id: 'answer-1', content: '', checked: false },
    { id: 'answer-2', content: '', checked: false },
  ])

  const [errorQuestionContent, sErrorQuestionContent] = useState<boolean>(false)
  const [errorQuestionTime, sErrorQuestionTime] = useState<boolean>(false)
  const [errorQuestionPoint, sErrorQuestionPoint] = useState<boolean>(false)
  const [errorAnswer, sErrorAnswer] = useState<boolean>(false)

  const _HandleAddAnswer = () => {
    const newAnswer = { id: Date.now(), content: '', checked: false }
    sAnswerList([...answerList, newAnswer])
  }

  const _HandleActionAnswer = (
    type: string,
    id: any,
    typeChange?: any,
    value?: any,
  ) => {
    if (type == 'delete') {
      const newList = answerList.filter(e => e.id !== id.id)
      sAnswerList(newList)
    } else if (type == 'change') {
      const newList = answerList.map(e => {
        if (e.id == id) {
          if (typeChange == 'content') {
            console.log(value)
            return { ...e, content: value.target.value }
          } else if (typeChange == 'answer') {
            return { ...e, checked: !e.checked }
          }
        }
        return e
      })
      sAnswerList(newList)
    }
  }

  const _HandleChangeValue = (type: string, value?: any) => {
    if (type == 'questionContent') {
      sQuestionContent(value.target.value)
    } else if (type == 'questionTime') {
      sQuestionTime(Number(value.target.value))
    } else if (type == 'questionPoint') {
      sQuestionPoint(Number(value.target.value))
    } else if (type == 'uploadFile' && value?.target) {
      const newFiles = Array.from(value.target.files) as File[]
      console.log(newFiles)

      if (newFiles.length > 0) {
        const newData = newFiles.map(file => ({
          id: uuidv4(),
          file: URL.createObjectURL(file),
          thumb: file,
        }))


        sListFile(prevListFile => [...prevListFile, ...newData])
      }

      if (inputUpload.current) {
        inputUpload.current.value = ''
      }
    }
  }

  const _HandleDeleteFile = (type: string, id?: any) => {
    if (type == 'item') {
      const newData = listFile.filter(image => image.id !== id)
      sListFile(newData)
    } else if (type == 'all') {
      sListFile([])
    }
  }

  const BtnDeleteAnswer = (id: any) => {
    const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure()

    const _HandleCheckDelete = (id: any) => {
      const itemToDelete = answerList.find(e => e.id === id.id)

      if (itemToDelete) {
        const { content, checked } = itemToDelete

        if (content !== '' || checked) {
          onOpen()
        } else {
          const newList = answerList.filter(e => e.id !== id.id)
          sAnswerList(newList)
        }
      }
    }
    return (
      <>
        <Button
          onClick={_HandleCheckDelete.bind(this, id)}
          isDisabled={answerList.length > 2 ? false : true}
          className="text-red-500 bg-red-100 rounded-full ml-3"
          isIconOnly
        >
          <TrashIcon variant="Bulk" />
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
  const router = useRouter()
  const checkConditionAnswer =
    answerList.filter(answer => answer.content !== '').length >= 2 &&
    answerList.filter(answer => answer.checked).length >= 1

  const handleCancle = () => {
    if (
      !!questionContent.length ||
      !!(questionTime !== 0) ||
      !!(questionPoint !== 0) ||
      !!checkConditionAnswer
    ) {
      return false
    } else {
      return true
    }
  }

  const _HandleSubmit = (e: any) => {
    e.preventDefault()

    if (
      questionContent == '' ||
      questionTime == 0 ||
      questionPoint == 0 ||
      !checkConditionAnswer
    ) {
      console.log('error')
      questionContent == '' && sErrorQuestionContent(true)
      questionTime == 0 && sErrorQuestionTime(true)
      questionPoint == 0 && sErrorQuestionPoint(true)
      !checkConditionAnswer && sErrorAnswer(true)
      ToastComponent({
        message: 'Vui lòng nhập đầy đủ thông tin',
        type: 'error',
      })
    } else {
      console.log('success')

      console.log({
        questionContent,
        listFile,
        answerList,
        questionTime,
        questionPoint,
      })

      sErrorQuestionContent(false)
      sErrorQuestionTime(false)
      sErrorQuestionPoint(false)
      sErrorAnswer(false)
      ToastComponent({
        message: 'Tạo câu hỏi thành công',
        type: 'success',
      })
      router.push('/question-management')
    }
  }

  return (
    <form onSubmit={_HandleSubmit.bind(this)} className="">
      <h5 className="text-2xl font-bold mb-4">Tạo mới câu hỏi</h5>
      <div className="p-8 bg-white rounded-2xl space-y-8 pb-28">
        <div className="space-y-2">
          <div>
            <label className="text-base font-[600]">
              Nội dung câu hỏi <span className="text-red-500">*</span>
            </label>
            <Textarea
              minRows={1}
              value={questionContent}
              onChange={_HandleChangeValue.bind(this, 'questionContent')}
              placeholder="Nhập câu hỏi..."
              validationState={
                errorQuestionContent && questionContent == ''
                  ? 'invalid'
                  : 'valid'
              }
              errorMessage={
                <span
                  className={`${
                    errorQuestionContent && questionContent == ''
                      ? 'visible'
                      : 'invisible'
                  } transition`}
                >
                  Nhập nội dung câu hỏi
                </span>
              }
              variant="bordered"
              className="text-sm"
              classNames={{
                label: 'text-base font-[600] mb-2',
                inputWrapper: 'py-1 px-4',
                input: 'placeholder:text-base-drak-gray',
              }}
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <label className="text-base font-[600]">
                Đính kèm Video/Hình ảnh/PDF{' '}
                <span className="text-sm opacity-30 font-[400]">
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
                  className="w-fit rounded-xl bg-[#cce2fc] text-[#0c77f1] px-3.5 py-2 flex gap-2 text-sm items-center cursor-pointer"
                >
                  <DocumentUploadIcon variant="Bulk" />
                  <span>Tải lên</span>
                </label>
                {listFile.length > 0 && (
                  <Button
                    onClick={_HandleDeleteFile.bind(this, 'all')}
                    variant="flat"
                    color="danger"
                    startContent={<TrashIcon variant="Bulk" />}
                    className="w-fit"
                  >
                    Xóa tất cả
                  </Button>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4 overflow-x-auto scroll-smooth pb-1">
              {listFile.map(e => (
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
                      <TrashIcon variant="Bulk" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-base font-[600]">
              Câu trả lời <span className="text-red-500">*</span>
            </label>
            <Button
              variant="flat"
              color="primary"
              startContent={<AddIcon />}
              onClick={_HandleAddAnswer}
            >
              Thêm câu trả lời
            </Button>
          </div>
          <div className="space-y-1.5">
            {answerList.map((e, i) => (
              <div key={e.id} className="flex items-center">
                <Checkbox
                  value={e.id}
                  isSelected={e.checked}
                  onValueChange={_HandleActionAnswer.bind(
                    this,
                    'change',
                    e.id,
                    'answer',
                  )}
                  radius="full"
                  icon={<CircleIcon variant="Bold" color="#fff" />}
                  className="relative z-[1]"
                >
                  <span
                    className={`${
                      e.checked ? 'bg-primary-blue text-white' : 'bg-base-gray'
                    } transition-background h-9 w-9 rounded-full font-medium flex flex-col items-center justify-center ml-10`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                </Checkbox>
                <Textarea
                  value={e.content}
                  onChange={_HandleActionAnswer.bind(
                    this,
                    'change',
                    e.id,
                    'content',
                  )}
                  minRows={1}
                  placeholder="Nhập câu trả lời ..."
                  variant="bordered"
                  className="text-sm w-full -ml-12"
                  classNames={{
                    inputWrapper: 'py-2 px-4 pl-14',
                    input: 'placeholder:text-base-drak-gray',
                    label: 'p-0',
                  }}
                />
                <BtnDeleteAnswer id={e.id} />
                {/* <Button onClick={_HandleActionAnswer.bind(this, 'delete', e.id)} isDisabled={answerList.length > 2 ? false : true} className='text-red-500 bg-red-100 rounded-full' isIconOnly ><TrashIcon /></Button> */}
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
          <label className="text-base font-[600]">
            Thời gian cho câu hỏi <span className="text-red-500">*</span>
          </label>
          <Input
            type="number"
            value={
              questionTime !== undefined ? questionTime.toString() : undefined
            }
            onChange={_HandleChangeValue.bind(this, 'questionTime')}
            variant="bordered"
            placeholder="Nhập số giây"
            validationState={
              errorQuestionTime && questionTime == 0 ? 'invalid' : 'valid'
            }
            errorMessage={
              <span
                className={`${
                  errorQuestionTime && questionTime == 0
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
          <label className="text-base font-[600]">
            Điểm cho câu hỏi <span className="text-red-500">*</span>
          </label>
          <Input
            type="number"
            value={
              questionPoint !== undefined ? questionPoint.toString() : undefined
            }
            onChange={_HandleChangeValue.bind(this, 'questionPoint')}
            variant="bordered"
            placeholder="Nhập số điểm"
            validationState={
              errorQuestionPoint && questionPoint == 0 ? 'invalid' : 'valid'
            }
            errorMessage={
              <span
                className={`${
                  errorQuestionPoint && questionPoint == 0
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
      <footer className="fixed bottom-0 right-0 left-0 py-4 px-12 z-10 bg-white flex gap-6 items-center justify-end shadow-[0px_-4px_16px_0px_rgba(0,0,0,0.08)]">
        <CancelComponent handleCancle={handleCancle} />
        <Button
          size="lg"
          className="rounded-[16px] px-[33px] text-white bg-primary-blue text-sm font-semibold"
          // onClick={_HandleSubmit.bind(this)}
          type="submit"
        >
          Xác nhận
        </Button>
      </footer>
    </form>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Head>
        <title>Tạo mới câu hỏi</title>
      </Head>
      <>{page}</>
    </Layout>
  )
}

export default Page

const CancelComponent = ({ handleCancle }: { handleCancle: any }) => {
  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure()
  const router = useRouter()
  const submitDelete = () => {
    router.push('/question-management')
  }
  const handleCheckCancle = () => {
    handleCancle() ? router.push('/question-management') : onOpen()
  }
  return (
    <>
      <Button
        onPress={handleCheckCancle}
        size="lg"
        className="rounded-[16px] px-12 text-primary-blue border-[2px] border-primary-blue bg-transparent text-sm font-semibold"
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
          <div className="py-2">
            Bạn có chắc là muốn hủy tạo bài test chứ? Bài test sẽ không thể khôi
            phục một khi đã hủy!
          </div>
        }
      />
    </>
  )
}