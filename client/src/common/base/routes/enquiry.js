import { Route } from 'react-router-dom'
import { EnquiryListScreen } from 'modules/enquiry'

function EnquiriesRoute() {
  return (
    <>
      <Route exact path="/enquiries" component={EnquiryListScreen} />
    </>
  )
}

export default EnquiriesRoute
