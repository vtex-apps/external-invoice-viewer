import { method } from '@vtex/api'

import {
  sendMail,
  templateMethod,
  createInvoiceExternal,
  getInvoiceExternal,
} from './middlewares'
import { validateParamsExternal } from './middlewares/invoiceExternal/validateParamsExternal'
import { deleteInvoiceExternal } from './middlewares/invoiceExternal/deleteInvoiceExternal'
import { updateInvoiceExternal } from './middlewares/invoiceExternal/updateInvoiceExternal'

const template = templateMethod

const routes = {
  mail: method({
    POST: [sendMail],
  }),
  template: method({
    GET: [template],
  }),
  _template: method({
    GET: [template],
  }),
  invoiceExternal: method({
    POST: [validateParamsExternal, createInvoiceExternal],
    GET: [getInvoiceExternal],
    DELETE: [validateParamsExternal, deleteInvoiceExternal],
    PATCH: [validateParamsExternal, updateInvoiceExternal],
  }),
}

export { routes }
