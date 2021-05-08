export const handleCart=(req,res,db)=>{
    // cust_id	
	// pid	
	// quantity_purchased	
	// price	
	// total_price	
   const {shopid,cust_id,pid,quantity_purchased,price}=req.body;
   const total_price=price*quantity_purchased;

   const addCart_sql = `
   INSERT INTO cart 
   (
   cust_id,	
	pid,
	quantity_purchased,	
	price,	
	total_price
     )
   VALUES ( 
     '${cust_id}',
     '${pid}',
     '${quantity_purchased}',
     '${price}',
     '${total_price}'  
   );
   `
   const curqty_sql=`
    select quantity_available from available_at
    where shopid=${shopid} and pid='${pid}'
    `
    db.query(curqty_sql,(err,result)=>{
      if(err){throw err;}
      let current_qty=0;
      current_qty=result[0].quantity_available;  
      current_qty= +current_qty - +quantity_purchased;// +before variable to make it integer

      const qtyinc_sql=`
      update available_at
      set quantity_available=${current_qty}
      where shopid=${shopid} and pid='${pid}';
      `
            db.query(qtyinc_sql,(err,result)=>{
                if(err)throw err;
                console.log(current_qty);
            })
    }) 

    const curcart_sql=`
    select quantity_purchased from cart
    where cust_id=${cust_id} and pid='${pid}'
    `
   db.query(addCart_sql,(err,result)=>{
    if(err){ 
      console.log("prodct in this cart is already presnt"); 
                  db.query(curcart_sql,(err,result)=>{
                    if(err)throw err;
                    let current_qty=0;
                    current_qty=result[0].quantity_purchased;  
                    current_qty= +current_qty + +quantity_purchased;// +before variable to make it integer
                   let cur_total_price=current_qty*price;
                    const qtyinc_sql=`
                    update cart
                    set quantity_purchased=${current_qty},
                      total_price=${cur_total_price}
                    where cust_id=${cust_id} and pid='${pid}';
                    `
                          db.query(qtyinc_sql,(err,result)=>{
                              if(err)throw err;
                              console.log("incresed in cart",current_qty);
                             res.json(current_qty) 
                          })
                            

                  })
               return; 
              }
             console.log("adde to cart") 
    res.json(result)

   }) 
    
    


}