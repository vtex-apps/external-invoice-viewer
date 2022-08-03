import type { FC } from 'react'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageBlock, PageHeader } from 'vtex.styleguide'

import UsersTable from './UsersTable'

import './styles.global.css'

const AdminExample: FC = () => {
  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="admin-example.hello-world" />}
        />
      }
    >
      <PageBlock variation="full">
        <UsersTable runtime={undefined} />
      </PageBlock>
    </Layout>
  )
}

export default AdminExample
