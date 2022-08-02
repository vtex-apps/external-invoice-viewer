import type { ParsedUrlQuery } from 'querystring'

const assembleWhere = async (query: any): Promise<string> => {
  const sellerName = (query.sellerName ?? '') as string
  const sellerId = (query.sellerId ?? '') as string
  const status = (query.status ?? '') as string
  const createdDateInitial = (query.createdDateInitial ?? '') as string
  const createdDateEnd = (query.createdDateEnd ?? '') as string

  let where = ''

  if (sellerName !== '') {
    where += `seller.name="${sellerName}"`
  }

  if (sellerId !== '') {
    if (sellerName !== '') {
      where += ` AND seller.id="${sellerId}"`
    } else {
      where += `seller.id="${sellerId}"`
    }
  }

  if (status !== '') {
    if (sellerName !== '' || sellerId !== '') {
      where += ` AND status="${status}"`
    } else {
      where += `status="${status}"`
    }
  }

  if (createdDateInitial !== '' && createdDateEnd !== '') {
    if (sellerName !== '' || sellerId !== '' || status !== '') {
      where += ` AND (invoiceCreatedDate between ${createdDateInitial} AND ${createdDateEnd})`
    } else {
      where += `(invoiceCreatedDate between ${createdDateInitial} AND ${createdDateEnd})`
    }
  }

  return where
}

export async function getInvoiceExternal({
  ctx,
  query,
  id,
}: {
  ctx: Context
  query: ParsedUrlQuery
  id?: string | undefined
}) {
  const {
    clients: { externalInvoices },
  } = ctx

  let sellerInvoices
  let where = ''

  if (id !== '' && id !== undefined) {
    const pagination = {
      page: 1,
      pageSize: 100,
    }

    sellerInvoices = await externalInvoices.searchRaw(
      pagination,
      ['id,status,accountName,seller,invoiceCreatedDate,jsonData,comment'],
      'createdIn',
      `id=${id}`
    )
  } else {
    const page = Number(
      (ctx.query.page === '' || ctx.query.page === undefined
        ? '1'
        : ctx.query.page) as string
    )

    const pageSize = Number(
      (ctx.query.pageSize === '' || ctx.query.pageSize === undefined
        ? '100'
        : ctx.query.pageSize) as string
    )

    if (query) {
      where = await assembleWhere(query)
    }

    const pagination = {
      page,
      pageSize,
    }

    if (where !== '') {
      sellerInvoices = await externalInvoices.searchRaw(
        pagination,
        ['id,status,accountName,seller,invoiceCreatedDate,jsonData,comment'],
        'createdIn',
        where
      )
    } else {
      sellerInvoices = await externalInvoices.searchRaw(
        pagination,
        ['id,status,accountName,seller,invoiceCreatedDate,jsonData,comment'],
        'createdIn'
      )
    }
  }

  return {
    status: 200,
    body: sellerInvoices,
  }
}
