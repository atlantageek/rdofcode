# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_09_03_135059) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "h3"
  enable_extension "plpgsql"
  enable_extension "postgis"
  enable_extension "postgis_raster"

  create_table "addresses", id: :integer, default: -> { "nextval('addresses_ogc_fid_seq'::regclass)" }, force: :cascade do |t|
    t.string "ident"
    t.string "unit"
    t.string "number"
    t.string "street"
    t.string "city"
    t.string "district"
    t.string "region"
    t.string "postcode"
    t.string "hashit"
    t.geometry "wkb_geometry", limit: {:srid=>4326, :type=>"st_point"}
    t.index ["wkb_geometry"], name: "addresses_geom_idx", using: :gist
    t.index ["wkb_geometry"], name: "addresses_wkb_geometry_geom_idx", using: :gist
  end

  create_table "aois", force: :cascade do |t|
    t.integer "user_id"
    t.string "census_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.geometry "geom", limit: {:srid=>0, :type=>"multi_polygon"}
  end

  create_table "boxes", primary_key: "gid", id: :serial, force: :cascade do |t|
    t.float "latitude"
    t.float "longitude"
    t.geometry "geom", limit: {:srid=>0, :type=>"geometry"}
    t.string "name"
    t.string "box_type"
    t.index ["geom"], name: "boxes_gist", using: :gist
  end

  create_table "cbg_data", id: false, force: :cascade do |t|
    t.string "census_id", limit: 255
    t.string "state_abbreviation", limit: 10
    t.string "county_name", limit: 255
    t.integer "elgible_locations"
    t.integer "reserve_price"
  end

  create_table "census_blocks", primary_key: "ogc_fid", id: :serial, force: :cascade do |t|
    t.string "statefp20", limit: 2
    t.string "countyfp20", limit: 3
    t.string "tractce20", limit: 6
    t.string "blockce20", limit: 4
    t.string "geoid20", limit: 15
    t.string "name20", limit: 10
    t.string "mtfcc20", limit: 5
    t.string "ur20", limit: 1
    t.string "uace20", limit: 5
    t.string "uatype20", limit: 1
    t.string "funcstat20", limit: 1
    t.decimal "aland20", precision: 14
    t.decimal "awater20", precision: 14
    t.string "intptlat20", limit: 11
    t.string "intptlon20", limit: 12
    t.decimal "housing20", precision: 12
    t.decimal "pop20", precision: 12
    t.geometry "wkb_geometry", limit: {:srid=>4269, :type=>"multi_polygon"}
    t.geometry "geom", limit: {:srid=>4326, :type=>"multi_polygon"}
    t.index ["geoid20"], name: "census_blocks_geoid20", unique: true
    t.index ["geom"], name: "census_blocks_geom_idx", using: :gist
    t.index ["wkb_geometry"], name: "census_blocks_wkb_geometry_geom_idx", using: :gist
  end

  create_table "fl01", primary_key: "gid", id: :serial, force: :cascade do |t|
    t.string "name", limit: 80
    t.string "descriptio", limit: 80
    t.date "timestamp"
    t.date "begin"
    t.date "end"
    t.string "altitudemo", limit: 80
    t.integer "tessellate"
    t.integer "extrude"
    t.integer "visibility"
    t.integer "draworder"
    t.string "icon", limit: 80
    t.decimal "xfm_id"
    t.string "contractor", limit: 80
    t.string "descr", limit: 80
    t.string "descr2", limit: 80
    t.string "dev_id", limit: 80
    t.string "job_desc", limit: 80
    t.string "job_name", limit: 80
    t.decimal "length"
    t.decimal "link1"
    t.string "model", limit: 80
    t.decimal "mslink"
    t.string "owner", limit: 80
    t.string "poleno", limit: 80
    t.string "identif", limit: 80
    t.string "state_id", limit: 80
    t.string "cable_type", limit: 80
    t.string "inst_type", limit: 80
    t.string "role_id", limit: 80
    t.geometry "geom", limit: {:srid=>0, :type=>"geometry"}
    t.integer "start_point"
    t.index ["geom"], name: "fl01_gist", using: :gist
  end

# Could not dump table "hexes7" because of following StandardError
#   Unknown type 'h3index' for column 'h3_to_children'

# Could not dump table "hexes8" because of following StandardError
#   Unknown type 'h3index' for column 'h3idx'

# Could not dump table "hexstats" because of following StandardError
#   Unknown type 'h3index' for column 'h3'

  create_table "importzones", id: false, force: :cascade do |t|
    t.serial "gid", null: false
    t.string "name", limit: 255
    t.geometry "geom", limit: {:srid=>4326, :type=>"st_polygon"}
  end

  create_table "layers", force: :cascade do |t|
    t.string "layer_type"
    t.string "layer_url"
    t.string "layer_name"
    t.boolean "base_layer"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

# Could not dump table "maxheight" because of following StandardError
#   Unknown type 'h3index' for column 'h3ids'

# Could not dump table "population" because of following StandardError
#   Unknown type 'h3index' for column 'h3'

  create_table "rdof_tracts", primary_key: "gid", id: :serial, force: :cascade do |t|
    t.bigint "locations"
    t.bigint "reserve"
    t.string "county", limit: 254
    t.string "state", limit: 254
    t.string "census_id", limit: 254
    t.geometry "geom", limit: {:srid=>0, :type=>"multi_polygon"}
    t.string "state_abbreviation", limit: 20
    t.string "county_name", limit: 255
    t.integer "elgible_locations"
    t.integer "reserve_price"
    t.index ["geom"], name: "rdof_tracts_geom_idx", using: :gist
  end

# Could not dump table "srtm" because of following StandardError
#   Unknown type 'raster' for column 'rast'

# Could not dump table "srtmup" because of following StandardError
#   Unknown type 'raster' for column 'rast'

  create_table "stats", primary_key: "oid", id: :integer, default: -> { "nextval('stats_gid_seq'::regclass)" }, force: :cascade do |t|
    t.string "census_id", limit: 20
    t.integer "income"
    t.integer "population"
    t.geometry "geom", limit: {:srid=>4326, :type=>"multi_polygon"}
    t.index ["geom"], name: "stats_geom_idx", using: :gist
    t.index ["income"], name: "income_idx"
  end

  create_table "subscriber_data_raw", id: false, force: :cascade do |t|
    t.string "mac_address", limit: 255, null: false
    t.text "street_address"
    t.text "city"
    t.string "state", limit: 10
    t.string "zip", limit: 20
    t.decimal "latitude"
    t.decimal "longitude"
    t.string "node_name", limit: 255
    t.string "partial_match", limit: 255
    t.geometry "geom", limit: {:srid=>4326, :type=>"st_point"}
  end

  create_table "tiger", primary_key: "gid", id: :serial, force: :cascade do |t|
    t.string "statefp10", limit: 2
    t.string "countyfp10", limit: 3
    t.string "tractce10", limit: 6
    t.string "blockce10", limit: 4
    t.string "geoid10", limit: 15
    t.string "name10", limit: 10
    t.string "mtfcc10", limit: 5
    t.string "ur10", limit: 1
    t.string "uace10", limit: 5
    t.string "uatype", limit: 1
    t.string "funcstat10", limit: 1
    t.float "aland10"
    t.float "awater10"
    t.string "intptlat10", limit: 11
    t.string "intptlon10", limit: 12
    t.geometry "geom", limit: {:srid=>0, :type=>"multi_polygon"}
    t.string "census_id", limit: 15
    t.index ["census_id"], name: "census_id_idx"
    t.index ["geom"], name: "tiger_geom_idx", using: :gist
    t.index ["geom"], name: "tiger_geom_idx1", using: :gist
    t.index ["geom"], name: "tiger_geom_idx10", using: :gist
    t.index ["geom"], name: "tiger_geom_idx11", using: :gist
    t.index ["geom"], name: "tiger_geom_idx12", using: :gist
    t.index ["geom"], name: "tiger_geom_idx13", using: :gist
    t.index ["geom"], name: "tiger_geom_idx14", using: :gist
    t.index ["geom"], name: "tiger_geom_idx15", using: :gist
    t.index ["geom"], name: "tiger_geom_idx16", using: :gist
    t.index ["geom"], name: "tiger_geom_idx17", using: :gist
    t.index ["geom"], name: "tiger_geom_idx18", using: :gist
    t.index ["geom"], name: "tiger_geom_idx19", using: :gist
    t.index ["geom"], name: "tiger_geom_idx2", using: :gist
    t.index ["geom"], name: "tiger_geom_idx20", using: :gist
    t.index ["geom"], name: "tiger_geom_idx21", using: :gist
    t.index ["geom"], name: "tiger_geom_idx22", using: :gist
    t.index ["geom"], name: "tiger_geom_idx23", using: :gist
    t.index ["geom"], name: "tiger_geom_idx24", using: :gist
    t.index ["geom"], name: "tiger_geom_idx25", using: :gist
    t.index ["geom"], name: "tiger_geom_idx26", using: :gist
    t.index ["geom"], name: "tiger_geom_idx27", using: :gist
    t.index ["geom"], name: "tiger_geom_idx28", using: :gist
    t.index ["geom"], name: "tiger_geom_idx29", using: :gist
    t.index ["geom"], name: "tiger_geom_idx3", using: :gist
    t.index ["geom"], name: "tiger_geom_idx30", using: :gist
    t.index ["geom"], name: "tiger_geom_idx31", using: :gist
    t.index ["geom"], name: "tiger_geom_idx32", using: :gist
    t.index ["geom"], name: "tiger_geom_idx33", using: :gist
    t.index ["geom"], name: "tiger_geom_idx34", using: :gist
    t.index ["geom"], name: "tiger_geom_idx35", using: :gist
    t.index ["geom"], name: "tiger_geom_idx36", using: :gist
    t.index ["geom"], name: "tiger_geom_idx37", using: :gist
    t.index ["geom"], name: "tiger_geom_idx38", using: :gist
    t.index ["geom"], name: "tiger_geom_idx39", using: :gist
    t.index ["geom"], name: "tiger_geom_idx4", using: :gist
    t.index ["geom"], name: "tiger_geom_idx40", using: :gist
    t.index ["geom"], name: "tiger_geom_idx41", using: :gist
    t.index ["geom"], name: "tiger_geom_idx42", using: :gist
    t.index ["geom"], name: "tiger_geom_idx43", using: :gist
    t.index ["geom"], name: "tiger_geom_idx44", using: :gist
    t.index ["geom"], name: "tiger_geom_idx45", using: :gist
    t.index ["geom"], name: "tiger_geom_idx46", using: :gist
    t.index ["geom"], name: "tiger_geom_idx47", using: :gist
    t.index ["geom"], name: "tiger_geom_idx48", using: :gist
    t.index ["geom"], name: "tiger_geom_idx49", using: :gist
    t.index ["geom"], name: "tiger_geom_idx5", using: :gist
    t.index ["geom"], name: "tiger_geom_idx50", using: :gist
    t.index ["geom"], name: "tiger_geom_idx51", using: :gist
    t.index ["geom"], name: "tiger_geom_idx52", using: :gist
    t.index ["geom"], name: "tiger_geom_idx53", using: :gist
    t.index ["geom"], name: "tiger_geom_idx54", using: :gist
    t.index ["geom"], name: "tiger_geom_idx55", using: :gist
    t.index ["geom"], name: "tiger_geom_idx6", using: :gist
    t.index ["geom"], name: "tiger_geom_idx7", using: :gist
    t.index ["geom"], name: "tiger_geom_idx8", using: :gist
    t.index ["geom"], name: "tiger_geom_idx9", using: :gist
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "db_name"
    t.string "tech_used"
    t.boolean "consumer"
    t.decimal "upstream"
    t.decimal "downstream"
  end

end
