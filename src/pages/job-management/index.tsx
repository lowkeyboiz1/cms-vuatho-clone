import { ReactElement, useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { NextPageWithLayout } from '../_app'
import { breadcrumbAction } from '@/store/slices/loggedSlice/breadcrumbSlice'
import { Layout } from '@/components'
import DefaultModal from '@/components/modal'
import { ToastComponent } from '@/components/Toast'
import Pagi from '@/components/pagination'

import { Button, Input, useDisclosure } from '@nextui-org/react'
import { SearchIcon } from '@/components/icon'
import {
  Add,
  ArrowDown2,
  Briefcase,
  Edit,
  Filter,
  People,
  SearchNormal1,
  Trash,
} from 'iconsax-react'
import instance from '@/services/axiosConfig'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      breadcrumbAction.updateBreadcrumb([
        { title: 'Trang chủ', url: '/' },
        { title: 'Quản lí ngành' },
      ]),
    )
  }, [])
  const columns = [
    { id: 'job', name: 'Ngành' },
    { id: 'totalPrice', name: 'Doanh thu' },
    { id: 'totalEmployee', name: 'Số lượng thợ' },
    { id: 'totalJob', name: 'Tổng nghề' },
  ]

  const initialData = [
    {
      id: 1,
      job: 'Công nghệ thông tin',
      totalPrice: '2.500.000.000đ',
      totalEmployee: '12000 người',
      totalJob: '32 nghề',
    },
    {
      id: 2,
      job: 'Công nghệ thông tin',
      totalPrice: '2.500.000.000đ',
      totalEmployee: '12000 người',
      totalJob: '32 nghề',
    },
    {
      id: 3,
      job: 'Công nghệ thông tin',
      totalPrice: '2.500.000.000đ',
      totalEmployee: '12000 người',
      totalJob: '32 nghề',
    },
    {
      id: 4,
      job: 'Công nghệ thông tin',
      totalPrice: '2.500.000.000đ',
      totalEmployee: '12000 người',
      totalJob: '32 nghề',
    },
    {
      id: 5,
      job: 'Công nghệ thông tin',
      totalPrice: '2.500.000.000đ',
      totalEmployee: '12000 người',
      totalJob: '32 nghề',
    },
    {
      id: 6,
      job: 'Công nghệ thông tin',
      totalPrice: '2.500.000.000đ',
      totalEmployee: '12000 người',
      totalJob: '32 nghề',
    },
    {
      id: 7,
      job: 'Công nghệ thông tin',
      totalPrice: '2.500.000.000đ',
      totalEmployee: '12000 người',
      totalJob: '32 nghề',
    },
    {
      id: 8,
      job: 'Công nghệ thông tin',
      totalPrice: '2.500.000.000đ',
      totalEmployee: '12000 người',
      totalJob: '32 nghề',
    },
    {
      id: 9,
      job: 'Công nghệ thông tin',
      totalPrice: '2.500.000.000đ',
      totalEmployee: '12000 người',
      totalJob: '32 nghề',
    },
    {
      id: 10,
      job: 'Công nghệ thông tin',
      totalPrice: '2.500.000.000đ',
      totalEmployee: '12000 người',
      totalJob: '32 nghề',
    },
    {
      id: 11,
      job: 'Công nghệ thông tin',
      totalPrice: '2.500.000.000đ',
      totalEmployee: '12000 người',
      totalJob: '32 nghề',
    },
  ]
  const [page, setPage] = useState<number>(1)
  const rowsPerPage = 3
  const [industries, setIndustries] = useState([])
  const handleCallApi = async () => {
    const data = await instance.get('/industries')
    setIndustries(data.data)
  }
  useEffect(() => {
    handleCallApi()
  }, [])

  const handlePostApi = async (payload: any) => {
    const data = await instance.post('/industries', payload)
    setIndustries(data.data)
    console.log(data)
  }

  return (
    <>
      <div className="">
        <div className="flex justify-between items-end">
          <div className="flex flex-col text-base-black-1">
            <p className=" text-base">Danh sách ngành</p>
            <p className="text-lg font-semibold">32 ngành</p>
          </div>
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
              startContent={<Filter size="24" color="#282828" />}
              className="rounded-[16px] px-[19px] text-base-black-1 bg-base-gray text-sm font-semibold"
            >
              Bộ lọc
            </Button>
            <CreateNewIndustry handlePostApi={handlePostApi} />
          </div>
        </div>
        <div className="table-card my-4">
          <div className="grid grid-cols-3 gap-4 ">
            {industries.length > 0 ? (
              industries.map((item: any, index: any) => (
                <div
                  key={`table-card-${index}`}
                  className="col-span-1 p-4 border-[1px] border-base-gray-2 rounded-2xl bg-white"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-2 items-center">
                        <div className="text-sm text-[#3748A0] font-semibold">
                          {item?.name}
                        </div>
                        <div className="bg-base-gray text-base-black-1 rounded-lg p-2">
                          {item?.code}
                        </div>
                      </div>
                      <div className="text-lg text-primary-orange font-semibold">
                        2.500.000.000đ
                      </div>
                    </div>
                    <div className="bg-[#F5F8FF] aspect-square rounded-full p-3">
                      <Edit size={16} color="#3748A0" />
                    </div>
                  </div>
                  <div className="h-[1px] bg-base-gray my-4" />
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col gap-4">
                      <div className="flex gap-3 items-center ">
                        <div className="">
                          <People size={24} color="#3748A0" />
                        </div>
                        <div className="text-base text-base-black-1 font-normal">
                          12.020 thợ
                        </div>
                      </div>
                      <div className="flex gap-3 items-center">
                        <div className="">
                          <Briefcase size={24} color="#3748A0" />
                        </div>
                        <div className="text-base text-base-black-1 font-normal">
                          32 nghề
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#F5F8FF] aspect-square rounded-full p-3 -rotate-90">
                      <ArrowDown2 size={16} color="#3748A0" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>Không có dữ liệu</div>
            )}
          </div>
        </div>
        <Pagi
          page={page}
          onChange={page => setPage(page)}
          totalPage={Math.ceil(initialData.length / rowsPerPage)}
        />
      </div>
    </>

    ///industries
    ///industries/id
    //services/id
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Head>
        <title>Quản lí ngành</title>
      </Head>
      <>{page}</>
    </Layout>
  )
}

export default Page

const CreateNewIndustry = ({ handlePostApi }: { handlePostApi: any }) => {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure()

  const [job, setJob] = useState('')

  const [jobList, setJobList] = useState<any>([{ id: 'answer-1', content: '' }])
  const [errorJob, setErrorJobList] = useState(false)
  const [errorJobListContent, setErrorJobListContent] = useState(false)
  const conditionJobListContent = jobList.every(
    (j: any) => j.content.length > 0,
  )

  const handleAdd = () => {
    if (!!job.length && conditionJobListContent) {
      setErrorJobList(false)
      setErrorJobListContent(false)
      setJob('')
      setJobList([{ id: 'answer-1', content: '' }])
      onClose()
      ToastComponent({ message: 'Thêm mới Ngành thành công', type: 'success' })
      handlePostApi({
        name: job,
        code: 'VUATHO-1',
      })
    } else {
      setErrorJobListContent(true)
      setErrorJobList(true)
      ToastComponent({
        message: 'Vui lòng nhập đầy đủ thông tin',
        type: 'error',
      })
    }
  }
  const handleAddNewJob = () => {
    const newJob = { id: Date.now(), content: '' }

    setJobList([...jobList, newJob])
  }

  const handleChange = (e: any, id: any) => {
    const updatedJobList = [...jobList]

    const jobToUpdate = updatedJobList.find(job => job.id === id)

    jobToUpdate.content = e.target.value

    setJobList(updatedJobList)
    setErrorJobListContent(false)
  }

  return (
    <>
      <Button
        onPress={onOpen}
        startContent={<Add size="24" color="#fff" />}
        className="rounded-[16px] px-[19px] text-white bg-transparent text-sm bg-primary-orange font-semibold"
      >
        Tạo mới
      </Button>
      <DefaultModal
        modalTitle="Tạo mới ngành"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        styleModalTitle={'text-base-black-1'}
        onConfirm={handleAdd}
        propsModal={{
          size: '5xl',
        }}
        modalBody={
          <div className="min-h-[50vh] flex flex-col gap-2 mt-6">
            <div className="text-base-black-1">
              <div className="text-base 13inch:text-lg font-semibold mb-2">
                Nhập tên ngành <span className="text-red-500">*</span>
              </div>
              <Input
                variant="bordered"
                size="lg"
                style={{ fontSize: '14px' }}
                placeholder="Tên ngành"
                value={job}
                onChange={(e: any) => {
                  setJob(e.target.value)
                  setErrorJobList(false)
                }}
                validationState={errorJob && job == '' ? 'invalid' : 'valid'}
                errorMessage={
                  <span
                    className={`${
                      errorJob && job == '' ? 'visible' : 'invisible'
                    } transition`}
                  >
                    Nhập điểm câu hỏi
                  </span>
                }
              />
            </div>
            <div className="text-base-black-1">
              <div className="text-base 13inch:text-lg font-semibold mb-2">
                Nghề <span className="text-red-500">*</span>
              </div>
              <div className="flex flex-col w-full gap-2">
                {jobList.map((job: any) => (
                  <div key={job.id} className="w-full flex items-center gap-4">
                    <Input
                      variant="bordered"
                      size="lg"
                      placeholder="Nhập tên nghề"
                      value={job.content}
                      onChange={(e: any) => handleChange(e, job.id)}
                    />
                    <DeleteJobBtn
                      jobList={jobList}
                      setJobList={setJobList}
                      id={job.id}
                    />
                  </div>
                ))}
              </div>
              <div
                className={`text-[13px] text-red-500 mt-1 ${
                  errorJobListContent ? 'visible' : 'invisible'
                }`}
              >
                Vui lòng nhập trường này
              </div>
              <Button
                size="md"
                startContent={<Add size="16" color="#fff" />}
                className="rounded-[16px] text-white bg-primary-blue text-sm mt-4"
                onClick={handleAddNewJob}
              >
                Thêm
              </Button>
            </div>
          </div>
        }
      />
    </>
  )
}

const DeleteJobBtn = ({
  jobList,
  setJobList,
  id,
}: {
  jobList: any
  setJobList: any
  id: any
}) => {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure()
  const conditionJobListContent = jobList.every(
    (j: any) => j.content.length > 0,
  )
  const handleDelete = () => {
    const newJoblist = jobList.filter((job: any) => job.id !== id)
    setJobList(newJoblist)
  }

  const handleDeleteJob = () => {
    const checkContent = jobList.find((j: any) => j.id === id).content !== ''

    if (checkContent) {
      onOpen()
    } else {
      handleDelete()
    }
  }
  return (
    <>
      <Button
        className="text-red-500 bg-red-100 rounded-full ml-3"
        isIconOnly
        isDisabled={
          jobList.length > 1 || conditionJobListContent ? false : true
        }
        onClick={handleDeleteJob}
      >
        <Trash variant="Bulk" />
      </Button>
      <DefaultModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onConfirm={handleDelete}
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
