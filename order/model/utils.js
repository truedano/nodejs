module.exports = function(){
    this.formatTime = function(){
        return (new Date(Date.now()-(new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, 19).replace(/[^0-9]/g, "");
    };
};