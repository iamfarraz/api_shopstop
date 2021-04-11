export const handleMyShop=(req,res,db)=>{
    const {shop_id}=req.body;

    const sql=`select * from shop where shop_id=${shop_id}`;
    

    
    
    res.json(shop_id);

}