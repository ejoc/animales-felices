import ReactOnRails from 'react-on-rails'

import AgendaApp from '../bundles/Agenda/startup/AgendaApp'

import InvoiceApp from '../bundles/Invoice/startup/InvoiceApp'

ReactOnRails.register({
  AgendaApp,
  InvoiceApp,
})
