const Enquiries = require('../../../models/enquiry')
const captchaRequest = require('../../../utils/captchaRequest')
const GravFormRequest = require('../../../utils/gravityFormRequest')
const keys = require('../../../keys')

const Stripe = require('stripe')
const stripe = Stripe(keys.stripeSecret)

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
      products,
      token
    } = args.enquiryInput; //retrieve values from arguments
    
    const captchaResponse = await captchaRequest(token)
    const { data } = captchaResponse
    if (!data.success) return 'reCaptcha Failed, please send E-mail to INFO@GALLARIA.COM.AU directly for any enquiries.'

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

    await enquiry.populate(['products.info'], (err, { products }) => {
      if (err) throw err

      GravFormRequest('POST', '/entries', {
        form_id: '4',
        is_starred: '0',
        is_read: '0',
        source_url: 'https://www.gallaria.com.au/',
        status: 'active',
        '1': name,
        '2': email,
        '3': phone,
        '4': company,
        '5': profile,
        '6': subject,
        '7': message,
        '8': products.map(({ info, quantity, variant }) => ({
          Code: info.code,
          Name: info.name,
          Variant: variant,
          Price: info.price,
          Quantity: quantity
        }))
      })
        .then(({ data }) => {
          GravFormRequest('POST', `/entries/${data.id}/notifications`)
            .catch(err => { throw err })
        })
        .catch(err => { throw err })
    })

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

async function checkout(args) {
  try {
    const {
      line_items,
      email,
      phone
    } = args.purchaseInput;

    const session = await stripe.checkout.sessions.create({
      // shipping_rates: ['shr_1J2p3zIasUdIbFxXEHlSek2p'],
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['AU'],
      },
      payment_intent_data: {
        receipt_email: email,
        description: 'Phone Number: ' + phone
      },
      customer_email: email,
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: keys.successLink,
      cancel_url: keys.cancelLink
    });

    return { id: session.id }
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
  deleteEnquiry,
  checkout
}