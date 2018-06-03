const randomVehicleGenerator = require('./server/mock/vehicles');
const colors = require('./server/mock/vehicleColors');
const brands = require('./server/mock/vehicleBrands');
const vehicleFeatures = require('./server/mock/vehicleFeatures');


const collectionNames = require('./server/db/collectionNames');
const connectionFactory = require('./server/db/connection.factory');
const bcrypt = require('bcrypt');

var env = process.env.NODE_ENV;


var systemAdmin = {
    username: "admin",
    password: "12345",
    email: "aliemre1990@hotmail.com",
    namesurname: "Ali Emre TAŞKIN",
    type: 0
}


var customer1 = {
    companyName: "company1",
    email: "aliemre1990@hotmail.com",
    phone: "02126438245"
}

var customer2 = {
    companyName: "company2",
    email: "aliemre1990@hotmail.com",
    phone: "02126438245"
}


var app1 = {
    applicationNumber: 1,
    createdAt: "",
    active: true,
    customerId: ""

}

var app2 = {
    applicationNumber: 2,
    createdAt: "",
    active: true,
    customerId: ""
}

var appUser1 = {
    username: "appuser1",
    password: "12345",
    email: "aliemre1990@hotmail.com",
    namesurname: "Ali Emre TAŞKIN",
    applicationId: "", // object id of application1,
    type: 0,
    createdAt: "",
    emailVerified: true
}

var appUser2 = {
    username: "appuser2",
    password: "12345",
    email: "aliemre1990@hotmail.com",
    namesurname: "",
    applicationId: "",
    type: 0,
    createdAt: "",
    emailVerified: true
}




connectionFactory.getCollection(collectionNames.systemUserCollection).then(async (x) => {
    var sysUserCollection = x
    var count = await sysUserCollection.count();



    if (count <= 0) {

        console.log('System user does not exists. Insert startup data.')

        if (env === "production") {
            /*
                Insert only system admin
             */


        } else {
            // Insert system admin
            var salt = bcrypt.genSaltSync(10);
            var hashword = bcrypt.hashSync(systemAdmin.password, salt);

            systemAdmin.password = hashword;
            systemAdmin.createdAt = new Date();
            var insertedSystemUser = await sysUserCollection.insertOne(systemAdmin);
            insertedSystemUser = insertedSystemUser.ops[0];

            //

            // Insert customers

            var appCustomerCollection = await connectionFactory.getCollection(collectionNames.applicationCustomerCollection);

            var insertedCustomer1 = await appCustomerCollection.insertOne(customer1);
            var insertedCustomer2 = await appCustomerCollection.insertOne(customer2);

            insertedCustomer1 = insertedCustomer1.ops[0];
            insertedCustomer2 = insertedCustomer2.ops[0];

            //

            // Insert applications

            var applicationCollection = await connectionFactory.getCollection(collectionNames.applicationCollection);

            app1.customerId = insertedCustomer1._id;
            var insertedApp1 = await applicationCollection.insertOne(app1);
            insertedApp1 = insertedApp1.ops[0];

            app2.customerId = insertedCustomer2._id;
            var insertedApp2 = await applicationCollection.insertOne(app2);
            insertedApp2 = insertedApp2.ops[0];
            //

            // Insert app owners
            applicationUserCollection = await connectionFactory.getCollection(collectionNames.applicationUserCollection);

            var salt = bcrypt.genSaltSync(10);
            var hashword = bcrypt.hashSync(appUser1.password, salt);

            appUser1.password = hashword;
            appUser1.applicationId = insertedApp1._id;
            appUser1.createdAt = new Date();
            var insertedAppUser1 = await applicationUserCollection.insertOne(appUser1);

            var salt = bcrypt.genSaltSync(10);
            var hashword = bcrypt.hashSync(appUser2.password, salt);

            appUser2.password = hashword;
            appUser2.applicationId = insertedApp2._id;
            appUser2.createdAt = new Date();
            var insertedAppUser2 = await applicationUserCollection.insertOne(appUser2);

            //

            // Insert test data for app1

            var app1VehicleCollection = await connectionFactory.getCollection(collectionNames.vehicleCollection + app1.applicationNumber);
            var app1ColorCollection = await connectionFactory.getCollection(collectionNames.colorCollection + app1.applicationNumber);
            var app1BrandCollection = await connectionFactory.getCollection(collectionNames.brandCollection + app1.applicationNumber);
            var app1VehicleFeatureCollection = await connectionFactory.getCollection(collectionNames.vehicleFeatureCollection + app1.applicationNumber);

            var insertedApp1Colors = await app1ColorCollection.insertMany(colors);
            insertedApp1Colors = insertedApp1Colors.ops;

            var insertedApp1Brands = await app1BrandCollection.insertMany(brands);
            insertedApp1Brands = insertedApp1Brands.ops;

            var insertedApp1VehicleFeatures = await app1VehicleFeatureCollection.insertMany(vehicleFeatures);
            insertedApp1VehicleFeatures = insertedApp1VehicleFeatures.ops;

            for (var i = 0; i < 350; i++) {
                var vehicle = randomVehicleGenerator();
                vehicle.number = i + 1;
                vehicle.color = insertedApp1Colors[0];
                vehicle.brand = insertedApp1Brands[1];
                vehicle.brandModel = insertedApp1Brands[1].models[0];
                vehicle.features =
                    [
                        { feature: insertedApp1VehicleFeatures[0] },
                        { feature: insertedApp1VehicleFeatures[1] },
                        { feature: insertedApp1VehicleFeatures[2] },
                        { feature: insertedApp1VehicleFeatures[3] }
                    ]

                app1VehicleCollection.insertOne(vehicle);
            }

            //

            // Insert test data for app2

            var app2VehicleCollection = await connectionFactory.getCollection(collectionNames.vehicleCollection + app2.applicationNumber);
            var app2ColorCollection = await connectionFactory.getCollection(collectionNames.colorCollection + app2.applicationNumber);
            var app2BrandCollection = await connectionFactory.getCollection(collectionNames.brandCollection + app2.applicationNumber);
            var app2VehicleFeatureCollection = await connectionFactory.getCollection(collectionNames.vehicleFeatureCollection + app2.applicationNumber);


            var insertedApp2Colors = await app2ColorCollection.insertMany(colors);
            insertedApp2Colors = insertedApp2Colors.ops;

            var insertedApp2Brands = await app2BrandCollection.insertMany(brands);
            insertedApp2Brands = insertedApp2Brands.ops;

            var insertedApp2VehicleFEatures = await app2VehicleFeatureCollection.insertMany(vehicleFeatures);
            insertedApp2VehicleFEatures = insertedApp2VehicleFEatures.ops;

            for (var i = 0; i < 10; i++) {
                var vehicle = randomVehicleGenerator();
                vehicle.number = i + 1;
                vehicle.color = insertedApp2Colors[0];
                vehicle.brand = insertedApp2Brands[1];
                vehicle.brandModel = insertedApp2Brands[1].models[0];
                vehicle.features =
                    [
                        { feature: insertedApp2VehicleFEatures[0] },
                        { feature: insertedApp2VehicleFEatures[1] },
                        { feature: insertedApp2VehicleFEatures[2] },
                        { feature: insertedApp2VehicleFEatures[3] }
                    ]

                app2VehicleCollection.insertOne(vehicle);
            }

            //
        }
    }


});
