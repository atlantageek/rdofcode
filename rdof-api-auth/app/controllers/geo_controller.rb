

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
    query = "select st_AsGeoJSON(st_forcepolygonccw(wkb_geometry)) as geom, geoid20 as census_id, housing20 as housing, pop20 as population from census_blocks where st_contains(geom, st_setsrid(st_point(#{longitude},#{latitude}), 4326))"
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
      select st_asgeojson(st_forcepolygonccw(a.geom)) as geom, a.census_id, housing20,pop20
      from aois a
        left join census_blocks c
          on c.geoid20 = a.census_id 
      where a.user_id = #{user.id} and c.housing20 is not null
      HEREDOC
    aoi_result = ActiveRecord::Base.connection.execute(query)
    aois = aoi_result.map do |aoi|
      a=Aoi.first
      puts "****************************************"
      puts (a["geom"])
      puts(aoi["geom"])
      geom=aoi["geom"].gsub(/MULTIPOLYGON /,'MULTIPOLYGON')

      {polygon: geom , census_id: aoi["census_id"],  selected:true, housing:aoi["housing20"],population:aoi["pop20"]}
    end
    puts(aois)
    render json: aois
  end
  private
  def geo_params
    params.permit!
  end
end