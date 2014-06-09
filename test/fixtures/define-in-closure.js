(function() {
  var detector = {};

  if(typeof define === "function"){
    define(function(require, exports, module){
      module.exports = detector;
    });
  }
})();
