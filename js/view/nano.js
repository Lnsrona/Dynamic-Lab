/* Nano Templates - https://github.com/trix/nano */
/* MIT License*/

function instantiate (template, data) {
   return template.replace(/\{([\w\.]*)\}/g, function(str, key) { 
     var keys = key.split("."), v = data[keys.shift()]; 
     for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]]; 
     return (typeof v !== "undefined" && v !== null) ? v : ""; 
   }); 
 } 
