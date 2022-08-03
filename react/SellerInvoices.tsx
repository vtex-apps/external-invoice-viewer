import type { FC } from 'react'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageHeader } from 'vtex.styleguide'

import './styles.global.css'

const SellerInvoices: FC = () => {
  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="admin/navigation.invoices.label" />}
        />
      }
    />
  )
}

export default SellerInvoices
