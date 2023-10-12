import { Button } from '@nextui-org/react'

function SelectButton({
  listSelected,
  setSelect,
  select,
}: {
  listSelected: any
  setSelect: any
  select: any
}) {
  return (
    <>
      <div className={listSelected?.length > 0 ? 'hidden' : 'block'}>
        <Button
          onClick={() => setSelect(!select)}
          size="md"
          className={`rounded-[16px] px-[42px] ${
            select
              ? 'text-[#3748a0] bg-[#babef4]'
              : 'text-base-drak-gray border-[2px] border-base-gray-2 bg-transparent'
          }`}
        >
          Chọn
        </Button>
      </div>
      <div className={listSelected.length > 0 ? 'block' : 'hidden'}>
        <Button
          onClick={() => {}}
          size="md"
          className="border-[2px] bg-transparent font-semibold block text-[#fe7434] border-[#ff4343]"
        >
          Xóa<span className="">({listSelected?.length})</span>
        </Button>
      </div>
    </>
  )
}

export default SelectButton
