export const handleMyShop=(req,res,db)=>{
    const {shop_id}=req.body;

    const sql=`select  a.shopid,a.quantity_available,p.pid,p.description,p.price from available_at as a,product as p
    where shopid=${shop_id} and a.pid=p.pid;`;
    
  db.query(sql,(err,allproduct)=>{
      if(err){throw err;}
      res.json(allproduct);
  })
     


}