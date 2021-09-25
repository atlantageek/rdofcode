require 'csv'
#      query = "insert into aois (geom, census_id, user_id, created_at, updated_at) values (st_geomFromGeoJson(\'#{polygon["polygon"]}\'),#{polygon["census_id"]}, #{user.id},now(),now())"
#      logger.debug(query)
#      geom=ActiveRecord::Base.connection.execute(query)
result = CSV.read("scripts/zip2.csv")
#State_name,avg_Agg_HH_INC_ACS_13_17,Tot_Population_ACS_13_17,County_name,state,county,tract,block group
newdata = result.each do |row|
  census_id = row[4]+row[5]+row[6]+row[7]
  income = row[1]
  population=row[2]
  if (!income.nil?)
    puts("#{census_id}, #{income}, #{population}")
  end
end

