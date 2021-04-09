export const handleshopreg=(req,res,db,bcrypt)=>{
    
    const {shop_email,shop_password,shop_name,phone,address,category,locality_pin_code}=req.body;
    const hash = bcrypt.hashSync(shop_password ,10);

    if( !shop_email || !shop_password || !shop_name || !phone || !address || !category|| !locality_pin_code){
        return res.status(400).json("plz fill all columns");
    }
    const shop_sql = `
  INSERT INTO shop 
  (
    shop_email,
    shop_password,
    shop_name,
    phone,
    address,
    category,
    locality_pin_code 
    )

  VALUES ( 
    '${shop_email}',
    '${hash}',
    '${shop_name}',
    '${phone}',
    '${address}',
    '${category}',
    
    '${locality_pin_code}'
    );`
    const loacality_sql=`
    INSERT INTO locality
    (pin_code,
     loc_name)
     
     VALUES(
       '${locality_pin_code}',
       '${address}'
    );
     `
     
     
db.query(loacality_sql, (err, result) =>{
  if(err){return ;}
   console.log(" new loaclity added");
});

db.query(shop_sql, (err, result)=> {
 if(err){   res.json("shop already availiable"); return ;}
 else {
  console.log(result); 
  res.json(shop_mail)
 }
 
});
   
    

   

   
   
}