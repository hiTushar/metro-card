const fs = require("fs")

const filename = process.argv[2]

fs.readFile(filename, "utf8", (err, data) => {
    console.log(filename);
    /*if (err) throw err
    var inputLines = data.toString().split("\n")
    // Add your code here to process input commands
    */
})
