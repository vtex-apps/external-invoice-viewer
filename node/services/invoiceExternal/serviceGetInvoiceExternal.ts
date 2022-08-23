import { getInvoiceExternal } from '../../middlewares'

export async function serviceGetInvoiceExternal(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    vtex: {
      route: {
        params: { id },
      },
    },
    query,
  } = ctx

  const getInvoiceResult = await getInvoiceExternal({
    ctx,
    query,
    id: id as string,
  })

  ctx.status = getInvoiceResult.status
  ctx.body = getInvoiceResult.body

  ctx.set('Cache-Control', 'no-cache ')

  await next()
}
