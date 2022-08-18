import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Input, ModalDialog } from 'vtex.styleguide'

const ModalConfirm: FC<ModalConfirmData> = (props) => {
  const { email, isModalOpen, sendEmail, setEmail, setIsModalOpen } = props

  const [empty, setEmpty] = useState(true)
  const [validEmail, setValidEmail] = useState(true)

  useEffect(() => {
    if (email) setEmpty(false)
  }, [email])

  const checkEmail = (emailAddress: string) => {
    const EMAIL_PATTERN = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    const valid = EMAIL_PATTERN.test(emailAddress)

    if (!emailAddress) {
      setEmpty(true)

      return
    }

    setEmpty(false)
    if (!valid) {
      setValidEmail(false)
    } else {
      setValidEmail(true)
    }
  }

  const getErrorMessage = () => {
    if (empty) {
      return <FormattedMessage id="admin/modal-settings.email-empty" />
    }

    if (!validEmail) {
      return <FormattedMessage id="admin/modal-settings.email-invalid" />
    }

    return null
  }

  return (
    <ModalDialog
      centered
      isOpen={isModalOpen}
      confirmation={{
        disabled: false,
        onClick: () => {
          sendEmail()
          setIsModalOpen(!isModalOpen)
        },
        label: <FormattedMessage id="admin/modal-settings.send" />,
      }}
      onClose={() => setIsModalOpen(!isModalOpen)}
      cancelation={{
        onClick: () => setIsModalOpen(!isModalOpen),
        label: <FormattedMessage id="admin/modal-settings.cancel" />,
      }}
    >
      <div>
        <p>
          <FormattedMessage id="admin/modal-settings.email-to" />
        </p>
      </div>
      <div>
        <Input
          placeholder="e-mail"
          size="large"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value)
            checkEmail(e.target.value)
          }}
          errorMessage={getErrorMessage()}
        />
      </div>
    </ModalDialog>
  )
}

export default ModalConfirm
