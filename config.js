
process.env.NODE_ENV || (process.env.NODE_ENV = 'development');

var config = {
    "development": {
        "port": 3000,
        "connectionString": "mongodb://localhost:27017",
        "jwtSecret": "1234"
    },
    "production": {
        "port": process.env.PORT,
        "connectionString": process.env.DB_CONNECTION_STRING,
        "jwtSecret": process.env.JWT_SECRET

    }
}

global.config = config[process.env.NODE_ENV];    
