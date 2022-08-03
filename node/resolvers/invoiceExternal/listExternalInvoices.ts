import { getInvoiceExternal } from '../../middlewares'

export const listExternalInvoices = async (
  _: unknown,
  { listInvoicesParams }: { listInvoicesParams: any },
  ctx: Context
): Promise<any> => {
  const resultGet = await getInvoiceExternal({ ctx, query: listInvoicesParams })

  const listInvoices = resultGet.body

  return listInvoices
}
