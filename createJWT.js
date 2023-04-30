const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createToken = function (id, fn, ln, error)
{
    return _createToken(id, fn, ln, error);
}

_createToken = function (id, fn, ln, error)
{
    let ret;
    try
    {
        const user = {id:id, firstName:fn, lastName:ln, error:error};

        const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
        
        ret = {accessToken:accessToken, id:id, firstName:fn, lastName:ln, error:error};
    }
    catch(e)
    {
        ret = {error:e.message};
    }
    return ret;
}

exports.isExpired = function(token)
{
    var isError = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, verifiedJwt) =>
    {
        if (err)
        {
            return true;
        }
        else
        {
            return false;
        }
    });

    return isError;
}

exports.refresh = function(token)
{
    let ud = jwt.decode(token, {complete:true});

    let id = ud.payload.id;
    let firstName = ud.payload.firstName;
    let lastName = ud.payload.lastName;

    return _createToken(id, firstName, lastName);
}