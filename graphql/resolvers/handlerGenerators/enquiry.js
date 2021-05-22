const Enquiries = require('../../../models/enquiry')

async function getEnquiries() {
  try {

    const enquiries = await Enquiries.find().sort({ createdDate: -1 }).populate(['products.info'])

    return enquiries.map(enquiry => ({
      ...enquiry._doc,
      products: enquiry.products.map(product => ({
        info: {
          name: (product.info || {}).name,
          price: (product.info || {}).price
        },
        variant: product.variant,
        quantity: product.quantity
      })),
      createdDate: enquiry.createdDate.toString()
    }))
  }
  catch(err) {
    throw err
  }
}

async function submitEnquiry(args) {
  try {
    const {
      name,
      email,
      phone,
      company,
      profile,
      subject,
      message,
      products
    } = args.enquiryInput; //retrieve values from arguments

    const enquiry = new Enquiries({
      name,
      email,
      phone,
      company,
      profile,
      subject,
      message,
      products
    }, (err) => { if (err) throw err })
    enquiry.save()
    
    return 'Thank you for your enquiry, we will talk to you shortly.'
  }
  catch(err) {
    throw err
  }
}

async function readEnquiry(args) {
  try {
    const { _id, read } = args; //retrieve values from arguments

    Enquiries.findByIdAndUpdate( 
      { _id },
      { read },
      {new: true},
      (error, enquiry) => {

        if (error){
          throw error
        } else {
          enquiry.save()
        }
      }
    )
    
    return 'Message Read'
  }
  catch(err) {
    throw err
  }
}

async function repliedEnquiry(args) {
  try {
    const { _id, replied } = args; //retrieve values from arguments

    Enquiries.findByIdAndUpdate( 
      { _id },
      { replied },
      {new: true},
      (error, enquiry) => {

        if (error){
          throw error
        } else {
          enquiry.save()
        }
      }
    )
    
    return 'Replied status updated'
  }
  catch(err) {
    throw err
  }
}

async function deleteEnquiry(args) {
  try {
    Enquiries.findByIdAndRemove( 
      args._id,
      (error, enquiry) => {
        if (error){
          throw error
        }
      }
    )

    return 'Delete Successful!'
  }
  catch(err) {
    throw err
  }
}

module.exports = {
  getEnquiries,
  submitEnquiry,
  readEnquiry,
  repliedEnquiry,
  deleteEnquiry
}