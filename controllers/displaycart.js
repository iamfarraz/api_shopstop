export const handleDisplayCart=(req,res,db)=>{

    const {cust_id}=req.body;

    const sql=`select * from cart where cust_id=${cust_id}`;

    db.query(sql,(err,cart)=>{
        if(err) {   return;}
    
        res.json(cart);
       
    })
}