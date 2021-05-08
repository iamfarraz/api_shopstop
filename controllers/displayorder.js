export const handleDisplayOrder=(req,res,db)=>{

    const {cust_id}=req.body;

    const sql=`select p.description,o.quantity_purchased,o.price,o.total_price,o.date,o.time,o.status 
    from orders as o ,product as p where cust_id=${cust_id} and o.pid=p.pid`;

    db.query(sql,(err,order)=>{
        if(err) {   return;}
    
        res.json(order);
       
    })
}