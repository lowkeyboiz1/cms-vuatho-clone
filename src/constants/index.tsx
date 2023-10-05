import {
  Profile2User as UserIcon,
  DocumentText as DocumentIcon,
  MessageQuestion,
  ShoppingBag,
  Bezier as BezierIcon,
  ArrowCircleDown,
} from 'iconsax-react'

type MenuType = {
  title: string,
  icon?: JSX.Element;
  url?: string;
  children?: MenuType[];
}

export const MenuSidebar: MenuType[] = [
  {
    title: 'User',
    icon: <UserIcon />,
    children: [
      { title: 'Quản lí user thợ', url: '/worker-management' },
      { title: 'Quản lí user khách', url: '/customer-management' },
      { title: 'Quản lí user nhà cung cấp', url: '/provider-management'},
      { title: 'Quản lí nhân sự Vua Thợ', url: '/employee-management'},
    ]
  },{
    title: 'Test',
    icon: <DocumentIcon />,
    children: [
      { title: 'Quản lí bài test', url: '/test-management' }
    ]
  },{
    title: 'Câu hỏi',
    icon: <MessageQuestion />,
    children: [
      { title: 'Quản lí câu hỏi', url: '/question-management' },
    ],
  },{
    title: 'Ngành nghề',
    icon: <ShoppingBag />,
    children: [
      { title: 'Quản lí ngành nghề', url: '/job-management' }
    ]
  }
]


