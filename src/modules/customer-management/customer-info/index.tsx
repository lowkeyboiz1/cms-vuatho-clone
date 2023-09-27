import React from 'react'; 
import { useRouter } from 'next/router'; 
 
import { Gender as GenderIcon } from '@/components/icon' 
 
import { Avatar } from '@nextui-org/react' 
import { Building4 as BuildingIcon, Cake as CakeIcon, Call as CallIcon, Sms as SmsIcon } from 'iconsax-react' 
import { Tabs, Tab } from '@nextui-org/react' 
import HowToKnowTab from '@/modules/workers-management/workers-info/how-to-know';
 
const InfoPersonalCustomer = () => { 
    const router = useRouter(); 
    const customerIdParam = router.query.info; 
 
    if (Array.isArray(customerIdParam)) { 
        return <div>Invalid customer ID parameter</div>; 
    } 
    const customerId = customerIdParam ? customerIdParam.split('=')[1] : null; 
 
    const tabs = [ 
        { 
          id: 'address', 
          label: 'Địa chỉ đặt', 
          content: <AddressTab />, 
        },{ 
          id: 'how to know', 
          label: 'Biết đến Vua Thợ', 
          content: <HowToKnowTab />, 
        } 
      ] 
    return ( 
        <div className="w-full flex flex-col bg-[#f9f9f9] "> 
            <div className="flex gap-4 items-center px-6 bg-white pt-6 rounded-t-2xl"> 
                <Avatar src="/images/Rectangle 3538.png" className="h-[120px] min-w-[120px]" /> 
                <div className="w-full flex flex-col gap-8"> 
                    <div className='flex gap-8'> 
                        <div> 
                            <div className="text-2xl font-bold">Lâm Hoài Bảo</div> 
                            <div className="">ID: {customerId}</div> 
                        </div> 
                        <div className='flex items-center gap-4 px-3 rounded-lg' style={{background: '#b5803010'}}> 
                            <span className='text-base font-[600]' style={{color: '#A37347'}}>Đồng</span> 
                            <div className='bg-[#D9D9D9] h-2 w-2 rounded-full' /> 
                            <span>123 điểm</span> 
                        </div> 
                    </div> 
                    <div className="w-full flex gap-4"> 
                        <div className="w-full flex items-center justify-between px-4 py-2 bg-base-gray rounded-lg"> 
                        <GenderIcon /> 
                        <span className="text-base-black-1 text-sm">Nam</span> 
                        </div> 
                        <div className="w-full flex items-center justify-between px-4 py-2 bg-base-gray rounded-lg"> 
                        <CakeIcon size="24" variant="Bulk" className="text-primary-blue-3" /> 
                        <span className="text-base-black-1 text-sm">11/08/1994</span> 
                        </div> 
                        <div className="w-full flex items-center justify-between px-4 py-2 bg-base-gray rounded-lg"> 
                        <BuildingIcon size="24" variant="Bulk" className="text-primary-blue-3" /> 
                        <span className="text-base-black-1 text-sm">Hóc Môn</span> 
                        </div> 
                        <div className="w-full flex items-center gap-4 justify-between px-4 py-2 bg-base-gray rounded-lg"> 
                        <CallIcon size="24" variant="Bulk" className="text-primary-blue-3" /> 
                        <span className="text-base-black-1 text-sm">0123456789</span> 
                        </div> 
                        <div className="w-full flex items-center gap-4 justify-between px-4 py-2 bg-base-gray rounded-lg"> 
                        <SmsIcon size="24" variant="Bulk" className="text-primary-blue-3" /> 
                        <span className="text-base-black-1 text-sm">baone@gmail.com</span> 
                        </div> 
                    </div> 
                </div> 
            </div> 
            <Tabs  
                aria-label="Tab about information user"  
                items={tabs} 
                variant="underlined" 
                color="primary" 
                classNames={{ 
                base: 'bg-white pb-4 rounded-b-2xl mb-3 pt-2', 
                tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider mx-6", 
                cursor: "w-full bg-[#246BFD]", 
                tab: "max-w-fit px-2 h-12", 
                tabContent: "group-data-[selected=true]:text-[#246BFD] font-[600] text-base" 
                }} 
            > 
                {(item) => ( 
                <Tab key={item.id} title={item.label}> 
                    <div className='bg-white rounded-2xl px-6 py-4 min-h-[300px]'>{item.content}</div> 
                </Tab> 
                )} 
            </Tabs> 
        </div> 
    ) 

} 
 
const AddressTab: React.FC = () => { 
    return( 
        <div className='space-y-6'> 
            <div className='space-y-2'> 
                <span className='text-base font-[600]'>Nhà riêng</span> 
                <div className='bg-base-gray px-4 py-3 rounded-lg'> 
                    <span>12 An Phú, Song Hành, Quận 12, TPHCM</span> 
                </div> 
            </div> 
            <div className='space-y-2'> 
                <span className='text-base font-[600]'>Công ty</span> 
                <div className='bg-base-gray px-4 py-3 rounded-lg'> 
                    <span>12 An Phú, Song Hành, Quận 12, TPHCM</span> 
                </div> 
            </div> 
        </div> 
    ) 
} 
 
export default InfoPersonalCustomer
