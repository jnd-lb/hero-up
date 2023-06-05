export default class Exception{
        
    message
    code
    debug

    static INVALID_PARAMETER = 400
    static NOT_FOUND = 404
    static NOT_AUTHORIZED = 403
    
    constructor(message,code,debug){
            this.message = message
            this.code = code
            this.debug = debug
    }

}