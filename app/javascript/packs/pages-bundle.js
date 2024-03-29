import ReactOnRails from 'react-on-rails'

import AgendaApp from '../bundles/Agenda/startup/AgendaApp'

import InvoiceApp from '../bundles/Invoice/startup/InvoiceApp'

import PurchaseInvoiceApp from '../bundles/PurchaseInvoice/startup/PurchaseInvoiceApp'

import AccountApp from '../bundles/Account/startup/AccountApp'

import ReportApp from '../bundles/Report/startup/ReportApp'

import SalesReportApp from '../bundles/SalesReport/startup/SalesReportApp'

ReactOnRails.register({
  AgendaApp,
  InvoiceApp,
  PurchaseInvoiceApp,
  ReportApp,
  SalesReportApp,
  AccountApp,
})
