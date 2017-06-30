
// Searches the out file created during the build process.
// Parses a POST endpoint to get the URL for the new deployment.

fs = require('fs')
fs.readFile(__dirname + '/../.build/deploy.out', 'utf8', function (err,data) {
  if (err)
    throw (err);

  var lines = data.split("\n");
  for (var i = 0; lines.length > i; i++) {
    if(lines[i].includes("POST") && lines[i].includes("execute-api")) {
	  var startIndex = lines[i].indexOf("https://");
    var slash1 = lines[i].indexOf("/", startIndex + 8);
    var slash2 = lines[i].indexOf("/", slash1 + 1);
	  console.log(lines[i].substring(startIndex, slash2));
	  i = lines.length;
    }
  }
});
