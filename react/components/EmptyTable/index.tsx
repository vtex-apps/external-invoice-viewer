import type { FC } from 'react'
import React from 'react'
import { EmptyState } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'

const EmptyTable: FC = () => {
  return (
    <div className="mt5">
      <EmptyState title={<FormattedMessage id="admin/table.empty-state" />}>
        <p>
          <FormattedMessage id="admin/table.empty-state-title" />
        </p>
      </EmptyState>
    </div>
  )
}

export default EmptyTable
