class parameterChecker {
    isValid(parameter){
        try {
        if(typeof parameter == "undefined") return false
        if(parameter == null) return false
        if(parameter == "") return false
        if(parameter.length == 0) return false
        if(parameter == false) return false
        if(typeof parameter == "NaN") return false
        if(parameter == "-0") return false
        if(parameter == -0) return false
        } catch (error) {
        console.log("Error @ parameterChecker: isInvalid >> "+error)
        return false
        }

        return true

    }

    isType(parameter, requestedType){
        if(typeof parameter === requestedType) return true
    }
}
  
const checkParameters = new parameterChecker();

const devLog = function (string){
    if(process.env.DEV_LOGGING !== "TRUE") return;
    return console.log(string);
}

const logEndpoint = function (req, res, next) {

    let frontPiece = "\n   >>>    ";
    let loggable = frontPiece + Date.now() + " >> " + new Date(Date.now()).toISOString() + frontPiece + req.method + " request made to '" + req.originalUrl + "'";

    console.time(loggable);
    res.once("finish", () => {
        console.timeEnd(loggable);
        console.log(""); // for empty line
    });

    return next();
};



module.exports = { logEndpoint, devLog, checkParameters };