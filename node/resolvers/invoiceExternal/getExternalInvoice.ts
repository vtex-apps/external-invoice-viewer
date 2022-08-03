import type { ErrorLike } from '@vtex/api'
import { UserInputError } from '@vtex/api'

import { getInvoiceExternal } from '../../middlewares'

export const getExternalInvoice = async (
  _: unknown,
  { id }: { id: string },
  ctx: Context
): Promise<any> => {
  if (id === null || id === undefined) {
    const error: ErrorLike = {
      message: `The field "${id}" is requerid`,
      name: id,
      stack: '',
    }

    throw new UserInputError(error)
  }

  const resultGet = await getInvoiceExternal({ ctx, id })

  const listInvoices = resultGet.body

  return listInvoices
}
