import type { DocumentNode } from 'graphql'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import { PageBlock, Tag } from 'vtex.styleguide'

import { statuses } from '../../constants'
import TableComponent from '../Table'
import PaginationComponent from '../Table/pagination'

interface DetailProps {
  invoicesQuery: DocumentNode
  startDate?: string
  finalDate?: string
  dataTableInvoice: Invoice[]
  setDataTableInvoice: (data: Invoice[]) => void
  status: string | null
}

const Invoices: FC<DetailProps> = ({
  invoicesQuery,
  startDate,
  finalDate,
  dataTableInvoice,
  setDataTableInvoice,
  status,
}) => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [itemFrom, setItemFrom] = useState(1)
  const [itemTo, setItemTo] = useState(20)
  const [totalItems, setTotalItems] = useState(0)

  const { data: dataInvoices } = useQuery(invoicesQuery, {
    ssr: false,
    pollInterval: 0,
    variables: {
      listInvoicesParams: {
        createdDateInitial: startDate,
        createdDateEnd: finalDate,
        pagination: {
          page,
          pageSize,
        },
        status: status === 'undefined' ? '' : status,
      },
    },
  })

  useEffect(() => {
    if (dataInvoices) {
      setDataTableInvoice(dataInvoices.listExternalInvoices.data)
      setTotalItems(dataInvoices.listExternalInvoices.pagination.total)
    }
  }, [dataInvoices])

  const schemaTableInvoice = [
    {
      id: 'id',
      title: <FormattedMessage id="admin/table-seller-invoice" />,
      cellRenderer: (props: CellRendererProps) => {
        return (
          <a
            href={`/admin/app/sellerInvoices/invoice/${props.data}`}
            style={{ color: '#0C389F' }}
            target="_self"
            rel="noreferrer"
          >
            {props.data}
          </a>
        )
      },
    },
    {
      id: 'invoiceCreatedDate',
      title: <FormattedMessage id="admin/table-seller-created" />,
    },
    {
      id: 'status',
      title: <FormattedMessage id="admin/table-seller-status" />,
      cellRenderer: (props: any) => {
        // eslint-disable-next-line array-callback-return
        const getColor = Object.keys(statuses).find(
          (itemStatus) => itemStatus === props.data
        )

        const bgColor = getColor ? statuses[getColor].bgColor : ''
        const fontcolor = getColor ? statuses[getColor].fontColor : ''

        return (
          <Tag bgColor={bgColor} color={fontcolor}>
            {props.data}
          </Tag>
        )
      },
    },
  ]

  const changeRows = (row: number) => {
    setPageSize(row)
    setItemTo(row)
    setItemFrom(1)
    setPage(1)
  }

  const onNextClick = () => {
    const nextPage = page + 1

    const currentTo = pageSize * nextPage
    const currentFrom = itemTo + 1

    setItemTo(currentTo)
    setItemFrom(currentFrom)
    setPage(nextPage)
  }

  const onPrevClick = () => {
    const previousPage = page - 1

    const currentTo = itemTo - pageSize
    const currentFrom = itemFrom - pageSize

    setItemTo(currentTo)
    setItemFrom(currentFrom)
    setPage(previousPage)
  }

  return (
    <PageBlock>
      <div>
        <TableComponent
          schemaTable={schemaTableInvoice}
          items={dataTableInvoice}
          loading={false}
        />
        <PaginationComponent
          setPageSize={setPageSize}
          currentPage={itemFrom}
          pageSize={itemTo}
          setPage={setPage}
          totalItems={totalItems}
          onNextClick={onNextClick}
          changeRows={changeRows}
          onPrevClick={onPrevClick}
        />
      </div>
    </PageBlock>
  )
}

export default Invoices
