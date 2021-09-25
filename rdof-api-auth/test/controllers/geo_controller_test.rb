require 'test_helper'

class GeoControllerTest < ActionDispatch::IntegrationTest
  test "should get searcharea" do
    get geo_searcharea_url
    assert_response :success
  end

end
