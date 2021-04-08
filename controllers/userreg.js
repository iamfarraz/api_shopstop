export const handlereg=(req,res,db,bcrypt)=>{
    const {username,mail,password,phone,houseno,sector,area,city,locality_pin_code}=req.body;
  // const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password ,10);
  if(!mail || !password || !username || !phone || !houseno || !area || !city || !locality_pin_code || !sector){
    return res.status(400).json(" havent filled form correctly");
  }

  const user_sql = `
  INSERT INTO user 
  (
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
  db.query(loacality_sql, (err, result) =>{
     if(err)throw err;
      console.log("loaclity added");
  });

  db.query(user_sql, (err, result)=> {
    if(err)throw err;
    console.log("user added"); 
  });
res.json("added")

}