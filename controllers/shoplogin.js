export const handleshoplogin=(req,res,db,bcrypt)=>{

    const {shop_email,shop_password}=req.body;
    
    if(!shop_email || !shop_password){
        return res.status(400).json("mail or password not inserted")
    }
    const sql=`SELECT * FROM shop where shop_email='${shop_email}'`;

    db.query(sql,  (err,shop) =>{
      if (err) { throw err;}
        if(shop.length>0){
          const isvalid=bcrypt.compareSync(shop_password,shop[0].shop_password);
          if(isvalid){
           res.json(shop[0])
          }
          else {
            res.status(400).json("wrong credential")
          }
        }
        else { res.json("no such user exist"); }
        
    });
    
 
}