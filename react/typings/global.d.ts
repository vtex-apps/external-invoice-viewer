interface CellRendererProps {
  data: string
  density: string
  motion: {
    transaction: string
    willChange: string
  }
  rowHeight: number
}

interface DataSellerSelect {
  account: string
  freightCommissionPercentage: number
  id: string
  isActive: boolean
  name: string
  productCommissionPercentage: number
}

interface DateFilter {
  startDateFilter: Date
  finalDateFilter: Date
  dataFilter: SellerSelect[]
  statusFilter: SellerSelect[]
}

interface DatepickerProps {
  startDatePicker: Date
  finalDatePicker: Date
  changeDate: (date: Date, type: string) => void
  today: boolean
}

interface DateRateType {
  itemId: string
  nameItem: string
  rate: rateType
}

interface DetailProps {
  account?: string
  dataSellers?: {
    getSellers: {
      pagination: Pagination
      sellers: [DataSellerSelect]
    }
  }
  ordersQuery: DocumentNode
  invoiceMutation: DocumentNode
  invoicesQuery: DocumentNode
  settingsQuery?: DocumentNode
}

interface FilterProps {
  defaultDate?: {
    startDatePicker: Date
    finalDatePicker: Date
    defaultStartDate: string
    defaultFinalDate: string
    today: boolean
  }
  filterDates?: (v: string, x: string) => void
  setPages?: (v: number) => void
  optionsStatus?: SellerSelect[]
  setStatus?: (v: string) => void
}

interface Invoice {
  comment?: string
  invoiceCreateDate?: string
  orders?: [Order]
  seller?: Seller
  status?: string
  totalizers?: Totalizers
}

interface ModalConfirmData {
  email: string
  isModalOpen: boolean
  sendEmail: () => void
  setEmail: (v: string) => void
  setIsModalOpen: (v: boolean) => void
}

interface PaginationProps {
  setPageSize: (v: number) => void
  currentPage: number
  pageSize: number
  setPage: (v: number) => void
  totalItems: number
  onNextClick: () => void
  changeRows: (row: number) => void
  onPrevClick: () => void
}

interface SchemaTable {
  id: string
  title: JSX.Element
  cellRenderer?: (props: CellRendererProps) => void
}

interface SelectProps {
  options: SellerSelect[]
  dataFilter: SellerSelect[]
  setDataFilter: (v: SellerSelect[]) => void
  multi: boolean
  customLabel: any
}

interface SellerSelect {
  label: string
  value: {
    id: string
    name: string
  }
}

interface StatusType {
  status: string
  bgColor: string
  fontColor: string
}

interface TableData {
  items: any
  schemaTable: SchemaTable[]
  loading: boolean
  sorting?: any
  hiddenColumn?: string[]
}
