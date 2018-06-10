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

ActiveRecord::Schema.define(version: 2018_06_10_025921) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "appointments", force: :cascade do |t|
    t.bigint "client_id"
    t.bigint "service_id"
    t.bigint "doctor_id"
    t.date "date"
    t.time "start_time"
    t.time "end_time"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["client_id"], name: "index_appointments_on_client_id"
    t.index ["doctor_id"], name: "index_appointments_on_doctor_id"
    t.index ["service_id"], name: "index_appointments_on_service_id"
  end

  create_table "clients", force: :cascade do |t|
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

  create_table "doctors", force: :cascade do |t|
    t.bigint "user_id"
    t.index ["user_id"], name: "index_doctors_on_user_id"
  end

  create_table "invoice_details", force: :cascade do |t|
    t.bigint "invoice_id"
    t.bigint "item_id"
    t.decimal "cantidad"
    t.decimal "price_unit", precision: 5, scale: 2
    t.decimal "price_total", precision: 5, scale: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["invoice_id"], name: "index_invoice_details_on_invoice_id"
    t.index ["item_id"], name: "index_invoice_details_on_item_id"
  end

  create_table "invoices", force: :cascade do |t|
    t.bigint "client_id"
    t.bigint "doctor_id"
    t.decimal "sub_total", precision: 5, scale: 2
    t.decimal "total", precision: 5, scale: 2
    t.decimal "iva", precision: 5, scale: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["client_id"], name: "index_invoices_on_client_id"
    t.index ["doctor_id"], name: "index_invoices_on_doctor_id"
  end

  create_table "items", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.decimal "price", precision: 5, scale: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

# Could not dump table "people" because of following StandardError
#   Unknown type 'gender' for column 'gender'

  create_table "product_categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "products", force: :cascade do |t|
    t.string "unit_type"
    t.bigint "product_category_id"
    t.index ["product_category_id"], name: "index_products_on_product_category_id"
  end

  create_table "services", force: :cascade do |t|
    t.integer "duration_min"
  end

  create_table "suppliers", force: :cascade do |t|
    t.bigint "company_id"
    t.string "company_role"
    t.index ["company_id"], name: "index_suppliers_on_company_id"
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
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "appointments", "clients"
  add_foreign_key "appointments", "doctors"
  add_foreign_key "appointments", "services"
  add_foreign_key "doctors", "users"
  add_foreign_key "invoice_details", "invoices"
  add_foreign_key "invoice_details", "items"
  add_foreign_key "invoices", "clients"
  add_foreign_key "invoices", "doctors"
  add_foreign_key "products", "product_categories"
  add_foreign_key "suppliers", "companies"
end
