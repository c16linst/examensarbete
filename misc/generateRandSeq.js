// This will (temporarily?) be used to generate a sequence of random
// numbers to determine the amount of inputs that are going to be generated
// and which type they will be

var data = [];

for(let i = 0; i < 10000; i++) {
  data.push(Math.floor(Math.random() * 10 + 1));
}

var textFile = null;
data = data.toString();

var createFile = function(input) {
  var blob = new Blob([input], { type: 'text/plain' });
  textFile = window.URL.createObjectURL(blob);

  return textFile;
};

var a = document.createElement('a');
a.setAttribute('download', 'random-numbers-10000-1-10.txt');
a.setAttribute('href', createFile(data));
document.body.appendChild(a);

a.click();
