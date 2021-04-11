export const handleMyShopAcc=(req,res,db)=>{
    const {shopid}=req.body;

    const sql=`select * from shop where shopid=${shopid}`;

    db.query(sql,(err,shop)=>{
        if(err) {res.json("no such shop exists"); return ;}
        res.json(shop[0]);
        //console.log(shop)
    })



}