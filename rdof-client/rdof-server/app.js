const express = require("express");
const {Client} = require("pg");
const client = new Client({
  host: 'localhost',
  database: 'nodehealth',
  user: 'nodehealth',
  password:'nodehealth'});

client.connect();

const app = express();
app.use(express.json());

//TODO
// *Check if user exists.
// *handle bad inserts
//* Add email confirmation
app.post("/register", (req,res,next) => {
  console.log(req.body)
  let user = req.body
  console.log(user)
  let values = [user.fname, user.lname, user.company,user.email,user.password];
  console.log(values)
  let sql=`insert into users (fname, lname, company, email, password) values ($1::text, $2::text, $3::text, $4::text, $5::text)`;
  let resobj = res;
  let query= {
    text: sql,
    values: values
  }
  client.query(query,  (err,res) => {
    if (err) throw err;
    resobj.sendStatus(200);
    console.log("Registered user.")
  })

})

app.post("/searcharea/:start/:limit", (req, res, next) => {
  console.log("SEARCH AREA2" + req.params);
  console.log(req.params);
  let geojson=JSON.stringify(req.body.features[0].geometry);
  console.log(geojson)
  let query = `
	select unit, number, street, city, region, postcode, st_x(wkb_geometry), st_y(wkb_geometry) from addresses 
	where st_contains(st_geomFromGeoJSON($1::text), wkb_geometry) limit $2 offset $3
	`
  let resobj=res;
  client.query(query,[geojson, req.params.limit, req.params.start],(err,res) => {
    console.log("Dealing with a response")
    if (err) throw err;
    console.log(res.rows)
    resobj.status(200).send(res.rows);
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000")
});
