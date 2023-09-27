import React, { useState } from 'react'

import Style from './style.module.css'
import {
  FacebookIcon,
  TelegramIcon,
  YoutubeIcon,
  TwitterIcon,
  InstaIcon,
} from '@/components/icon'

import { Chip } from '@nextui-org/react'

const HowToKnowTab: React.FC = () => {
  const optionsSocialMedia = [
    {
      id: 'facebook',
      content: <FacebookIcon />,
    },
    {
      id: 'telegram',
      content: <TelegramIcon />,
    },
    {
      id: 'twitter',
      content: <TwitterIcon />,
    },
    {
      id: 'youtube',
      content: <YoutubeIcon />,
    },
    {
      id: 'insta',
      content: <InstaIcon />,
    },
  ]

  const optionsSocialAnother = [
    {
      id: 'friend',
      content: 'Bạn bè',
    },
    {
      id: 'TV',
      content: 'Truyền hình',
    },
    {
      id: 'event',
      content: 'Sự kiện',
    },
    {
      id: 'workshop',
      content: 'Hội thảo',
    },
  ]
  const [selectedSocialMedia, sSelectedSocialMedia] = useState<string>(
    optionsSocialMedia[0].id,
  )
  const _HandleChangeSocialMedia = (option: string) =>
    sSelectedSocialMedia(option)

  const [selectedSocialAnother, sSelectedSocialAnother] = useState<string>(
    optionsSocialAnother[0].id,
  )
  const _HandleChangeSocialAnother = (option: string) =>
    sSelectedSocialAnother(option)

  return (
    <div className="pb-4">
      <h6 className="font-[600] text-sm 13inch:text-base 13inch:text-base-black-1">
        Mã giới thiệu của thợ khác
      </h6>
      <Chip
        radius="sm"
        variant="bordered"
        classNames={{
          base: '',
          content: 'font-[600] text-sm 13inch:text-base',
        }}
        className={`py-4 ${Style.referralCode}`}
      >
        212sda5czxc2
      </Chip>
      <h6
        className="font-[600] text-sm 13inch:text-base text-base-black-1"
        style={{ marginTop: '30px' }}
      >
        Các kênh social media của Vua Thợ
      </h6>
      <div className="flex space-x-5" style={{ marginTop: '12px' }}>
        {optionsSocialMedia.map(e => (
          <div key={e.id}>
            <input
              type="radio"
              id={e.id}
              value={e.id}
              checked={selectedSocialMedia === e.id}
              onChange={_HandleChangeSocialMedia.bind(this, e.id)}
              className="hidden"
            />
            <label
              htmlFor={e.id}
              className={`border-2 h-12 transition px-2 13inch:p-4 ease-in-out w-full rounded-md flex flex-col justify-center items-center cursor-pointer`}
              style={{
                borderColor: `${
                  selectedSocialMedia === e.id ? '#246BFD' : '#E1E1E1'
                }`,
              }}
            >
              {e.content}
            </label>
          </div>
        ))}
      </div>
      <h6
        className="font-[600] text-sm 13inch:text-base text-base-black-1"
        style={{ marginTop: '30px' }}
      >
        Các kênh truyền thông bên ngoài mà Vua Thợ chạy marketing
      </h6>
      <div className="flex space-x-5" style={{ marginTop: '20px' }}>
        {optionsSocialAnother.map(e => (
          <div key={e.id}>
            <input
              type="radio"
              id={e.id}
              value={e.id}
              checked={selectedSocialAnother === e.id}
              onChange={_HandleChangeSocialAnother.bind(this, e.id)}
              className="hidden"
            />
            <label
              htmlFor={e.id}
              className={`border-2 transition ease-in-out py-2 px-4 font-[600] rounded-md cursor-pointer text-sm 13inch:text-base`}
              style={{
                borderColor: `${
                  selectedSocialAnother === e.id ? '#246BFD' : '#E1E1E1'
                }`,
                color: `${
                  selectedSocialAnother === e.id ? '#246BFD' : '#282828'
                }`,
              }}
            >
              {e.content}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HowToKnowTab
