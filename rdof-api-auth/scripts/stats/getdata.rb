require 'csv'
require 'net/http'
require 'json'

data=CSV.read("fips.csv")
data.each do |row|
  state_code= row[0][0..1]
  county_code = row[0][2..4]
  url = "https://api.census.gov/data/2019/pdb/blockgroup?get=State_name,avg_Agg_HH_INC_ACS_13_17,Tot_Population_ACS_13_17,County_name&for=block%20group:*&in=state:#{state_code}%20county:#{county_code}&key=019411f3d9117263ff269dd0119f281b168b2cd3"
  uri = URI(url)
  result = Net::HTTP.get(uri)
  begin
    parsed_data = JSON.parse(result)
  rescue 
    puts "ERROR: " +url
  end
  if (parsed_data != nil)
    parsed_data.unshift()
    parsed_data.each do |data_row|
      puts "#{data_row[0]}|#{data_row[1]}|#{data_row[2]}|#{data_row[3]}|#{data_row[4]}|#{data_row[5]}|#{data_row[6]}|#{data_row[7]}"
    end
  end
end
