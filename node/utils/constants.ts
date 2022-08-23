export const config = {
  APIREST_JOB_BUCKET: 'api-rest',
  INVOICE_MAIL_TEMPLATE: 'invoice-detail',
  INVOICE_EXTERNAL_BUCKET: 'invoice-ext',
} as const

export const JOB_STATUS = {
  ONGOING: 'ONGOING',
  COMPLETE: 'COMPLETE',
  ERROR: 'ERROR',
  OMITTED: 'OMITTED',
} as const

export const INVOICE_STATUS = {
  UNPAID: 'unpaid',
  PARTIAL: 'partial',
  PAID: 'paid',
} as const

export const validationMessage = {
  DEFAULT_ERRORMESSAGE_FIELD_IS_REQUIRED: 'This field is required',
  ERROR_MESSAGE_DATE_FORMAT:
    'Invalid date format. The date format is yyyy-mm-dd.',
  ERROR_MESSAGE_DATE_RANGE_MONTH_AND_YEAR: 'Range of year or month incorrect',
  ERROR_MESSAGE_DATE_RANGE_DAY: 'Day incorrect',
  ERROR_MESSAGE_DATE_BETWEEN_DAYS:
    'Only a date range of no more than 30 days is allowed.',
  ERROR_MESSAGE_DATE_END_EQUAL_OR_GREATER:
    'End date cannot be equal to or greater than the current current day or date..',
  ERROR_EMAIL: 'Please enter valid email',
  ERROR_JSONDATA: 'jsonData Invalid please check',
} as const
