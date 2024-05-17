const valueStatus =(req,res,next) => {
    let user = req.session.user ||"";
    if(user && user.valueStatus) 
        next();
    else
        res.redirect("/forbidden")
}

export default valueStatus;