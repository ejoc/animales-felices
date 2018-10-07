import ReactOnRails from 'react-on-rails'

import AgendaApp from '../bundles/Agenda/startup/AgendaApp'

import InvoiceApp from '../bundles/Invoice/startup/InvoiceApp'

import PurchaseInvoiceApp from '../bundles/PurchaseInvoice/startup/PurchaseInvoiceApp'

ReactOnRails.register({
  AgendaApp,
  InvoiceApp,
  PurchaseInvoiceApp,
})
