import React from 'react'
import MaterialTable from 'material-table'
import { options } from '../constant'

function CustomTable({
  title,
  columns,
  data,
  actions,
  detailPanel
}) {
  return (
    <MaterialTable
      title={title}
      columns={columns}
      data={data}
      options={options}
      actions={actions}
      detailPanel={detailPanel}
    />
  )
}

export default CustomTable
