import type { FC } from 'react'
import React, { useState, useEffect, useCallback } from 'react'
import {
  ButtonWithIcon,
  IconFilter,
  IconDelete,
  ButtonGroup,
} from 'vtex.styleguide'
import { useRuntime } from 'vtex.render-runtime'
import { FormattedMessage } from 'react-intl'

import { SelectComponent, DatePickerComponent } from './itemsFilter'
import {
  getDateString,
  firstDay,
  yesterday,
  today,
  filterEmptyObj,
  filterSellerValues,
} from '../../utils/calculateDate'

const Filter: FC<FilterProps> = (props) => {
  const {
    defaultDate,
    filterDates,
    optionsSelect,
    optionsStatus,
    setId,
    setSellerId,
    setStatusOrders,
    setTotalItems,
  } = props

  const { query, setQuery } = useRuntime()
  const [dataFilter, setDataFilter] = useState<DateFilter>({
    startDateFilter: firstDay,
    finalDateFilter: defaultDate?.today ? today : yesterday,
    dataFilter: [],
    statusFilter: [],
  })

  const changesValuesTable = useCallback(
    (dataFilterValues?: SellerSelect[], dataFilterStatus?: SellerSelect[]) => {
      let response: ResponseFilter = {
        stringId: '',
        sellerFilter: '',
        countTotalItems: 0,
        sellerId: '',
      }

      let stringStatus = ''

      if (dataFilterValues?.length)
        response = filterSellerValues(dataFilterValues, !!setStatusOrders)
      else
        response = filterSellerValues(dataFilter.dataFilter, !!setStatusOrders)

      if (dataFilterStatus?.length) {
        dataFilterStatus.forEach((status) => {
          stringStatus += `${status.label},`
        })
      } else {
        dataFilter.statusFilter.forEach((status) => {
          stringStatus += `${status.label},`
        })
      }

      filterDates?.(
        getDateString(dataFilter.startDateFilter),
        getDateString(dataFilter.finalDateFilter)
      )
      setSellerId(response.stringId.slice(0, -1))
      setId?.(response.sellerId.slice(0, -1))
      setStatusOrders?.(stringStatus.slice(0, -1))
      setTotalItems?.(response.countTotalItems)

      let queryObj = {
        sellerName: response.sellerFilter.slice(0, -1),
        status: stringStatus.slice(0, -1),
        startDate: defaultDate ? getDateString(dataFilter.startDateFilter) : '',
        finalDate: defaultDate ? getDateString(dataFilter.finalDateFilter) : '',
      }

      queryObj = filterEmptyObj(queryObj)
      setQuery(queryObj)
    },
    [
      dataFilter.dataFilter,
      dataFilter.finalDateFilter,
      dataFilter.startDateFilter,
      dataFilter.statusFilter,
      defaultDate,
      filterDates,
      setId,
      setQuery,
      setSellerId,
      setStatusOrders,
      setTotalItems,
    ]
  )

  useEffect(() => {
    if (!optionsSelect.length) return

    // TODO: Add validation to filterQuery (use a constant)
    let filterQuery: any = []
    let filterQueryStatus: any = []

    if (query?.sellerName) {
      const separateString = query.sellerName.split(',')

      filterQuery = separateString.map((seller: any) =>
        optionsSelect.find((nameQuery) => nameQuery.label === seller)
      )
    }

    if (query?.status && optionsStatus) {
      const separateString = query.status.split(',')

      filterQueryStatus = separateString.map((seller: any) =>
        optionsStatus?.find((nameQuery) => nameQuery.label === seller)
      )
    }

    setDataFilter({
      ...dataFilter,
      statusFilter: filterQueryStatus,
      dataFilter: filterQuery,
    })
    changesValuesTable(filterQuery, filterQueryStatus)
  }, [
    changesValuesTable,
    dataFilter,
    optionsSelect,
    optionsStatus,
    query?.sellerName,
    query?.status,
  ])

  const modifyDataFilterStatus = (values: SellerSelect[]) => {
    setDataFilter({ ...dataFilter, statusFilter: values })
  }

  const changeDate = (date: Date, type: string) => {
    if (type === 'start')
      setDataFilter({ ...dataFilter, startDateFilter: date })
    else if (type === 'final')
      setDataFilter({ ...dataFilter, finalDateFilter: date })
  }

  const cleanFilter = () => {
    const lastDate = defaultDate?.today ? today : yesterday

    setDataFilter({
      ...dataFilter,
      dataFilter: [],
      startDateFilter: firstDay,
      finalDateFilter: lastDate,
      statusFilter: [],
    })
    filterDates?.(getDateString(firstDay), getDateString(lastDate))
    setSellerId('')
    setTotalItems?.(0)
    setQuery({
      sellerName: undefined,
      status: undefined,
      startDate: undefined,
      finalDate: undefined,
    })
  }

  return (
    <div className="flex flex-wrap pa0">
      {optionsStatus && (
        <div className="w-100 pt5 mb3">
          <SelectComponent
            options={optionsStatus}
            dataFilter={dataFilter.statusFilter}
            setDataFilter={modifyDataFilterStatus}
            multi
            customLabel={
              <FormattedMessage id="admin/table.title-status-label" />
            }
          />
        </div>
      )}
      <div className="flex-ns w-100 justify-around items-end justify-end">
        <div className="w-100-ns pt2 pr2">
          {defaultDate && (
            <DatePickerComponent
              startDatePicker={dataFilter.startDateFilter}
              changeDate={changeDate}
              finalDatePicker={dataFilter.finalDateFilter}
              today={defaultDate ? defaultDate.today : false}
            />
          )}
        </div>
        <div className="pt7 fr z-0">
          <ButtonGroup
            buttons={[
              <ButtonWithIcon
                isActiveOfGroup
                onClick={() => changesValuesTable()}
                icon={<IconFilter />}
                size="small"
                key=""
              >
                {<FormattedMessage id="admin/table.title-filter" />}
              </ButtonWithIcon>,
              <ButtonWithIcon
                isActiveOfGroup={false}
                size="small"
                onClick={() => cleanFilter()}
                icon={<IconDelete />}
                key=""
              />,
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default Filter
