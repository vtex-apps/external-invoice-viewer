# External Invoice Viewer

**_Note:_** _All endpoints exposed by this API, are similar to the ones exposed in [market-finantial-commission](https://github.com/vtex-apps/marketplace-financial-commission/blob/develop/docs/API_REST_README.md)_

# Email & Template

## Get template

![get-tag](https://img.shields.io/static/v1?label=&message=GET&color=blue)`https://{{accountmarketplace}}.myvtex.com/_v/external-invoice-viewer/segment/template`

Retrieve invoice template.
<br/>

### **Path parameters**

| Attribute          | Type   | Mandatory | Description                                  |
| ------------------ | ------ | --------- | -------------------------------------------- |
| accountmarketplace | string | Yes       | Name of the VTEX account of the marketplace. |

<br/>

```bash
curl --request GET \
  --url https://example.myvtex.com/_v/external-invoice-viewer/segment/template
```

<br/>

#### **Response**

`Message` field contains the html template used in the mailing.

<br />

![](https://img.shields.io/static/v1?label=&message=200&color=green) `OK`

```json
{
  "template": {
    "Name": "invoice-detail",
    "FriendlyName": "Invoice Detail",
    "Description": "Templeate used for invoice detail",
    "IsDefaultTemplate": false,
    "AccountId": null,
    "AccountName": null,
    "ApplicationId": null,
    "IsPersisted": true,
    "IsRemoved": false,
    "Type": "",
    "Templates": {
      "email": {
        "To": "{{message.to}}",
        "CC": null,
        "BCC": null,
        "Subject": "Invoice Detail",
        "Message": "<!DOCTYPE html..........",
        "Type": "E",
        "ProviderId": "336932c2-1ea6-4e30-8d59-3359b0aca076",
        "ProviderName": null,
        "IsActive": true,
        "withError": false
      },
      "sms": {
        "Type": "S",
        "ProviderId": null,
        "ProviderName": null,
        "IsActive": false,
        "withError": false,
        "Parameters": [
          {
            "Name": "Destination",
            "Value": "Destination"
          },
          {
            "Name": "MessageText",
            "Value": "MessageText"
          }
        ]
      }
    }
  }
}
```

---

## Send email

![](https://img.shields.io/static/v1?label=&message=POST&color=blue) `https://{{accountmarketplace}}.myvtex.com/_v/external-invoice-viewer/mail`

<br />

#### **Path parameters**

| Attribute          | Type   | Mandatory | Description                                  |
| ------------------ | ------ | --------- | -------------------------------------------- |
| accountmarketplace | string | Yes       | Name of the VTEX account of the marketplace. |

<br />

#### **Request**

| Attribute | Type   | Mandatory | Description                                                                                                              |
| --------- | ------ | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| email     | string | Yes       | Mail of the recipient to send.                                                                                           |
| jsonData  | string | Yes       | Contains the json in string format of the invoiced data to be sent in the email according to the parameterized template. |

```bash
curl --request POST \
  --url https://example.myvtex.com/_v/external-invoice-viewer/mail \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "destinataio@example.com",
	"jsonData": "jsonData" : {
        "jsonData": {
            "orders": [
                {
                "orderId": "123456-01",
                "sellerOrderId": "GCB-123456-01",
                "totalComission": 0,
                "totalOrderValue": 522.5,
                "totalDiscounts": 0,
                "totalOrdersItems": 522.5,
                "totalShipping": 0,
                "totalTax": 0,
                "totalOrderRate": null
                }
            ],
            "totalizers": { "subTotal": 0, "fee": 0, "total": 0 },
            "comment": "Invoicemanuallycreatedon2022-06-14"
        },
        "id": "sellerId1_ebf209071ae7",
        "status": "unpaid",
        "invoiceCreatedDate": "2022-06-14",
        "seller": {
            "name": "sellerName",
            "id": "sellerId1",
            "contact": { "phone": "xxxxxx" }
        }
    }
}'
```

<br />

```json
{
  "email": "destinataio@example.com",
  "jsonData": {
    "jsonData": {
      "orders": [
        {
          "orderId": "123456-01",
          "sellerOrderId": "GCB-123456-01",
          "totalComission": 0,
          "totalOrderValue": 522.5,
          "totalDiscounts": 0,
          "totalOrdersItems": 522.5,
          "totalShipping": 0,
          "totalTax": 0,
          "totalOrderRate": null
        }
      ],
      "totalizers": { "subTotal": 0, "fee": 0, "total": 0 },
      "comment": "Invoicemanuallycreatedon2022-06-14"
    },
    "id": "sellerId1_ebf209071ae7",
    "status": "unpaid",
    "invoiceCreatedDate": "2022-06-14",
    "seller": {
      "name": "sellerName",
      "id": "sellerId1",
      "contact": { "phone": "xxxxxx" }
    }
  }
}
```

<br />

#### **Response**

<br />

![](https://img.shields.io/static/v1?label=&message=200&color=green) `OK`

```shell
ok

```

<br />

# Invoices

Endpoints that allow the creation and listing of invoices externally.

## List invoices

![get-tag](https://img.shields.io/static/v1?label=&message=GET&color=blue) `https://{{accountmarketplace}}.myvtex.com/_v/private/external-invoice-viewer/invoice`

Retrieve the list of invoices.

#### **Path parameters**

| Attribute          | Type   | Mandatory | Description                                  |
| ------------------ | ------ | --------- | -------------------------------------------- |
| accountmarketplace | string | Yes       | Name of the VTEX account of the marketplace. |
| invoiceId          | string | Yes       | InvoiceId                                    |

<br />

#### **Request parameters allowed**

| Attribute          | Type   | Mandatory | Description                                                                         |
| ------------------ | ------ | --------- | ----------------------------------------------------------------------------------- |
| page               | number | No        | Page Number                                                                         |
| pageSize           | number | No        | Number of items per page                                                            |
| sellerName         | string | No        | Seller name                                                                         |
| sellerId           | string | No        | Seller Id to be returned in the query. You can also leave empty to get all sellers. |
| createdDateInitial | string | No        | Start creation date of consulting in `"yyyy-mm-dd"` format                          |
| createdDateEnd     | string | No        | End creation date of consulting in `"yyyy-mm-dd"` format                            |
| status             | string | No        | Invoice status                                                                      |

<br />

```bash
curl --request GET \
  --url https://example.myvtex.com/_v/private/external-invoice-viewer/invoice
```

<br />

#### **Response**

| Attribute          | Type         | Description                                        |
| ------------------ | ------------ | -------------------------------------------------- |
| data               | Array object | Contains data of the invoice created.              |
| id                 | string       | Invoice Id                                         |
| status             | string       | Invoice status                                     |
| invoiceCreatedDate | string       | Invoice creation date                              |
| seller             | object       | Seller Detail                                      |
| id                 | string       | Seller Id                                          |
| name               | string       | Seller name                                        |
| contact            | object       | Seller's contact information                       |
| email              | string       | Seller Email                                       |
| jsonData           | JSON string  | Contains detail order data of the invoice created. |
| comment            | string       | Comment on the invoice created.                    |
| pagination         | object       | Paging details object                              |
| total              | number       | Total number of items                              |
| page               | number       | Current page                                       |
| pageSize           | number       | Paging total per Page                              |

<br />

![ok-tag](https://img.shields.io/static/v1?label=&message=200&color=green) `OK`

```json
{
    "data": [
        {
            "id": "seller1_644b6f1841cf",
            "status": "unpaid",
            "accountName": "marketplace",
            "seller": {
                "id": "seller1",
                "name": "seller1_name",
                "contact": {
                    "email": "email@vtex.com.br"
                }
            },
            "invoiceCreatedDate": "2022-07-01",
            "jsonData": "{\"orders\":[{\"orderId\":\"123456789-01\",\"orderIdERP\":\"orderERP-123\",\"totalComission\":4.12,\"totalOrderValue\":38.5,\"totalDiscounts\":0,\"totalOrdersItems\":24,\"totalShipping\":14.5,\"totalTax\":0},{\"orderId\":\"456-01\",\"orderIdERP\":\"orderERP-456\",\"totalComission\":0,\"totalOrderValue\":20,\"totalDiscounts\":0,\"totalOrdersItems\":20,\"totalShipping\":0,\"totalTax\":0},{\"orderId\":\"789-01\",\"orderIdERP\":\"orderERP-789\",\"totalComission\":2.25,\"totalOrderValue\":14,\"totalDiscounts\":0,\"totalOrdersItems\":9,\"totalShipping\":5,\"totalTax\":0}],\"totalizers\":{\"subTotal\":6.37,\"fee\":0,\"total\":6.37}}",
            "comment": "Invoice created by external API REST integration on 2022-07-07"
        },
        {
          ....
        }
    ],
    "pagination": {
        "page": 1,
        "pageSize": 100,
        "total": 1
    }
}

```

<br />

---

## Get Invoice

![get-tag](https://img.shields.io/static/v1?label=&message=GET&color=blue) `https://{{accountmarketplace}}.myvtex.com/_v/private/external-invoice-viewer/invoice/{{invoiceId}}`

Retrieve a single invoice.

<br />

#### **Path parameters**

| Attribute          | Type   | Mandatory | Description                                  |
| ------------------ | ------ | --------- | -------------------------------------------- |
| accountmarketplace | string | Yes       | Name of the VTEX account of the marketplace. |
| invoiceId          | string | Yes       | InvoiceId                                    |

<br />

```bash
curl --request GET \
  --url https://example.myvtex.com/_v/private/external-invoice-viewer/invoice/12345655
```

<br />

#### **Response**

| Attribute          | Type         | Description                                  |
| ------------------ | ------------ | -------------------------------------------- |
| data               | Array object | Contains data of the invoice created.        |
| id                 | string       | Invoice Id                                   |
| status             | string       | Invoice status                               |
| invoiceCreatedDate | string       | Invoice creation date                        |
| seller             | object       | Seller Detail                                |
| id                 | string       | Seller Id                                    |
| name               | string       | Seller name                                  |
| contact            | object       | Seller's contact information                 |
| email              | string       | Seller Email                                 |
| jsonData           | JSON string  | Contains detail data of the invoice created. |
| comment            | string       | Comment on the invoice created.              |
| pagination         | object       | Paging details object                        |
| total              | number       | Total number of items                        |
| page               | number       | Current page                                 |
| pageSize           | number       | Paging total per Page                        |

<br />

![ok-tag](https://img.shields.io/static/v1?label=&message=200&color=green) `OK`

```json
{
  "data": [
    {
      "id": "seller1_644b6f1841cf",
      "status": "unpaid",
      "accountName": "marketplace",
      "seller": {
        "id": "seller1",
        "name": "seller1_name",
        "contact": {
          "email": "email@vtex.com.br"
        }
      },
      "invoiceCreatedDate": "2022-07-01",
      "jsonData": "{\"orders\":[{\"orderId\":\"123456789-01\",\"orderIdERP\":\"orderERP-123\",\"totalComission\":4.12,\"totalOrderValue\":38.5,\"totalDiscounts\":0,\"totalOrdersItems\":24,\"totalShipping\":14.5,\"totalTax\":0},{\"orderId\":\"456-01\",\"orderIdERP\":\"orderERP-456\",\"totalComission\":0,\"totalOrderValue\":20,\"totalDiscounts\":0,\"totalOrdersItems\":20,\"totalShipping\":0,\"totalTax\":0},{\"orderId\":\"789-01\",\"orderIdERP\":\"orderERP-789\",\"totalComission\":2.25,\"totalOrderValue\":14,\"totalDiscounts\":0,\"totalOrdersItems\":9,\"totalShipping\":5,\"totalTax\":0}],\"totalizers\":{\"subTotal\":6.37,\"fee\":0,\"total\":6.37}}",
      "comment": "Invoice created by external API REST integration on 2022-07-07"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 100,
    "total": 1
  }
}
```

<br />

---

</br>

## Create External Invoice

![post-tag](https://img.shields.io/static/v1?label=&message=POST&color=brightgreen) `https://{{accountmarketplace}}.myvtex.com/_v/private/external-invoice-viewer/invoice`

Create a single external invoice.

<br />

#### **Path parameters**

| Attribute          | Type   | Mandatory | Description                                  |
| ------------------ | ------ | --------- | -------------------------------------------- |
| accountmarketplace | string | Yes       | Name of the VTEX account of the marketplace. |

<br />

#### **Request**

| Attribute          | Type        | Mandatory | Description                                                                                                                                                                                                                            |
| ------------------ | ----------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status             | string      | Yes       | Status invoice. The allowed values are: paid, unpaid, partial.                                                                                                                                                                         |
| invoiceCreatedDate | string      | Yes       | Creation date of invoice in `"yyyy-mm-dd"` format                                                                                                                                                                                      |
| seller             | object      | Yes       | Seller Detail                                                                                                                                                                                                                          |
| name               | string      | Yes       | Seller name                                                                                                                                                                                                                            |
| id                 | string      | Yes       | Seller Id                                                                                                                                                                                                                              |
| contact            | object      | Yes       | Seller contact information                                                                                                                                                                                                             |
| email              | string      | Yes       | Seller Email                                                                                                                                                                                                                           |
| jsonData           | JSON string | Yes       | Contains detail order data of the invoice created in JSON string format. The content of the string is customizable customer. Take into account the fields sent as they must exist in the email template to report the created invoice. |

<br />

```json
{
  "status": "unpaid",
  "invoiceCreatedDate": "2022-08-01",
  "seller": {
    "name": "sellerName",
    "id": "sellerId",
    "contact": {
      "email": "email@example.com"
    }
  },
  "jsonData": "{\"orders\":[{\"orderId\":\"123-01\",\"orderIdERP\":\"orderERP-123\",\"totalComission\":4.12,\"totalOrderValue\":38.5,\"totalDiscounts\":0,\"totalOrdersItems\":24,\"totalShipping\":14.5,\"totalTax\":0},{\"orderId\":\"456-01\",\"orderIdERP\":\"orderERP-456\",\"totalComission\":0,\"totalOrderValue\":20,\"totalDiscounts\":0,\"totalOrdersItems\":20,\"totalShipping\":0,\"totalTax\":0},{\"orderId\":\"103333-01\",\"orderIdERP\":\"orderERP-789\",\"totalComission\":2.25,\"totalOrderValue\":14,\"totalDiscounts\":0,\"totalOrdersItems\":9,\"totalShipping\":5,\"totalTax\":0}],\"totalizers\":{\"subTotal\":6.37,\"fee\":0,\"total\":6.37}}"
}
```

<br />

```bash
curl --location --request POST 'https://{{accountmarketplace}}.myvtex.com/_v/private/external-invoice-viewer/invoice' \
--header 'Content-Type: application/json' \
--data-raw '{
	"status": "unpaid",
	"invoiceCreatedDate": "2022-08-01",
	"seller": {
		"name": "sellerName",
		"id": "sellerId",
		"contact": {
			"email": "email@example.com"
		}
	},
	"jsonData": "{\"orders\":[{\"orderId\":\"123-01\",\"orderIdERP\":\"orderERP-123\",\"totalComission\":4.12,\"totalOrderValue\":38.5,\"totalDiscounts\":0,\"totalOrdersItems\":24,\"totalShipping\":14.5,\"totalTax\":0},{\"orderId\":\"456-01\",\"orderIdERP\":\"orderERP-456\",\"totalComission\":0,\"totalOrderValue\":20,\"totalDiscounts\":0,\"totalOrdersItems\":20,\"totalShipping\":0,\"totalTax\":0},{\"orderId\":\"103333-01\",\"orderIdERP\":\"orderERP-789\",\"totalComission\":2.25,\"totalOrderValue\":14,\"totalDiscounts\":0,\"totalOrdersItems\":9,\"totalShipping\":5,\"totalTax\":0}],\"totalizers\":{\"subTotal\":6.37,\"fee\":0,\"total\":6.37}}"
}'
```

<br />

#### **Response**

![ok-tag](https://img.shields.io/static/v1?label=&message=200&color=green) `OK`

```json
{
  "message": "Invoice Created, Shortly you will receive an email with the invoice created to your email address. email@example.com",
  "id": "Id_0c0d6c5e7f2c"
}
```

<br />

---

## Update Invoice

![](https://img.shields.io/static/v1?label=&message=PATCH&color=orange) `https://{{accountmarketplace}}.myvtex.com/_v/private/external-invoice-viewer/invoice/{{invoiceId}}`

Update a single external invoice.

> **Warning**: The update can be performed on the entire object, or on a single field. Keep in mind that in case the update is on a field that belongs to a previous object, e.g. the `email` field belongs to the `contact` object, the body structure must be respected.

<br />

#### **Path parameters**

| Attribute          | Type   | Mandatory | Description                                  |
| ------------------ | ------ | --------- | -------------------------------------------- |
| accountmarketplace | string | Yes       | Name of the VTEX account of the marketplace. |
| invoiceId          | string | Yes       | InvoiceId                                    |

<br />

#### **Request**

| Attribute          | Type        | Description                                                              |
| ------------------ | ----------- | ------------------------------------------------------------------------ |
| status             | string      | Invoice status                                                           |
| invoiceCreatedDate | string      | Invoice creation date                                                    |
| seller             | object      | Seller Detail                                                            |
| name               | string      | Seller name                                                              |
| id                 | string      | Seller Id                                                                |
| contact            | object      | Seller's contact information                                             |
| email              | string      | Seller Email                                                             |
| jsonData           | JSON string | Contains detail order data of the invoice created in JSON string format. |

<br />

```json
{
  "seller": {
    "contact": {
      "email": "emailName@domain.com"
    }
  }
}
```

<br />

```bash
curl --location --request PATCH 'https://{{accountmarketplace}}.myvtex.com/_v/private/external-invoice-viewer/invoice/{{invoiceId}}' \
--header 'Content-Type: application/json' \
--data-raw '{
	"seller": {
		"contact": {
			"email": "emailName@domain.com"
		}
	}
}'
```

<br />

#### **Response**

![](https://img.shields.io/static/v1?label=&message=200&color=green) `OK`

```json
{
  "invoiceId": "Id_0c0d6c5e7f2c",
  "message": "The invoice has been successfully update "
}
```

<br />
__________________________________________________

## Delete Invoice

![](https://img.shields.io/static/v1?label=&message=DELETE&color=red) `https://{{accountmarketplace}}.myvtex.com/_v/private/external-invoice-viewer/invoice/{{invoiceId}}`

Delete a single external invoice.

> **warning** This process is definitive.

<br />

#### **Path parameters**

| Attribute          | Type   | Mandatory | Description                                  |
| ------------------ | ------ | --------- | -------------------------------------------- |
| accountmarketplace | string | Yes       | Name of the VTEX account of the marketplace. |
| invoiceId          | string | Yes       | InvoiceId                                    |

<br />

```bash
curl --location --request DELETE 'https://{{accountmarketplace}}.myvtex.com/_v/private/external-invoice-viewer/invoice/{{invoiceId}}' \¿

```

<br />

#### **Response**

![](https://img.shields.io/static/v1?label=&message=200&color=green) `OK`

```json
{
  "invoiceId": "Id_1234566",
  "message": "The invoice has been successfully deleted "
}
```

<br />

---
