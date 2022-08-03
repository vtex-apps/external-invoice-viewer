import { getTemplate } from './template/getTemplate'
import { sendEmail } from './mail/sendEmail'
import { listExternalInvoices } from './invoiceExternal/listExternalInvoices'
import { getExternalInvoice } from './invoiceExternal/getExternalInvoice'

export const queries = {
  getTemplate,
  listExternalInvoices,
  getExternalInvoice,
}

export const mutations = {
  sendEmail,
}
