import React from 'react'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react'
import { Add as IconAdd } from 'iconsax-react'
import { twMerge } from 'tailwind-merge'

type DefaultModal = {
  modalTitle: any
  isDismissable?: boolean
  propsModal?: any
  styleModalTitle?: string
  subModalTitle?: string
  modalBody?: any
  btnCloseContent?: 'Hủy' | string
  btnConfirmContent?: 'Xác nhận' | string
  onConfirm?: () => void
  btnAnotherContent?: any
  actionAnother?: () => void
  isOpenProps?: boolean
  onOpenChangeProps?: any
  isOpen: boolean
  onOpenChange: () => void
  propsModalFooter?: any
  hiddenBtnCancel?: boolean
  propsBtnConfirm?: any
  customBody?: any
}

const DefaultModal: React.FC<DefaultModal> = ({
  modalTitle,
  isDismissable,
  propsModal,
  styleModalTitle,
  subModalTitle,
  modalBody,
  btnCloseContent,
  btnConfirmContent,
  onConfirm,
  btnAnotherContent,
  actionAnother,
  isOpen,
  onOpenChange,
  propsModalFooter,
  hiddenBtnCancel = false,
  propsBtnConfirm,
  customBody,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{
        base: 'rounded-md',
        body: 'py-6',
        header: 'border-b-[1px] border-base-gray-2',
        footer: 'border-t-[1px] border-base-gray-2',
        closeButton: 'hover:bg-white/5 active:bg-white/10',
      }}
      hideCloseButton={true}
      isDismissable={isDismissable || false}
      scrollBehavior="inside"
      {...propsModal}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex justify-between gap-1 items-center">
              <div>
                <h5
                  className={twMerge(
                    'text-primary-blue text-xl 13inch:text-2xl font-bold',
                    styleModalTitle,
                  )}
                >
                  {modalTitle}
                </h5>
                <span className="text-base-black-1 font-[400] text-sm 13inch:text-base">
                  {subModalTitle}
                </span>
              </div>
              <button
                className="rotate-45 transition-background hover:bg-base-gray-2 p-1.5 rounded-full"
                onClick={onClose}
              >
                <IconAdd />
              </button>
            </ModalHeader>
            {customBody ? (
              customBody
            ) : (
              <>
                <ModalBody className="max-h-[60vh] py-0">{modalBody}</ModalBody>
                <ModalFooter
                  className={`${
                    propsModalFooter ? 'justify-between' : 'justify-end'
                  } flex gap-5`}
                >
                  <>
                    {/* {btnAnotherContent && (
                  {btnAnotherContent}
                  )} */}
                    {propsModalFooter}
                    <div className="flex gap-5">
                      {!hiddenBtnCancel && (
                        <Button
                          size="md"
                          className="border-primary-blue text-primary-blue font-semibold min-w-[110px] 13inch:min-w-[120px] py-3 13inch:py-5 text-sm 13inch:text-base"
                          variant="bordered"
                          onPress={onClose}
                        >
                          {btnCloseContent || 'Hủy'}
                        </Button>
                      )}
                      <Button
                        size="md"
                        className="bg-primary-blue text-white font-semibold min-w-[110px] 13inch:min-w-[120px] py-3 13inch:py-5 text-sm 13inch:text-base"
                        onPress={onConfirm}
                        {...propsBtnConfirm}
                      >
                        {btnConfirmContent || 'Xác nhận'}
                      </Button>
                    </div>
                  </>
                </ModalFooter>
              </>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default DefaultModal
