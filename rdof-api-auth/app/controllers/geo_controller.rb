

class GeoController < ApplicationController
  def searcharea()
    start= params[:start]
    limit= params[:limit]
    data=geo_params
  
    geometry = params[:features][0][:geometry].to_json
    query = "select * from addresses where st_contains(st_geomFromGeoJson(\'#{geometry}\'),wkb_geometry) limit #{limit} offset #{start}"
    addresses = Address.connection.execute(query)
    render json: addresses
  end

  def getLocation()
    latitude=params[:lat]
    longitude=params[:lng]
    query = "select st_AsGeoJSON(st_forcepolygonccw(geom)) as geom, census_id from stats where st_contains(geom, st_setsrid(st_point(#{longitude},#{latitude}), 4326))"
    geom = ActiveRecord::Base.connection.execute(query).first
    render json: geom
  end
  def storeAois()
    puts(params[:userid])
    polygon_list = params["_json"]
    user =User.find(params[:userid])
    user.aois.destroy_all()
    polygon_list.each do |polygon|
      logger.debug("============================")
      logger.debug(polygon["census_id"])
      query = "insert into aois (geom, census_id, user_id, created_at, updated_at) values (st_geomFromGeoJson(\'#{polygon["polygon"]}\'),\'#{polygon["census_id"]}\', #{user.id},now(),now())"
      logger.debug(query)
      geom=ActiveRecord::Base.connection.execute(query)
      # st_geom = RGeo::GeoJSON.decode(polygon["polygon"], geo_factory: RGeo::Geographic.simple_mercator_factory)
      # logger.debug("DEBUGMEx")
      # logger.debug(st_geom)
      # logger.debug(st_geom.as_text)
      # polygon_stripped={geom: st_geom.as_text, census_id: polygon["census_id"], user_id: params[:userid]}
      # Aoi.create(polygon_stripped)
    end
    render json: {status: true}
  end
  def getAois()
    puts(params[:userid])
    user = User.find(params[:userid])
    query = 
      <<~HEREDOC
      select st_asgeojson(st_forcepolygonccw(aois.geom)) as geom, aois.census_id, county, state, locations,reserve, count(*) as addr_cnt
      from aois 
        left join rdof_tracts 
          on rdof_tracts.census_id = aois.census_id 
        left join addresses
          on st_contains(aois.geom,wkb_geometry)
      where user_id = #{user.id}
      group by aois.geom, aois.census_id, county, state,locations,reserve
      HEREDOC
    aoi_result = ActiveRecord::Base.connection.execute(query)
    aois = aoi_result.map do |aoi|
      a=Aoi.first
      puts "****************************************"
      puts (a["geom"])
      puts(aoi["geom"])
      geom=aoi["geom"].gsub(/MULTIPOLYGON /,'MULTIPOLYGON')

      {polygon: geom , census_id: aoi["census_id"],county: aoi["county"],state:aoi["state"],location_count:aoi["locations"],reserve: aoi["reserve"],  selected:true, addr_cnt: aoi["addr_cnt"]}
    end
    puts(aois)
    render json: aois
  end
  private
  def geo_params
    params.permit!
  end
end
[]