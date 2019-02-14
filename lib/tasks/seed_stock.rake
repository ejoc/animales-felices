
task :seed_stock => :environment do
  # products = Product.all
  shampo = Product.find_by(name: 'Shampoo keracleen')
  if shampo
    product_stock = StockProduct.find_or_initialize_by(product_id: shampo.id)
    product_stock.stock = product_stock.stock + 24
    product_stock.save!
  end

  rimadyl = Product.find_by(name: 'Rimadyl')
  if rimadyl
    product_stock = StockProduct.find_or_initialize_by(product_id: rimadyl.id)
    product_stock.stock = product_stock.stock + 160
    product_stock.save!
  end

  snack = Product.find_by(name: 'Snack relajante')
  if snack
    product_stock = StockProduct.find_or_initialize_by(product_id: snack.id)
    product_stock.stock = product_stock.stock + 1
    product_stock.save!
  end
end