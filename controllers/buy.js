export const handleBuy=(req,res,db)=>{

    const {cust_id}=req.body;

    const sql=`
    select p.pid, p.description,c.quantity_purchased,c.price,c.total_price from 
    cart as c,product as p where cust_id=${cust_id} 
    and c.pid=p.pid;
    `
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = `${yyyy}-${mm}-${dd}`
    var time =  `23:12:11`;
    db.query(sql,(err,result)=>{
        if(err)throw err;
        console.log(result)
        result.map((cur,ind)=>{
            const order_sql=`
            insert into 
            orders(
                cust_id,
                pid,
                quantity_purchased,
                price,
                total_price,
                date,
                time,
                status
            )
            values(
                '${cust_id}',
                '${cur.pid}',
                '${cur.quantity_purchased}',
                '${cur.price}',
                '${cur.total_price}',
                '${today}',
                '${time}',
                'Ordered' ) 
            ` 
            db.query(order_sql,(err,result2)=>{
                if(err)throw err;
                console.log(result2)
              
            }) 
        })
        const del_sql=`
        delete from cart where cust_id=${cust_id}
        ` 
        db.query(del_sql,(err,result)=>{
           if(err)throw err;
           res.json("deleted from cart")
        })
      
       
    })


}