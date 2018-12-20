# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_11_20_035350) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "appointments", force: :cascade do |t|
    t.bigint "service_id"
    t.bigint "specialist_id"
    t.string "client_name"
    t.string "client_phone"
    t.string "client_email"
    t.datetime "start_time"
    t.datetime "end_time"
    t.boolean "canceled", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["service_id"], name: "index_appointments_on_service_id"
    t.index ["specialist_id"], name: "index_appointments_on_specialist_id"
  end

  create_table "clients", force: :cascade do |t|
    t.string "cedula"
    t.index ["cedula"], name: "index_clients_on_cedula", unique: true
  end

  create_table "companies", force: :cascade do |t|
    t.string "bin"
    t.string "name"
    t.string "address"
    t.string "phone"
    t.string "website"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "income_product_details", force: :cascade do |t|
    t.bigint "income_product_id"
    t.bigint "product_id"
    t.float "quantity"
    t.float "price_unit"
    t.float "price_total"
    t.index ["income_product_id"], name: "index_income_product_details_on_income_product_id"
    t.index ["product_id"], name: "index_income_product_details_on_product_id"
  end

  create_table "income_products", force: :cascade do |t|
    t.bigint "specialist_id"
    t.bigint "supplier_id"
    t.float "sub_total"
    t.float "total"
    t.float "iva"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["specialist_id"], name: "index_income_products_on_specialist_id"
    t.index ["supplier_id"], name: "index_income_products_on_supplier_id"
  end

  create_table "invoice_details", force: :cascade do |t|
    t.bigint "invoice_id"
    t.bigint "item_id"
    t.float "quantity"
    t.float "price_unit"
    t.float "price_total"
    t.index ["invoice_id"], name: "index_invoice_details_on_invoice_id"
    t.index ["item_id"], name: "index_invoice_details_on_item_id"
  end

  create_table "invoices", force: :cascade do |t|
    t.string "no"
    t.bigint "client_id"
    t.bigint "specialist_id"
    t.bigint "payment_method_id"
    t.float "sub_total"
    t.float "total"
    t.float "iva"
    t.boolean "canceled", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["client_id"], name: "index_invoices_on_client_id"
    t.index ["no"], name: "index_invoices_on_no", unique: true
    t.index ["payment_method_id"], name: "index_invoices_on_payment_method_id"
    t.index ["specialist_id"], name: "index_invoices_on_specialist_id"
  end

  create_table "items", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.float "price"
    t.string "actable_type"
    t.bigint "actable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["actable_type", "actable_id"], name: "index_items_on_actable_type_and_actable_id"
  end

  create_table "payment_methods", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "people", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "address"
    t.string "phone"
    t.string "actable_type"
    t.bigint "actable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["actable_type", "actable_id"], name: "index_people_on_actable_type_and_actable_id"
  end

  create_table "product_categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "products", force: :cascade do |t|
    t.string "brand"
    t.bigint "unit_type_id"
    t.bigint "product_category_id"
    t.index ["product_category_id"], name: "index_products_on_product_category_id"
    t.index ["unit_type_id"], name: "index_products_on_unit_type_id"
  end

  create_table "services", force: :cascade do |t|
    t.integer "duration_min"
  end

  create_table "specialist_services", force: :cascade do |t|
    t.bigint "specialist_id"
    t.bigint "service_id"
    t.boolean "active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["service_id"], name: "index_specialist_services_on_service_id"
    t.index ["specialist_id", "service_id"], name: "index_specialist_services_on_specialist_id_and_service_id", unique: true
    t.index ["specialist_id"], name: "index_specialist_services_on_specialist_id"
  end

  create_table "specialists", force: :cascade do |t|
    t.bigint "user_id"
    t.index ["user_id"], name: "index_specialists_on_user_id"
  end

  create_table "stock_products", force: :cascade do |t|
    t.bigint "product_id"
    t.float "stock", default: 0.0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_stock_products_on_product_id"
  end

  create_table "suppliers", force: :cascade do |t|
    t.string "cedula"
    t.bigint "company_id"
    t.string "company_role"
    t.index ["cedula"], name: "index_suppliers_on_cedula", unique: true
    t.index ["company_id"], name: "index_suppliers_on_company_id"
  end

  create_table "unit_types", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "admin", default: false
    t.boolean "account_active", default: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "appointments", "services"
  add_foreign_key "appointments", "specialists"
  add_foreign_key "income_product_details", "income_products"
  add_foreign_key "income_product_details", "products"
  add_foreign_key "income_products", "specialists"
  add_foreign_key "income_products", "suppliers"
  add_foreign_key "invoice_details", "invoices"
  add_foreign_key "invoice_details", "items"
  add_foreign_key "invoices", "clients"
  add_foreign_key "invoices", "payment_methods"
  add_foreign_key "invoices", "specialists"
  add_foreign_key "products", "product_categories"
  add_foreign_key "products", "unit_types"
  add_foreign_key "specialist_services", "services"
  add_foreign_key "specialist_services", "specialists"
  add_foreign_key "specialists", "users"
  add_foreign_key "stock_products", "products"
  add_foreign_key "suppliers", "companies"
end
