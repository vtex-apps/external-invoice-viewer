import type { ExternalInvoice } from 'vtex.external-invoice-viewer'

import type { InvoiceExternal } from '../../typings/externalInvoice'

export async function updateInvoiceExternal(
  ctx: Context,
  dataInvoice: InvoiceExternal,
  id: string
) {
  const {
    clients: { externalInvoices },
  } = ctx

  let message
  let statusResponse

  const getInvoice = (await externalInvoices.get(id as string, [
    '_all',
  ])) as ExternalInvoice

  const generateBody = () => {
    const { status, invoiceCreatedDate, seller, jsonData } = dataInvoice
    let sellerData

    if (seller) {
      sellerData = {
        name: seller.name === undefined ? getInvoice.seller.name : seller.name,
        id: seller.id === undefined ? getInvoice.seller.id : seller.id,
        contact: {
          email:
            seller.contact === undefined
              ? getInvoice.seller.contact?.email
              : seller.contact.email,
        },
      }
    }

    return {
      status: status === undefined ? getInvoice.status : status,
      invoiceCreatedDate:
        invoiceCreatedDate === undefined
          ? getInvoice.invoiceCreatedDate
          : invoiceCreatedDate,
      jsonData: jsonData === undefined ? getInvoice.jsonData : jsonData,
      seller: seller === undefined ? getInvoice.seller : sellerData,
    }
  }

  const bodyUpdate = generateBody()

  if (getInvoice) {
    await externalInvoices.update(id as string, bodyUpdate)
    message = {
      invoiceId: id,
      message: 'The invoice has been successfully update ',
    }
    statusResponse = 200
  } else {
    message = {
      invoiceId: id,
      message: 'The invoice no found, please verify ',
    }
    statusResponse = 404
  }

  return {
    status: statusResponse,
    body: message,
  }
}
