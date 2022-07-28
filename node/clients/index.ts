import type { ClientsConfig } from '@vtex/api'
import type {
  ExternalInvoice,
} from 'vtex.marketplace-financial-commission'
import { IOClients, LRUCache } from '@vtex/api'
import { masterDataFor } from '@vtex/clients'

import Mail from './mail'
import Template from './template'

export class Clients extends IOClients {
  public get mail() {
    return this.getOrSet('mail', Mail)
  }


  public get template() {
    return this.getOrSet('template', Template)
  }

  public get externalInvoices() {
    return this.getOrSet(
      'externalinvoices',
      masterDataFor<ExternalInvoice>('externalinvoices')
    )
  }
}

const TIMEOUT_MS = 60000
const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('external-invoice-viewer', memoryCache)

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
      memoryCache,
    },
  },
}

export default clients
