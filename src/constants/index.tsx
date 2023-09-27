import {
  Profile2User as UserIcon,
  DocumentText as DocumentIcon,
  MessageQuestion,
  ShoppingBag,
  Bezier as BezierIcon,
  ArrowCircleDown,
} from 'iconsax-react'

export const miniSidebar = [
  {
    id: 1,
    title: 'User',
    icon: <UserIcon size={25} variant="Bulk" />,
    children: [
      { id: 6, title: 'Quản lí user thợ', url: '/worker-management' },
      { id: 7, title: 'Quản lí user khách', url: '/customer-management' },
      {
        id: 8,
        title: 'Quản lí user nhà cung cấp',
        url: '/provider-management',
      },
      { id: 9, title: 'Quản lí nhân sự Vua Thợ', url: '/employee-management' },
    ],
  },
  {
    id: 2,
    title: 'Test',
    icon: <DocumentIcon size={25} variant="Bulk" />,
    children: [{ id: 10, title: 'Quản lí bài test', url: '/test-management' }],
  },
  {
    id: 4,
    title: 'Câu hỏi',
    icon: <MessageQuestion size={25} variant="Bulk" />,
    children: [
      { id: 11, title: 'Quản lí câu hỏi', url: '/question-management' },
    ],
  },
  {
    id: 3,
    title: 'Ngành nghề',
    icon: <ShoppingBag size={25} variant="Bulk" />,
    children: [{ id: 12, title: 'Quản lí ngành nghề', url: '/job-management' }],
  },
  {
    title: 'AI',
    icon: <BezierIcon size={25} variant="Bulk" />,
    children: [],
  },
  {
    title: 'Dropdown',
    icon: <ArrowCircleDown size={25} variant="Bulk" />,
    children: [
      {
        id: 18,
        title: 'Quản lí câu hỏi',
        url: '/question-management',
        children: [{ id: 20, title: 'test123', url: '/test-123' }],
      },
      {
        id: 15,
        title: 'Dropdown example',
        url: '',
        children: [
          { id: 17, title: 'test drop down 1', url: '/test' },
          { id: 117, title: 'test drop down 1', url: '/test' },
          { id: 127, title: 'test drop down 1', url: '/test' },
          { id: 173, title: 'test drop down 1', url: '/test' },
          { id: 147, title: 'test drop down 1', url: '/test' },
          { id: 157, title: 'test drop down 1', url: '/test' },
          { id: 167, title: 'test drop down 1', url: '/test' },
          { id: 1327, title: 'test drop down 1', url: '/test' },
          { id: 1227, title: 'test drop down 1', url: '/test' },
          { id: 1217, title: 'test drop down 1', url: '/test' },
          { id: 117, title: 'test drop down 1', url: '/test' },
          { id: 14137, title: 'test drop down 1', url: '/test' },
          { id: 1547, title: 'test drop down 1', url: '/test' },
          { id: 127, title: 'test drop down 1', url: '/test' },
          { id: 1237, title: 'test drop down 1', url: '/test' },
          { id: 1217, title: 'test drop down 1', url: '/test' },
        ],
      },
    ],
  },
]
