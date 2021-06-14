const Leads = require('../../../models/leads')
const captchaRequest = require('../../../utils/captchaRequest')
const GravFormRequest = require('../../../utils/gravityFormRequest')

async function getLeads() {
  try {

    const leads = await Leads.find().sort({ createdDate: -1 })

    return leads.map(lead => ({
      ...lead._doc,
      createdDate: lead.createdDate.toString()
    }))
  }
  catch(err) {
    throw err
  }
}

async function submitContact(args) {
  try {
    const {
      name,
      email,
      phone,
      company,
      message,
      token
    } = args.leadInput; //retrieve values from arguments
    
    const captchaResponse = await captchaRequest(token)
    const { data } = captchaResponse
    if (!data.success) return 'reCaptcha Failed, please send E-mail to INFO@GALLARIA.COM.AU directly for any enquiries.'

    const lead = new Leads({
      name,
      email,
      phone,
      company,
      message
    }, (err) => { if (err) throw err })

    GravFormRequest('POST', '/entries', {
      form_id: '3',
      is_starred: '0',
      is_read: '0',
      source_url: 'https://www.gallaria.com.au/',
      status: 'active',
      '1': name,
      '2': email,
      '3': phone,
      '4': company,
      '5': message
    })
      .then(({ data }) => {
        GravFormRequest('POST', `/entries/${data.id}/notifications`)
          .catch(err => { throw err })
      })
      .catch(err => { throw err })


    lead.save()
    return 'Thank you for your enquiry, we will talk to you shortly.'
  }
  catch(err) {
    throw err
  }
}

async function readMessage(args) {
  try {
    const { _id, read } = args; //retrieve values from arguments

    Leads.findByIdAndUpdate( 
      { _id },
      { read },
      {new: true},
      (error, lead) => {

        if (error){
          throw error
        } else {
          lead.save()
        }
      }
    )
    
    return 'Message Read'
  }
  catch(err) {
    throw err
  }
}

async function replied(args) {
  try {
    const { _id, replied } = args; //retrieve values from arguments

    Leads.findByIdAndUpdate( 
      { _id },
      { replied },
      {new: true},
      (error, lead) => {

        if (error){
          throw error
        } else {
          lead.save()
        }
      }
    )
    
    return 'Replied status updated'
  }
  catch(err) {
    throw err
  }
}

async function deleteLead(args) {
  try {
    Leads.findByIdAndRemove( 
      args._id,
      (error, lead) => {
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
  getLeads,
  submitContact,
  readMessage,
  replied,
  deleteLead
}