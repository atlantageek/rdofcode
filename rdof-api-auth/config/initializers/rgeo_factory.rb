RGeo::ActiveRecord::SpatialFactoryStore.instance.tap do |config|
    config.default = RGeo::Geographic.spherical_factory(uses_lenient_assertions: true)
  
  
    # config.register(RGeo::Geos.factory(has_z_coordinate: true, srid: 2263), srid: 2263, geo_type: 'MultiPolygon',
    #                                                                         has_m: false, has_z: true,
    #                                                                         sql_type: 'geometry(MultiPolygonZ,2263)')
  end