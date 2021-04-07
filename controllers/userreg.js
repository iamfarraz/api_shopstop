export const handlereg=(req,res,db,bcrypt)=>{
    const {username,userid,mail,password,phone,houseno,sector,area,city,locality_pin_code}=req.body;
  // const salt = bcrypt.genSaltSync(10);
  // const hash = bcrypt.hashSync(password ,salt);


  if(!userid || !mail || !password || !username || !phone || !houseno || !area || !city || !locality_pin_code || !sector){
    return res.status(400).json(" havent filled form correctly");
  }


  db('locality')
  .insert({
    pin_code:locality_pin_code,
    loc_name:area
  }).then(console.log(`${locality_pin_code} added`))
  .catch(err=> res.status(400).json("already exist"))

  bcrypt.hash(password, 10, function(err, hash) {
    // Store hash in your password DB.
    console.log(hash)
  db('user')
.insert({
  userid:userid,
  mail:mail,
  password:hash,
  username:username,
  phone:phone,
  houseno:houseno,
  sector:sector,
  area:area,
  city:city,
  locality_pin_code :locality_pin_code
})
.then(user=>res.json(user[0])) 
.catch(err=>res.status(400).json("unable to reg"))

});



 
//   console.log("lol");
}