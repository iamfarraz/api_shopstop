export const handleMyAcc=(req,res,db)=>{
    const {cust_id}=req.body;

    const sql=`select * from user where cust_id=${cust_id}`;

    db.query(sql,(err,user)=>{
        if(err) {res.json("no such user exist"); return ;}
        res.json(user[0]);
        // console.log(user)
    })

}