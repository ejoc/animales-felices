xml.instruct!
xml.factura({ "id"=>"comprobante", "version": "2.0.0" }) do
  xml.infoTributaria do
    xml.razonSocial "PABLO GREGORIO TRIVIÑO ULLOA"
    xml.ruc "0913275566001"
    xml.secuencial @invoice.no
    xml.estab "001"
    xml.ptoEmi "001"
  end

  xml.infoFactura do
    xml.fechaEmision @invoice.created_at
    xml.razonSocialComprador @invoice.client.name
    xml.identificacionComprador @invoice.client.cedula
    xml.totalSinImpuestos @invoice.total
  end

  xml.detalles do
    @invoice.details.each do |detail|
      xml.detalle do
        xml.descripcion detail.item.name
        xml.cantidad detail.quantity
        xml.precioUnitario detail.price_unit
        xml.precioTotalSinImpuesto detail.price_total
      end
    end
  end
end
# number_to_currency