import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Divider, Layout, Modal, PageBlock, PageHeader } from 'vtex.styleguide'

import Invoices from './components/Invoices'
import { Filter } from './components'
import { statuses, defaultStartString, defaultFinalString } from './constants'
import INVOICES from './graphql/getInvoices.gql'

const dateDefaultPicker = {
  startDatePicker: new Date(`${defaultStartString}T00:00:00`),
  finalDatePicker: new Date(`${defaultFinalString}T00:00:00`),
  defaultStartDate: defaultStartString,
  defaultFinalDate: defaultFinalString,
  today: true,
}

const CommissionReportDetail: FC<DetailProps> = () => {
  const [startDate, setStartDate] = useState('')
  const [finalDate, setFinalDate] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [dateRate] = useState<DateRateType[]>([])
  const [optionsStatus, setOptionsStatus] = useState<SellerSelect[]>([])
  const [status, setStatus] = useState('')
  const [tableInvoices, setTableInvoices] = useState<Invoice[]>([])

  const formatDate = (valueDate: number) => {
    const validateDate = valueDate <= 9 ? `0${valueDate}` : valueDate

    return validateDate
  }

  useEffect(() => {
    if (optionsStatus.length) return

    const buildSelectStatus: SellerSelect[] = []

    Object.keys(statuses).forEach((itemStatus) => {
      buildSelectStatus.push({
        value: { id: itemStatus, name: itemStatus },
        label: itemStatus,
      })
    })
    setOptionsStatus(buildSelectStatus)
  }, [optionsStatus])

  useEffect(() => {
    const defaultDate = new Date()
    let defaultStart: Date = new Date()
    const defaultfinal = new Date(
      defaultDate.getFullYear(),
      defaultDate.getMonth(),
      defaultDate.getDate()
    )

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const defaultFinalString = `${defaultfinal.getFullYear()}-${formatDate(
      defaultfinal.getMonth() + 1
    )}-${formatDate(defaultfinal.getDate())}`

    if (defaultDate.getDate() <= 1) {
      defaultStart = defaultfinal
    } else {
      defaultStart = new Date(
        defaultDate.getFullYear(),
        defaultDate.getMonth(),
        1
      )
    }

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const defaultStartString = `${defaultStart.getFullYear()}-${formatDate(
      defaultStart.getMonth() + 1
    )}-${formatDate(defaultStart.getDate())}`

    setStartDate(defaultStartString)
    setFinalDate(defaultFinalString)
  }, [])

  const filterDates = (start: string, final: string) => {
    setStartDate(start)
    setFinalDate(final)
  }

  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="admin/navigation.section-title" />}
        />
      }
    >
      <Modal
        centered
        isOpen={openModal}
        onClose={() => setOpenModal(!openModal)}
      >
        <div className="mb3">
          {dateRate.map((elmRate: DateRateType) => (
            <div key="elmRate">
              <h2>Item ID: #{elmRate.itemId}</h2>
              <p>
                <b>Name Item: </b> {elmRate.nameItem}
              </p>
              <p>
                <b>Freight Commission Percentage: </b>
                {elmRate.rate.freightCommissionPercentage}%
              </p>
              <p>
                <b>Producto Commission Percentage: </b>
                {elmRate.rate.productCommissionPercentage}%
              </p>
              <Divider />
            </div>
          ))}
        </div>
      </Modal>
      <div className="mt4 mb7">
        {startDate && finalDate && (
          <div className="mt2">
            <PageBlock>
              <Filter
                defaultDate={dateDefaultPicker}
                filterDates={filterDates}
                optionsStatus={optionsStatus}
                setStatus={setStatus}
              />
            </PageBlock>
          </div>
        )}
      </div>
      <div className="mt7">
        <Invoices
          invoicesQuery={INVOICES}
          startDate={startDate}
          finalDate={finalDate}
          dataTableInvoice={tableInvoices}
          setDataTableInvoice={setTableInvoices}
          status={status}
        />
      </div>
    </Layout>
  )
}

export default CommissionReportDetail
