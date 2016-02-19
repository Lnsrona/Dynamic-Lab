function nano(template, data) { 
4   return template.replace(/\{([\w\.]*)\}/g, function(str, key) { 
5     var keys = key.split("."), v = data[keys.shift()]; 
6     for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]]; 
7     return (typeof v !== "undefined" && v !== null) ? v : ""; 
8   }); 
9 } 
