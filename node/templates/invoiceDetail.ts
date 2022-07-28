import readFile from '../utils/readFile'
import { typeIntegration } from '../utils/typeIntegration'

export const GetBody = async (ctx: Context) => {

  const MESSAGE_BODY =
    readFile('../assets/invoiceDetailExternal.html')

  const invoiceDetailMessage = {
    Name: 'invoice-detail',
    FriendlyName: 'Invoice Detail',
    IsDefaultTemplate: false,
    IsPersisted: true,
    IsRemoved: false,
    Type: '',
    Templates: {
      email: {
        To: '{{message.to}}',
        Subject: 'Invoice Detail',
        Message: MESSAGE_BODY,
        Type: 'E',
        ProviderId: '00000000-0000-0000-0000-000000000000',
        IsActive: true,
        withError: false,
      },
      sms: {
        Type: 'S',
        IsActive: false,
        withError: false,
        Parameters: [],
      },
    },
  }

  return invoiceDetailMessage
}

export default GetBody
