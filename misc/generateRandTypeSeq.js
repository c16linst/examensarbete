// This will (temporarily?) be used to generate a sequence of random
// numbers to determine the type of the inputs that are going to be generated

var data = [];

for(let i = 0; i < 10000; i++) {
  data.push(Math.floor(Math.random() * 10 + 1));
}

var textFile = null;
data = data.toString();
data = 'const inputType = [' + data + '];';
data += 'export { inputType };'


var createFile = function(input) {
  var blob = new Blob([input], { type: 'text/plain' });
  textFile = window.URL.createObjectURL(blob);

  return textFile;
};

var a = document.createElement('a');
a.setAttribute('download', 'random-numbers-10000-1-10.js');
a.setAttribute('href', createFile(data));
document.body.appendChild(a);

a.click();
