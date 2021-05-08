import MaterialTable from '@material-table/core'
import TableAddTitle from './TableTitle'
import { options } from '../constant'

function CustomTable({
  title,
  CustomTitle,
  link,
  columns,
  data,
  actions,
  detailPanel
}) {
  return (
    <MaterialTable
      title={CustomTitle ? <CustomTitle /> : <TableAddTitle title={title} link={link}/>}
      columns={columns}
      data={data}
      options={options}
      actions={actions}
      detailPanel={detailPanel}
    />
  )
}

export default CustomTable
