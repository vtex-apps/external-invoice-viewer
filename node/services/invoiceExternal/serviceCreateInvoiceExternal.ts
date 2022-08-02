import { createInvoiceExternal } from '../../middlewares'

export async function serviceCreateInvoiceExternal(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    state: {
      body: { requestData },
    },
  } = ctx

  const createInvoiceResult = await createInvoiceExternal(ctx, requestData)

  ctx.status = createInvoiceResult.status
  ctx.body = createInvoiceResult.body

  ctx.set('Cache-Control', 'no-cache ')

  await next()
}
