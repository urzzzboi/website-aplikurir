const forStatus =(req,res,next) => {
    let user = req.session.user ||"";
    if(user === user.Status_User) 
        next();
    else
        res.redirect("Error Auth")
}

export default forStatus;