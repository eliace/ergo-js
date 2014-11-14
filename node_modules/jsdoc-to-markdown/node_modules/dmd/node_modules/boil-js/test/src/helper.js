module.exports = function(handlebars){
    handlebars.registerHelper("helper", function(){
        return "helped";
    });
};
