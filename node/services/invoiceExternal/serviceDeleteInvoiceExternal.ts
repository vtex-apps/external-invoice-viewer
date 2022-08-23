import { deleteInvoiceExternal } from '../../middlewares'

export async function serviceDeleteInvoiceExternal(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    vtex: {
      route: {
        params: { id },
      },
    },
  } = ctx

  const getInvoiceResult = await deleteInvoiceExternal(ctx, id as string)

  ctx.status = getInvoiceResult.status
  ctx.body = getInvoiceResult.body

  ctx.set('Cache-Control', 'no-cache ')

  await next()
}
