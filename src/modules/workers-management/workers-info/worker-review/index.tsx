import React from 'react'

import styles from './style.module.css'
import { StarIcon } from '@/components/icon'

import { Tabs, Tab, Progress } from '@nextui-org/react'

type TabReviewItem = {
  id: string
  label: string
  content: any
}

const ReviewTab: React.FC = () => {
  const tabReview: TabReviewItem[] = [
    {
      id: 'WorkEval',
      label: 'Chất lượng đầu vào của thợ ',
      content: <WorkEvalTab />,
    },
    {
      id: 'ServiceEval',
      label: 'Điểm dịch vụ',
      content: <ServiceEval />,
    },
    {
      id: 'CancellationRatio',
      label: 'Tỉ lệ huỷ đơn',
      content: <CancellationRatio />,
    },
  ]
  return (
    <Tabs
      aria-label="Review's Worker User Information Tab"
      items={tabReview}
      variant="light"
      color="primary"
      classNames={{
        tab: 'bg-base-gray px-4 h-10',
        cursor: 'bg-primary-blue w-full',
        tabList: 'gap-6',
        tabContent: styles.tabContent,
      }}
    >
      {(item: TabReviewItem) => (
        <Tab key={item.id} title={item.label}>
          <div className="pt-3">{item.content}</div>
        </Tab>
      )}
    </Tabs>
  )
}

const WorkEvalTab: React.FC = () => {
  const list = [
    {
      title: 'Kết quả bài test ứng xử',
      listItem: [
        {
          content: 'Điện lạnh',
          rating: 5.2,
        },
        {
          content: 'Sửa xe',
          rating: 6.2,
        },
      ],
    },
    {
      title: 'Kết quả bài test nghiệp vụ',
      listItem: [
        {
          content: 'Điện lạnh',
          rating: 5.2,
        },
        {
          content: 'Sửa xe',
          rating: 6.2,
        },
      ],
    },
    {
      title: 'Kết quả bài test nghiệp vụ asd asd',
      listItem: [
        {
          content: 'Điện lạnh',
          rating: 5.2,
        },
        {
          content: 'Sửa xe',
          rating: 6.2,
        },
      ],
    },
  ]

  return (
    <div className={styles.distanceForm}>
      {list.map(e => (
        <div key={e.title}>
          <h5 className="text-base 13inch:text-xl font-semibold text-base-black-1">
            {e.title}
          </h5>
          <div className={styles.displayGridWorkEval}>
            {e.listItem.map(ce => (
              <div
                key={ce.content}
                className={`p-6 rounded-lg ${styles.formShadow}`}
              >
                <h6 className="text-base-black-1 font-semibold text-sm 13inch:text-base">
                  {ce.content}
                </h6>
                <p
                  className={`font-bold text-xl 13inch:text-2xl mt-5 ${styles.textRatingWorkEval}`}
                >
                  {ce.rating}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const ServiceEval: React.FC = () => {
  const listService = [
    {
      title: 'Nghiệp vụ',
      pointRate: 4.2,
      ratingCount: 123,
      percentOf5: 62.2,
      percentOf4: 14.8,
      percentOf3: 12,
      percentOf2: 8,
      percentOf1: 0,
    },
    {
      title: 'Dịch vụ',
      pointRate: 4.2,
      ratingCount: 123,
      percentOf5: 62.2,
      percentOf4: 14.8,
      percentOf3: 12,
      percentOf2: 8,
      percentOf1: 0,
    },
  ]
  return (
    <div className={styles.displayGridServiceEval}>
      {listService.map(e => (
        <div className="space-x-3">
          <h5 className="text-base 13inch:text-xl font-[600] text-base-black-1">
            {e.title}
          </h5>
          <div className={styles.formShadow}>
            <div className="flex text-sm 13inch:text-base">
              <h6 className="flex items-center">
                <span style={{ marginRight: '4px' }}>{e.pointRate}</span>
                <StarIcon width={16} height={16} />
              </h6>
              <span style={{ marginLeft: '24px' }}>
                {e.ratingCount} đánh giá
              </span>
            </div>
            <div style={{ marginTop: '24px' }}>
              <h6 className="flex items-center">
                <span
                  style={{ marginRight: '4px' }}
                  className="text-sm 13inch:text-base"
                >
                  5
                </span>
                <StarIcon width={16} height={16} />
              </h6>
              <div
                style={{ marginTop: '3px' }}
                className="flex justify-between items-center"
              >
                <Progress
                  aria-label={`5 star of ${e.title}`}
                  value={e.percentOf5}
                />
                <span
                  style={{ marginLeft: '25px' }}
                  className="text-sm 13inch:text-base"
                >
                  {e.percentOf5}%
                </span>
              </div>
            </div>
            <div style={{ marginTop: '16px' }}>
              <h6 className="flex items-center">
                <span
                  style={{ marginRight: '4px' }}
                  className="text-sm 13inch:text-base"
                >
                  4
                </span>
                <StarIcon width={16} height={16} />
              </h6>
              <div
                style={{ marginTop: '3px' }}
                className="flex justify-between items-center"
              >
                <Progress
                  aria-label={`5 star of ${e.title}`}
                  value={e.percentOf4}
                />
                <span
                  style={{ marginLeft: '25px' }}
                  className="text-sm 13inch:text-base"
                >
                  {e.percentOf4}%
                </span>
              </div>
            </div>
            <div style={{ marginTop: '16px' }}>
              <h6 className="flex items-center">
                <span
                  style={{ marginRight: '4px' }}
                  className="text-sm 13inch:text-base"
                >
                  3
                </span>
                <StarIcon width={16} height={16} />
              </h6>
              <div
                style={{ marginTop: '3px' }}
                className="flex justify-between items-center"
              >
                <Progress
                  aria-label={`5 star of ${e.title}`}
                  value={e.percentOf3}
                />
                <span
                  style={{ marginLeft: '25px' }}
                  className="text-sm 13inch:text-base"
                >
                  {e.percentOf3}%
                </span>
              </div>
            </div>
            <div style={{ marginTop: '16px' }}>
              <h6 className="flex items-center">
                <span
                  style={{ marginRight: '4px' }}
                  className="text-sm 13inch:text-base"
                >
                  2
                </span>
                <StarIcon width={16} height={16} />
              </h6>
              <div
                style={{ marginTop: '3px' }}
                className="flex justify-between items-center"
              >
                <Progress
                  aria-label={`5 star of ${e.title}`}
                  value={e.percentOf2}
                />
                <span
                  style={{ marginLeft: '25px' }}
                  className="text-sm 13inch:text-base"
                >
                  {e.percentOf2}%
                </span>
              </div>
            </div>
            <div style={{ marginTop: '16px' }}>
              <h6 className="flex items-center">
                <span
                  style={{ marginRight: '4px' }}
                  className="text-sm 13inch:text-base"
                >
                  1
                </span>
                <StarIcon width={16} height={16} />
              </h6>
              <div
                style={{ marginTop: '3px' }}
                className="flex justify-between items-center"
              >
                <Progress
                  aria-label={`5 star of ${e.title}`}
                  value={e.percentOf1}
                />
                <span
                  style={{ marginLeft: '25px' }}
                  className="text-sm 13inch:text-base"
                >
                  {e.percentOf1}%
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const CancellationRatio: React.FC = () => {
  const listCancelRatio = [
    {
      title: 'Đến nhà',
      listItem: [
        {
          content: 'Thợ hủy',
          percent: 10,
        },
        {
          content: 'Khách hủy',
          percent: 20,
        },
      ],
    },
    {
      title: 'Thỏa thuận',
      listItem: [
        {
          content: 'Thợ hủy',
          percent: 10,
        },
        {
          content: 'Khách hủy',
          percent: 20,
        },
      ],
    },
    {
      title: 'Tiến hành',
      listItem: [
        {
          content: 'Thợ hủy',
          percent: 30,
        },
        {
          content: 'Khách hủy',
          percent: 20,
        },
      ],
    },
    {
      title: 'Thanh toán',
      listItem: [
        {
          content: 'Thợ hủy',
          percent: 5,
        },
        {
          content: 'Khách hủy',
          percent: 25,
        },
      ],
    },
  ]
  return (
    <div className="space-y-6">
      <h5 className="text-lg 13inch:text-xl font-bold text-base-black-1">
        Phân tích tiến trình
      </h5>
      <div className={styles.displayGridCancellationRatio}>
        {listCancelRatio.map((e, i) => (
          <div key={e.title} className={styles.formShadow}>
            <div className="flex justify-between text-lg 13inch:text-xl text-primary-blue font-bold">
              <span>{i + 1}</span>
              <span>{e.title}</span>
            </div>
            {e.listItem.map(ce => (
              <div style={{ marginTop: '10px' }}>
                <p className="text-sm 13inch:text-base">{ce.content}</p>
                <div
                  style={{ marginTop: '3px' }}
                  className="flex justify-between items-center"
                >
                  <Progress
                    aria-label={`5 star of ${e.title}`}
                    value={ce.percent}
                  />
                  <span
                    style={{ marginLeft: '25px' }}
                    className="text-sm 13inch:text-base"
                  >
                    {ce.percent}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewTab
