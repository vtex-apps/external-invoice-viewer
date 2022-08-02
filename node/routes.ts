import { method } from '@vtex/api'

import { sendMail, templateMethod } from './middlewares'
import { validateParamsExternal } from './middlewares/invoiceExternal/validateParamsExternal'
import { deleteInvoiceExternal } from './middlewares/invoiceExternal/deleteInvoiceExternal'
import { updateInvoiceExternal } from './middlewares/invoiceExternal/updateInvoiceExternal'
import { serviceCreateInvoiceExternal } from './services/invoiceExternal/serviceCreateInvoiceExternal'
import { serviceGetInvoiceExternal } from './services/invoiceExternal/serviceGetInvoiceExternal'

const template = templateMethod

const routes = {
  mail: method({
    POST: [sendMail],
  }),
  template: method({
    GET: [template],
  }),
  invoiceExternal: method({
    POST: [validateParamsExternal, serviceCreateInvoiceExternal],
    GET: [serviceGetInvoiceExternal],
    DELETE: [validateParamsExternal, deleteInvoiceExternal],
    PATCH: [validateParamsExternal, updateInvoiceExternal],
  }),
}

export { routes }
