const fs = require("fs")

const filename = process.argv[2]

const STATIONS = [ "CENTRAL", "AIRPORT" ];

const PRICE = {
    ADULT: 200,
    SENIOR_CITIZEN: 100,
    KID: 50
};

const SERVICE_CHARGE_RATE = 2;
const DISCOUNT_RATE = 50;

const STATION_DATA = {};
const PASSENGER_DATA = {};

fs.readFile(filename, "utf8", (err, data) => {
    if(err) {
        throw err;
    }
    else {
        let inputLines = data.toString().split("\n").map(t => t.trim());
        inputLines.forEach(command => {
            if (command.includes("BALANCE")) {
                let [commandName, passenger, balance] = command.split(" ");
                if ( PASSENGER_DATA[passenger] === undefined ) {
                    PASSENGER_DATA[passenger] = {};
                }
                PASSENGER_DATA[passenger].balance = Number(balance);
            }
    
            if (command.includes("CHECK_IN")) {
                let [commandName, passenger, passengerType, passengerBoardingStation] = command.split(" ");
                
                if (PASSENGER_DATA[passenger] === undefined) {
                    PASSENGER_DATA[passenger] = {};
                }
    
                PASSENGER_DATA[passenger].type = passengerType;
    
                if (PASSENGER_DATA[passenger].station === undefined) {
                    PASSENGER_DATA[passenger].station = [];
                }
                PASSENGER_DATA[passenger].station.push(passengerBoardingStation);
            }

            if (command.includes("PRINT_SUMMARY")) {
                console.log(PASSENGER_DATA);
                Object.keys(PASSENGER_DATA).forEach(passenger => {
                    if(PASSENGER_DATA[passenger].station === undefined) return; // if the mentioned passenger did not mmake any journey

                    PASSENGER_DATA[passenger].station.forEach((station, index) => {
                        if (STATION_DATA[station] === undefined) {
                            STATION_DATA[station] = {
                                collection: 0,
                                discount: 0,
                                passengerTypes: {
                                    ADULT: 0,
                                    SENIOR_CITIZEN: 0,
                                    KID: 0
                                }
                            }
                        }

                        let discountRate = 1;
                        if (index % 2) discountRate = DISCOUNT_RATE / 100; // return journey
                        let costOfTicket = PRICE[PASSENGER_DATA[passenger].type] * discountRate;

                        STATION_DATA[station].discount += (PRICE[PASSENGER_DATA[passenger].type] - costOfTicket);

                        let serviceChargeAmount = 0;
                        if (PASSENGER_DATA[passenger].balance < costOfTicket) {
                            let rechargeAmount = costOfTicket - PASSENGER_DATA[passenger].balance;
                            PASSENGER_DATA[passenger].balance += rechargeAmount; // writing passenger.balance = costOfTicket, directly instead, doesn't express the meaning of the transaction clearly

                            serviceChargeAmount = rechargeAmount * SERVICE_CHARGE_RATE / 100;
                        }
                        PASSENGER_DATA[passenger].balance -= costOfTicket;
                        
                        STATION_DATA[station].collection += costOfTicket + serviceChargeAmount;

                        STATION_DATA[station].passengerTypes[PASSENGER_DATA[passenger].type]++;
                    })
                });
                console.log(STATION_DATA);
                
            }
        })
    }
})
