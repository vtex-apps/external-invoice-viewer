import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Divider, Layout, Modal, PageBlock, PageHeader } from 'vtex.styleguide'

import Invoices from './components/Invoices'
import { Filter } from './components'
import { status, defaultStartString, defaultFinalString } from './constants'
import INVOICES from './graphql/getInvoices.gql'

const dateDefaultPicker = {
  startDatePicker: new Date(`${defaultStartString}T00:00:00`),
  finalDatePicker: new Date(`${defaultFinalString}T00:00:00`),
  defaultStartDate: defaultStartString,
  defaultFinalDate: defaultFinalString,
  today: true,
}

const CommissionReportDetail: FC<DetailProps> = (props) => {
  // const { account, dataSellers, invoicesQuery } = props
  const { account, dataSellers } = props

  const [startDate, setStartDate] = useState('')
  const [finalDate, setFinalDate] = useState('')
  const [optionsSelect, setOptionsSelect] = useState<SellerSelect[]>([])
  const [sellerName, setSellerName] = useState(account ?? '')
  const [sellerId, setSellerId] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [dateRate] = useState<DateRateType[]>([])
  const [optionsStatus, setOptionsStatus] = useState<SellerSelect[]>([])
  const [statusOrders, setStatusOrders] = useState('')
  const [tableInvoices, setTableInvoices] = useState<Invoice[]>([])

  console.info(sellerId)
  console.info(statusOrders)
  console.info(sellerName)

  const formatDate = (valueDate: number) => {
    const validateDate = valueDate <= 9 ? `0${valueDate}` : valueDate

    return validateDate
  }

  useEffect(() => {
    if (!dataSellers) return

    const builtSelectSeller: SellerSelect[] = []

    dataSellers.getSellers.sellers.forEach((seller: DataSellerSelect) => {
      builtSelectSeller.push({
        value: { id: seller.id, name: seller.name },
        label: seller.name,
      })
    })
    setOptionsSelect(builtSelectSeller)
  }, [dataSellers])

  useEffect(() => {
    if (optionsStatus.length) return

    const buildSelectStatus: SellerSelect[] = []

    Object.keys(status).forEach((orderStatus) => {
      buildSelectStatus.push({
        value: { id: orderStatus, name: orderStatus },
        label: orderStatus,
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
          title={<FormattedMessage id="admin/navigation.invoices.label" />}
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
                optionsSelect={optionsSelect}
                filterDates={filterDates}
                setSellerId={setSellerName}
                setId={setSellerId}
                multiValue={false}
                optionsStatus={optionsStatus}
                setStatusOrders={setStatusOrders}
                disableSelect={Boolean(account)}
              />
            </PageBlock>
          </div>
        )}
      </div>
      <div className="mt7">
        <Invoices
          invoicesQuery={INVOICES}
          account={account}
          sellerName={sellerName}
          startDate={startDate}
          finalDate={finalDate}
          dataTableInvoice={tableInvoices}
          setDataTableInvoice={setTableInvoices}
        />
      </div>
    </Layout>
  )
}

export default CommissionReportDetail
