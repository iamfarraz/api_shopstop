export const handlereg=(req,res,db,bcrypt)=>{
    const {username,userid,mail,password,phone,houseno,sector,area,city,locality_pin_code}=req.body;
  // const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password ,10);



  if(!userid || !mail || !password || !username || !phone || !houseno || !area || !city || !locality_pin_code || !sector){
    return res.status(400).json(" havent filled form correctly");
  }

  const user_sql = `
  INSERT INTO user 
  (
    userid,
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
    '${userid}',
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
    if (err) { throw err; }
    else {
      console.log("user added");
    res.json(result);
    }
  });


}