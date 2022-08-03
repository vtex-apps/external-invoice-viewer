import { method } from '@vtex/api'

import { sendMail, templateMethod } from './middlewares'
import { validateParamsExternal } from './middlewares/invoiceExternal/validateParamsExternal'
import {
  serviceCreateInvoiceExternal,
  serviceGetInvoiceExternal,
  serviceDeleteInvoiceExternal,
  serviceUpdateInvoiceExternal,
} from './services'

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
    DELETE: [validateParamsExternal, serviceDeleteInvoiceExternal],
    PATCH: [validateParamsExternal, serviceUpdateInvoiceExternal],
  }),
}

export { routes }
