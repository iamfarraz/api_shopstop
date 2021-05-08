export const handleDisplayCart=(req,res,db)=>{

    const {cust_id}=req.body;

    const sql=`select p.description,c.quantity_purchased,c.price,c.total_price from cart as c ,product as p 
    where cust_id=${cust_id} and c.pid=p.pid;`;

    db.query(sql,(err,cart)=>{
        if(err) {   return;}
    
        res.json(cart);
       
    })
}