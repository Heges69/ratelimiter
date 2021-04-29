class rateLimiter{
    /**
     * @param {String} 1 request per {rate}(ms)
     */
    constructor(rate){
        this._rate = rate;
        this.aliases = {};
    }
    /**
     * @param {*} alias
     * @returns {Boolean} allow/drop
     */
    test = (alias) => {
        if(typeof alias != "string"){
            throw "Alias has to be type of String";
        }
        if(!this.aliases[alias]){
            this.aliases[alias] = {ran: Date.now()};
            return true;
        }
        if(Date.now() - this.aliases[alias].ran < this._rate){
            return false;
        }
        this.aliases[alias].ran = Date.now();
        return true;
    }
}
module.exports = rateLimiter;