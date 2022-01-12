const rejectNotAdmin = (req, res, next) => {
    console.log('req.user.is_admin in rejectNotAdmin is: ', req.user.is_admin);
    
    // check is user is an admin
    if(req.user.is_admin) {
        next();
    } else {
        res.sendStatus(403)
    }
}

module.exports = { rejectNotAdmin };