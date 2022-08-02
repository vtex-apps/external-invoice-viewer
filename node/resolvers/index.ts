import { getTemplate } from './template/getTemplate'
import { sendEmail } from './mail/sendEmail'
import { listExternalInvoices } from './invoiceExternal/listExternalInvoices'

export const queries = {
  getTemplate,
  listExternalInvoices,
}

export const mutations = {
  sendEmail,
}
