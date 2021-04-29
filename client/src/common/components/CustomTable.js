import MaterialTable from '@material-table/core'
import TablleAddTitle from './TableTitle'
import { options } from '../constant'

function CustomTable({
  title,
  link,
  columns,
  data,
  actions,
  detailPanel
}) {
  return (
    <MaterialTable
      title={<TablleAddTitle title={title} link={link}/>}
      columns={columns}
      data={data}
      options={options}
      actions={actions}
      detailPanel={detailPanel}
    />
  )
}

export default CustomTable
