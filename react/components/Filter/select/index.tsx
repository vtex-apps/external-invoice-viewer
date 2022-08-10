import type { FC } from 'react'
import React from 'react'
import { EXPERIMENTAL_Select as Select } from 'vtex.styleguide'

const SelectComponent: FC<SelectProps> = (props) => {
  return (
    <div>
      <Select
        value={props.dataFilter}
        label={props.customLabel}
        options={props.options}
        onChange={(values: SellerSelect[] | SellerSelect) => {
          if (Array.isArray(values)) props.setDataFilter(values)
          else props.setDataFilter([values])
        }}
        valuesMaxHeight={35}
        multi={props.multi}
        size="small"
      />
    </div>
  )
}

export default SelectComponent
