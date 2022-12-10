const fs = require("fs")

const filename = process.argv[2]

fs.readFile(filename, "utf8", (err, data) => {
    if(err) {
        throw err;
    }
    else {
        let inputLines = data.toString().split("\n").map(t => t.trim());
        let passengers = {};
        inputLines.forEach(command => {
            if (command.includes("BALANCE")) {
                let parsedCommmand = command.split(" ");
                if ( passengers[parsedCommmand[1]] === undefined ) {
                    passengers[parsedCommmand[1]] = {};
                }
                passengers[parsedCommmand[1]].balance = Number(parsedCommmand[2]);
            }
    
            if (command.includes("CHECK_IN")) {
                let parsedCommmand = command.split(" ");
    
                if (passengers[parsedCommmand[1]] === undefined) {
                    passengers[parsedCommmand[1]] = {};
                }
    
                passengers[parsedCommmand[1]].type = parsedCommmand[2];
    
                if (passengers[parsedCommmand[1]].station === undefined) {
                    passengers[parsedCommmand[1]].station = [];
                }
                passengers[parsedCommmand[1]].station.push(parsedCommmand[3]);
            }
        })
        console.log(passengers);
    }
})
