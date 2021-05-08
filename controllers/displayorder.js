export const handleDisplayOrder=(req,res,db)=>{

    const {cust_id}=req.body;

    const sql=`select * from order where cust_id=${cust_id}`;

    db.query(sql,(err,order)=>{
        if(err) {   return;}
    
        res.json(order);
       
    })
}