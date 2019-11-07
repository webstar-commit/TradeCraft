/**
 * booster.js make changes here to extend functionality of data-types and to add polyfills
 */

/**
 * clean: Performs clean operation on array
 * @param {} deleteValue 
 */
Array.prototype.clean = function(deleteValue) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == deleteValue) {         
        this.splice(i, 1);
        i--;
      }
    }
    return this;
}
/**
 * clean: Performs clean operation on String
 */
String.prototype.clean = function() {
  var self = this;
  return this.replace(/(\r\n|\n|\r)/gm, "").replace(/^\s+|\s+$/g, "");
}