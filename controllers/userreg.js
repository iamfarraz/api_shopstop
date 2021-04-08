export const handlereg=(req,res,db,bcrypt)=>{
    const {username,cust_id,mail,password,phone,houseno,sector,area,city,locality_pin_code}=req.body;
  // const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password ,10);



  if(!cust_id || !mail || !password || !username || !phone || !houseno || !area || !city || !locality_pin_code || !sector){
    return res.status(400).json(" havent filled form correctly");
  }

  const user_sql = `
  INSERT INTO user 
  (
    cust_id,
    mail,
    password,
    username,
    phone,
    houseno,
    sector,
    area,
    city,
    locality_pin_code 
    )
  
  VALUES ( 
    '${cust_id}',
    '${mail}',
    '${hash}',
    '${username}',
    '${phone}',
    '${houseno}',
    '${sector}',
    '${area}',
    '${city}',
    '${locality_pin_code}'
  );
  `
 

 const loacality_sql=`
 INSERT INTO locality
 (pin_code,
  loc_name)
  
  VALUES(
    '${locality_pin_code}',
    '${area}'
 );
  `
  db.query(loacality_sql, function (err, result) {
    if (err) { res.json("jhol hai")   }
    else {
      console.log("loaclity added");
    res.json(result);
    }
    
  });

  db.query(user_sql, function (err, result) {
    if (err) { res.json("gadbad in user addition") }
    else {
      console.log("user added");
    res.json(result);
    }
  });


}