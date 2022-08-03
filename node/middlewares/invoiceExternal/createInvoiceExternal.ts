import type { InvoiceExternal } from '../../typings/externalInvoice'
import { processInvoiceExternal } from './processInvoiceExternal'
import { sendEmailInvoiceExternal } from './sendEmailInvoiceExternal'

export async function createInvoiceExternal(
  ctx: Context,
  dataInvoice: InvoiceExternal
) {
  let status
  let body

  const documentMD = await processInvoiceExternal(ctx, dataInvoice)
  const { DocumentId } = documentMD
  const documentId = DocumentId

  if (documentId) {
    try {
      await sendEmailInvoiceExternal(ctx, documentId, dataInvoice)
    } catch (error) {
      console.error(error)
    }

    status = 200
    body = {
      message: `Invoice Created, Shortly you will receive an email with the invoice created to your email address. ${dataInvoice.seller.contact.email}`,
      id: documentId,
    }
  } else {
    status = 400
    body = {
      message: `It was not possible to create the invoice`,
      exception: documentMD,
    }
  }

  return {
    status,
    body,
  }
}
