import React, { useEffect, ReactElement, useState, useRef, RefObject } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import { useDispatch } from 'react-redux'

import { objectToFormData, generatePdfThumbnail, generateVideoThumbnail } from '@/utils'
import { NextPageWithLayout } from '@/pages/_app'
import instance from '@/services/axiosConfig'
import { breadcrumbAction } from '@/store/slices/loggedSlice/breadcrumbSlice'

import { Layout } from '@/components'
import DefaultModal from '@/components/modal'
import { ToastComponent } from '@/components/Toast'

import { Button, Checkbox, Input, Textarea, useDisclosure, Modal, ModalContent } from '@nextui-org/react'
import { 
  RecordCircle as CircleIcon, Trash as TrashIcon, Add as AddIcon,
  DocumentUpload as DocumentUploadIcon, Edit as EditIcon, Video as VideoIcon,
  Image as ImageIcon, DocumentText as DocumentIcon
} from 'iconsax-react'
import { v4 as uuidv4 } from 'uuid'

const Page: NextPageWithLayout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      breadcrumbAction.updateBreadcrumb([
        { title: 'Trang chủ', url: '/' },
        { title: 'Quản lí câu hỏi', url: '/question-management' },
        { title: 'Tạo mới'},
      ]),
    )
  }, [])
  const router = useRouter()

  const inputUpload: RefObject<HTMLInputElement> = useRef(null)

  const optionsQuestion = [0, 1]
  const [selectedQuestionOptions, setSelectedQuestionOptions] = useState<string>('')

  const [questionContent, setQuestionContent] = useState<string>('')
  const [questionTime, setQuestionTime] = useState<number>(0)
  const [questionPoint, setQuestionPoint] = useState<number>(0)
  const [questionJob, setQuestionJob] = useState<string>('')
  const [listFile, setListFile] = useState<{ id: string; file: File | null; thumb: any | null, name: string, type: string }[]>([])
  const [answerList, setAnswerList] = useState<
    { id: any; content: string; checked: boolean }[]
  >([
    { id: 'answer-1', content: '', checked: false },
    { id: 'answer-2', content: '', checked: false },
  ])

  const questionConfig: any = {
    0: 'Quy tắc ứng xử',
    1: 'Nghiệp vụ',
  }
  const [errorQuestionContent, setErrorQuestionContent] = useState<boolean>(false)
  const [errorQuestionTime, setErrorQuestionTime] = useState<boolean>(false)
  const [errorQuestionPoint, setErrorQuestionPoint] = useState<boolean>(false)
  const [errorAnswer, setErrorAnswer] = useState<boolean>(false)
  const [errorQuestionJob, setErrorQuestionjob] = useState<boolean>(false)
  const [errorQuestionType, setErrorQuestionType] = useState<boolean>(false)

  const _HandleAddAnswer = () => {
    const newAnswer = { id: Date.now(), content: '', checked: false }
    setAnswerList([...answerList, newAnswer])
  }

  const _HandleActionAnswer = ( type: string, id: any, typeChange?: any, value?: any ) => {
    if (type == 'delete') {
      const newList = answerList.filter(e => e.id !== id.id)
      setAnswerList(newList)
    } else if (type == 'change') {
      const newList = answerList.map(e => {
        if (e.id == id) {
          if (typeChange == 'content') {
            return { ...e, content: value.target.value }
          } else if (typeChange == 'answer') {
            return { ...e, checked: !e.checked }
          }
        }
        return e
      })
      setAnswerList(newList)
    }
  }

  const _HandleChangeValue = async (type: string, value?: any) => {
    if (type == 'questionContent') {
      setQuestionContent(value.target.value)
    } else if (type == 'questionJob') {
      setQuestionJob(value.target.value)
    } else if (type == 'questionTime') {
      setQuestionTime(Number(value.target.value))
    } else if (type == 'questionPoint') {
      setQuestionPoint(Number(value.target.value))
    } else if (type == 'uploadFile' && value?.target) {
      const newFiles = Array.from(value.target.files) as File[]
      const newData = await Promise.all(newFiles.map(async (file) => {
        const url = URL.createObjectURL(file);
        let thumbnail;
        if (file.type.startsWith('image')) {
          thumbnail = url;
        } else if (file.type.startsWith('video')) {
          thumbnail = await generateVideoThumbnail(file);
        } else if (file.type.startsWith('application/pdf')) {
          thumbnail = await generatePdfThumbnail(file);
        }
        return {
          id: uuidv4(),
          file: file,
          thumb: thumbnail,
          name: file.name,
          type: file.type
        };
      }));
      setListFile(prevListFile => [...prevListFile, ...newData]);

      if (inputUpload.current) {
        inputUpload.current.value = ''
      }
    }
  }

  const _HandleDeleteFile = (type: string, id?: any) => {
    if (type == 'item') {
      const newData = listFile.filter(image => image.id !== id)
      setListFile(newData)
    } else if (type == 'all') {
      setListFile([])
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
          setAnswerList(newList)
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
  const checkConditionAnswer =
    answerList.filter(answer => answer.content !== '').length >= 2 &&
    answerList.filter(answer => answer.checked).length >= 1

  const handleCancel = () => {
    if ( !!questionContent.length || !!(questionTime !== 0) || !!(questionPoint !== 0) || !!checkConditionAnswer ) {
      return false
    } else {
      return true
    }
  }

  const [onSending, setOnSending] = useState<boolean>(false)

  const _ServerSending = () => {
    const payload = {
      data: [
        {
          question: questionContent,
          answers: answerList.map(a => ({
            answer: a.content,
            is_correct: a.checked,
          })),
          time: questionTime,
          point: questionPoint,
          services: [1],
          type: selectedQuestionOptions,
          attachments: listFile.map(e => e.file) 
        },

      ],
    }

    const data = objectToFormData(payload)
    instance.post('/input-testing/questions', data)

    setErrorQuestionContent(false)
    setErrorQuestionTime(false)
    setErrorQuestionPoint(false)
    setErrorQuestionPoint(false)
    setErrorAnswer(false)
    setErrorQuestionjob(false)
    setErrorQuestionjob(false)
    ToastComponent({
      message: 'Tạo câu hỏi thành công',
      type: 'success',
    })
    router.push('/question-management')
  }

  useEffect(() => {
    onSending && _ServerSending()
  }, [onSending])


  const _HandleSubmit = (e: any) => {
    e.preventDefault()

    if (questionContent == '' || questionJob == '' || selectedQuestionOptions == '' || questionTime == 0 || questionPoint == 0 || !checkConditionAnswer) {
      questionContent == '' && setErrorQuestionContent(true)
      questionJob == '' && setErrorQuestionjob(true)
      selectedQuestionOptions == '' && setErrorQuestionType(true)
      questionTime == 0 && setErrorQuestionTime(true)
      questionPoint == 0 && setErrorQuestionPoint(true)
      !checkConditionAnswer && setErrorAnswer(true)
      ToastComponent({
        message: 'Vui lòng nhập đầy đủ thông tin',
        type: 'error',
      })
      setOnSending(false)
    } else {
      // setOnSending(true)
      const payload = {
        data: [
          {
            question: questionContent,
            answers: answerList.map(a => ({
              answer: a.content,
              is_correct: a.checked,
            })),
            time: questionTime,
            point: questionPoint,
            services: [1],
            type: selectedQuestionOptions,
            attachments: listFile.map(e => e.file) 
          },
  
        ],
      }
      console.log(payload)
    }
  }

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>();
  const [pdfLoaded, setPdfLoaded] = useState(false);

  const onDocumentLoadSuccess = ({ numPages } : {numPages: number}) => {
    setPageNumber(1);
    setPdfLoaded(true);
  };

  const [file, setFile] = useState<any | null>(null)
  const _HandleChangeFile = (e: any) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type === 'application/pdf') {
      const fileUrl = URL.createObjectURL(selectedFile);
      setFile(fileUrl);
    } else {
      alert('Vui lòng chọn một tệp PDF.');
    }
  }

  return (
    <form onSubmit={_HandleSubmit.bind(this)} className="relative w-full">
      <h5 className="text-2xl font-bold mb-4">Tạo mới câu hỏi</h5>
      <div className="p-8 bg-white rounded-2xl space-y-8 pb-28">
        <div className="space-y-2">
          <label className="text-base font-[600]">
            Ngành nghề <span className="text-red-500">*</span>
          </label>
          <Textarea
            minRows={1}
            value={questionJob}
            onChange={_HandleChangeValue.bind(this, 'questionJob')}
            placeholder="Nhập câu hỏi..."
            validationState={
              errorQuestionJob && questionJob == '' ? 'invalid' : 'valid'
            }
            errorMessage={
              <span
                className={`${errorQuestionJob && questionJob == ''
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
        <div className="space-y-2 flex gap-2 flex-col">
          <label className="text-base font-[600]">
            Loại câu hỏi <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2 items-center">
            {optionsQuestion.map(e => (
              <div key={e}>
                <input
                  type="radio"
                  id={e.toString()}
                  value={e}
                  name="gender"
                  checked={selectedQuestionOptions.includes(e.toString())}
                  onChange={() => setSelectedQuestionOptions(e.toString())}
                  hidden
                />
                <label
                  htmlFor={e.toString()}
                  className={`${selectedQuestionOptions.includes(e.toString())
                    ? 'bg-primary-blue/70 text-white'
                    : 'bg-base-gray'
                    } transition ease-in-out select-none px-4 py-2 rounded-full flex flex-col justify-center items-center cursor-pointer`}
                // style={{ borderColor: `${selectedQuestionOptions.includes(e) ? '#246BFD' : 'transparent'}` }}
                >
                  <span>{questionConfig[e.toString()]}</span>
                </label>
              </div>
            ))}
          </div>
          <span className={`${errorAnswer && !checkConditionAnswer ? 'visible' : 'invisible'} text-[13px] text-red-500`}>Vui lòng chọn loại câu hỏi</span>
        </div>
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
                  className={`${errorQuestionContent && questionContent == ''
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
          <div className="flex flex-col gap-2">
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
                accept="image/* , video/*, application/pdf"
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
                  >Xóa tất cả</Button>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4 overflow-x-auto scroll-smooth pb-1">
              {listFile.map(e => (
                <div key={e.id} className='w-40 bg-gray-50 rounded-md shadow group'>
                  <div className="relative aspect-square h-fit overflow-hidden rounded-md">
                    <Image
                      width={160}
                      height={160}
                      src={e.thumb}
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
                  <div className='flex gap-2 items-center p-2'>
                    {e.type?.includes('image') && <ImageIcon size={18} />}
                    {e.type?.includes('video') && <VideoIcon size={18} />}
                    {e.type?.includes('pdf') && <DocumentIcon size={18} />}
                    <p className='w-full truncate text-sm'>{e.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-2">
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
                    className={`${e.checked ? 'bg-primary-blue text-white' : 'bg-base-gray'
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
            className={`${errorAnswer && !checkConditionAnswer ? 'visible' : 'invisible'
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
                className={`${errorQuestionTime && questionTime == 0
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
                className={`${errorQuestionPoint && questionPoint == 0
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
      <footer className="fixed w-full z-[1] bottom-0 right-0 left-0 py-4 px-12  bg-white flex gap-6 items-center justify-end shadow-[0px_-4px_16px_0px_rgba(0,0,0,0.08)]">
        <CancelComponent handleCancel={handleCancel} />
        <Button size="lg" className="rounded-[16px] px-[33px] text-white bg-primary-blue text-sm font-semibold" type="submit">
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

const CancelComponent = ({ handleCancel }: { handleCancel: any }) => {
  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure()
  const router = useRouter()
  const submitDelete = () => {
    router.push('/question-management')
  }
  const handleCheckCancel = () => {
    handleCancel() ? router.push('/question-management') : onOpen()
  }
  return (
    <>
      <Button
        onPress={handleCheckCancel}
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

export default Page
