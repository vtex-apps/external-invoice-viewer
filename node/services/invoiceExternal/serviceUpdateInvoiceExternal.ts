import { updateInvoiceExternal } from '../../middlewares'

export async function serviceUpdateInvoiceExternal(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    state: {
      body: { requestData },
    },
    vtex: {
      route: {
        params: { id },
      },
    },
  } = ctx

  const createInvoiceResult = await updateInvoiceExternal(
    ctx,
    requestData,
    id as string
  )

  ctx.status = createInvoiceResult.status
  ctx.body = createInvoiceResult.body

  ctx.set('Cache-Control', 'no-cache ')

  await next()
}
