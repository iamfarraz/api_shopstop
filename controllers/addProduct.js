export const handleAddProduct=(req,res,db)=>{
    // shopid	int(11) PK
	// pid	varchar(40) PK
	// quantity_available	int(11)

    // pid	varchar(40) PK
	// description	varchar(100)
	// price	decimal(7,2)
    const {shopid,pid,qty,description,price}=req.body; 

    if( !shopid || !pid || !qty || !description || !price){
        return res.status(400).json("plz fill all columns");
    }

    const productsql=`
    INSERT INTO product
    (pid,
     description,
     price)
     
     VALUES(
       '${pid}',
       '${description}',
       '${price}'
    );
    `
    const available_sql=`
    INSERT INTO available_at
    (shopid,
     pid,
     quantity_available)
     
     VALUES(
       '${shopid}',
       '${pid}',
       '${qty}'
    );
    `
    const curqty_sql=`
    select quantity_available from available_at
    where shopid=${shopid} and pid='${pid}'
    `
 
      
    db.query(productsql, (err, result) =>{
        if(err){    console.log("  product already added"); return;}
         console.log(" new product added");
        //  res.json(result)
      });
    // res.json("lol");

  

    db.query(available_sql,(err,result)=>{
     if(err){ 
console.log("prodct in this shop is already presnt"); 
            db.query(curqty_sql,(err,result)=>{
              if(err)throw err;
              let current_qty=0;
              current_qty=result[0].quantity_available;  
              current_qty= +current_qty + +qty;

              const qtyinc_sql=`
              update available_at
              set quantity_available=${current_qty}
              where shopid=${shopid} and pid='${pid}';
              `
                    db.query(qtyinc_sql,(err,result)=>{
                        if(err)throw err;
                        res.json(current_qty);
                    })
            })
         return; 
        }
       console.log("added in availiable_at") 
     res.json(result);
    })

   
}
