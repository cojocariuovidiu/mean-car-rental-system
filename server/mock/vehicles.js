var vehicle1 = {
    plate: "34AAA55",
    modelYear: 2010,
    registrationDocumentNumber: "1341341342234",
    registrationDate: new Date(2018, 10, 4),
    kmStatus: 15000,
    nextExaminationDate: new Date(2018, 10, 4),
    trafficInsurenceEndDate: new Date(2018, 10, 4),
    vehicleInsurenceEndDate: new Date(2020, 10, 10),
    ogsLabelNumber: "24234asdfsad",
    warning: false,
    description: "Araç açıklaması",
    isSold: false,
    saleData: null,
    saleKm: null,
    saledPerson: null,
    engineNumber: "aa1000000000001",
    chassisNumber: "bb200000000002",
    tapeCode: "cc33000000004",
    brandModel: null,
    brand: null,
    color: null,
    hearType: null,
    seatType: null,
    enginePower: 150,
    horsePower: 1.5
}


var generateCapitalLetter = function () {
    return String.fromCharCode((Math.random() * 25) + 65);
}

var generateNumberBetween = function (from, to) {
    return ((Math.random() * (to - from)) + from).toFixed(0);
}
var vehicleNumber = 1;
var randomVehicleGenerator = function () {
    var firstPlatePart = "34";
    var thirdPlatePart = generateNumberBetween(100, 999);
    var secondPlatePart = "";

    // plates middle part is at least one at most three characters
    for (var i = 0; i < (Math.random() * 2) + 1; i++) {
        secondPlatePart += generateCapitalLetter();
    }
    var plate = firstPlatePart + secondPlatePart + thirdPlatePart;

    plate = [{ "plate": plate, "dateFrom": new Date(generateNumberBetween(2000, 2018), generateNumberBetween(1, 12), generateNumberBetween(1, 26)) }];
    if (generateNumberBetween(0, 3) > 1) {

        firstPlatePart = "34";
        thirdPlatePart = generateNumberBetween(100, 999);
        secondPlatePart = "";

        // plates middle part is at least one at most three characters
        for (var i = 0; i < (Math.random() * 2) + 1; i++) {
            secondPlatePart += generateCapitalLetter();
        }
        plate.push({
            plate: firstPlatePart + secondPlatePart + thirdPlatePart,
            "dateFrom": new Date(generateNumberBetween(2000, 2018), generateNumberBetween(1, 12), generateNumberBetween(1, 26))
        });
    }

    var modelYear = generateNumberBetween(2000, 2018);

    var registrationDocumentNumberSerial = generateCapitalLetter() + generateCapitalLetter();
    var registrationDocumentNumberNo = generateNumberBetween(100000, 999999);
    var registrationDocumentNumber = registrationDocumentNumberSerial + registrationDocumentNumberNo;

    var registrationDate = new Date(generateNumberBetween(2000, 2018), generateNumberBetween(1, 12), generateNumberBetween(1, 26));

    var kmStatus = generateNumberBetween(1000, 100000);

    var nextExaminationDate = new Date(generateNumberBetween(2018, 2019), generateNumberBetween(1, 12), generateNumberBetween(1, 26));

    var trafficInsurenceEndDate = new Date(generateNumberBetween(2017, 2020), generateNumberBetween(1, 12), generateNumberBetween(1, 26));

    var vehicleInsurenceEndDate = new Date(generateNumberBetween(2017, 2020), generateNumberBetween(1, 12), generateNumberBetween(1, 26));

    var ogsLabelNumber = generateNumberBetween(1000000000, 9999999999);

    var warning = generateNumberBetween(0, 1) == 1 ? false : true;

    var description = warning ? "Araç açıklaması" : "";

    var isSold = false;

    var saleDate = null;

    var saleKm = null;

    var saleAmount = null;

    var saledPerson = null;

    var engineNumber = generateCapitalLetter() + generateCapitalLetter() + generateCapitalLetter() + generateNumberBetween(10000000, 9999999);

    var chassisNumber = generateCapitalLetter() + generateCapitalLetter() + generateCapitalLetter() + generateNumberBetween(10000000, 9999999);

    var tapeCode = generateCapitalLetter() + generateCapitalLetter() + generateCapitalLetter() + generateNumberBetween(10000000, 9999999);

    var gearType = generateNumberBetween(0, 1);

    var seatCount = generateNumberBetween(5, 12);

    return {
        number: vehicleNumber++,
        plateHistory: plate,
        modelYear,
        registrationDocumentNumber,
        registrationDate,
        kmStatus,
        nextExaminationDate,
        trafficInsurenceEndDate,
        vehicleInsurenceEndDate,
        ogsLabelNumber,
        warning,
        description,
        isSold,
        saleInfo: {
            saleDate,
            saleKm,
            saledPerson,
            saleAmount
        },
        engineNumber,
        chassisNumber,
        tapeCode,
        brand: null,
        brandModel: null,
        color: null,
        gearType,
        seatCount,
        enginePower: 150,
        horsePower: 1.5
    }
}

module.exports = randomVehicleGenerator;