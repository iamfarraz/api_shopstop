export const handleLocality=(req,res,db)=>{

    const {locality_pin_code}=req.body;

    const sql=`select * from shop where locality_pin_code=${locality_pin_code}`;

    db.query(sql,(err,shop)=>{
        if(err) {   return;}
        if(shop.length===0){res.status(400).json("no items match your search"); return;}
        res.json(shop);
        //console.log(shop)
    })
    


}

