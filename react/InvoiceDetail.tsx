import Handlebars from 'handlebars'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'
import { Alert, Button, Layout, PageHeader, Spinner } from 'vtex.styleguide'

import ModalConfirm from './components/ModalConfirm'
import GET_INVOICE from './graphql/getInvoice.gql'
import GET_TEMPLATE from './graphql/getTemplate.gql'
import SEND_EMAIL from './graphql/sendEmail.gql'

const InvoiceDetail: FC = () => {
  const { route } = useRuntime()
  const { params } = route
  const { id } = params

  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [template, setTemplate] = useState('')
  const [invoice, setInvoice] = useState<Invoice>({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sendEmailFunc, { data: emailData }] = useMutation(SEND_EMAIL)

  const { data } = useQuery(GET_INVOICE, {
    ssr: false,
    pollInterval: 0,
    variables: {
      id,
    },
  })

  const templateSrc = useQuery(GET_TEMPLATE, {
    ssr: false,
    pollInterval: 0,
  })

  useEffect(() => {
    setTemplate(templateSrc?.data?.getTemplate)
  }, [templateSrc, template])

  useEffect(() => {
    if (emailData) {
      setEmailSent(true)
    }
  }, [emailData])

  useEffect(() => {
    const rawInvoice = data?.getExternalInvoice.data[0]

    setInvoice({
      ...rawInvoice,
      jsonData: data ? JSON.parse(rawInvoice?.jsonData) : {},
    })

    if (rawInvoice) setEmail(rawInvoice.seller.contact.email)
  }, [data])

  if (!template) {
    return (
      <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
        <Spinner />
      </div>
    )
  }

  const hbTemplate = Handlebars.compile(template)
  const htmlString = hbTemplate({ id, ...invoice })

  const handleSendEmail = () => {
    sendEmailFunc({
      variables: {
        emailData: {
          email,
          jsonData: JSON.stringify(invoice),
        },
      },
    })
  }

  return (
    <Layout>
      <PageHeader title="Invoice Detail">
        {emailSent ? (
          <Alert type="success">
            {<FormattedMessage id="admin/email-success" />}
          </Alert>
        ) : (
          <Button onClick={() => setIsModalOpen(!isModalOpen)}>
            <FormattedMessage id="admin/form-settings.button-email" />
          </Button>
        )}
      </PageHeader>
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          paddingTop: '100%',
        }}
      >
        <ModalConfirm
          email={email}
          setEmail={setEmail}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          sendEmail={handleSendEmail}
        />
        <iframe
          srcDoc={htmlString}
          title="invoice detail"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        />
      </div>
    </Layout>
  )
}

export default InvoiceDetail
