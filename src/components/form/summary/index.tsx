import { UserIcon } from '../../icon'

type FormType = {
  title: string
  quality: any
}

const SummaryForm: React.FC<FormType> = ({ title, quality }) => {
  return (
    <div className="w-[300px] h-[100px] 13inch:w-[400px] 13inch:h-[110px] rounded-[16px] p-6 bg-primary-blue flex flex-col justify-center">
      <div className="flex items-center gap-4">
        <div className="h-[40px] 13inch:h-[56px] w-[40px] 13inch:w-[56px] rounded-full bg-[#92BEFF] flex items-center justify-center">
          <UserIcon />
        </div>
        <div className="flex flex-col text-white">
          <div className="text-xs 13inch:text-sm">{title}</div>
          <div className="text-xl 13inch:text-2xl font-bold">
            {' '}
            {quality.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SummaryForm
