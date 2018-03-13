const vehicleSchema = require('./schemas/vehicle.schema.json');
var Validator = require('jsonschema').Validator;

var v = new Validator();

function validateVehicle(vehicleInstance) {
    return v.validate(vehicleInstance, vehicleSchema);
}


// var valid = validate(data);
// if (!valid) console.log(validate.errors);

module.exports = { validateVehicle };


// var Ajv = require('ajv');
// var ajv = new Ajv({ schemaId: 'id' });
// ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));

// var validate = ajv.compile(vehicleSchema);
// var valid = validate(data);
// if (!valid) console.log(validate.errors);