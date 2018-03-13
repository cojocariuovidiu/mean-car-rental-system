const connectionFactory = require('../../../db/connection.factory');
const collectionNames = require('../../../db/collectionNames');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongodb = require('mongodb');

async function getUserByCredentials(username, password) {

    var appUserCol = await connectionFactory.getCollection(collectionNames.applicationUserCollection);


    var userByName = await appUserCol.findOne({ "username": username });

    if (userByName) {

        return new Promise((resolve, reject) => {


            bcrypt.compare(password, userByName.password, (error, same) => {

                if (same) {
                    resolve({ data: { userData: userByName }, success: true, message: "Bu bilgilerde bir kullanıcı bulundu." });
                } else {
                    resolve({ data: null, success: false, message: "Yanlış kullanıcı adı veya şifre." });
                }

            });

        })


    } else {
        return Promise.resolve({ success: false, message: "Yanlış kullanıcı adı veya şifre." });
    }

}


async function updateAuthToken(userId, token) {

    var appUserCol = await connectionFactory.getCollection(collectionNames.applicationUserCollection);

    try {
        var updateResult = await appUserCol.updateOne({ "_id": userId }, { $set: { "authtoken": token } });

        return { success: true, message: "Başarılı" }


    } catch (exception) {

        return { success: false, message: "Kullanıcı authorization token' ı güncellenirken bir hata oluştu." }
    }
}

async function getById(userId) {

    var appUserCol = await connectionFactory.getCollection(collectionNames.applicationUserCollection);

    userId = new mongodb.ObjectID(userId);

    try {
        var user = await appUserCol.findOne({ "_id": userId });

        return { success: true, data: user };

    } catch (exception) {
        return { success: false, data: null, message: "Kullanıcı getirilirken bir hata oluştu." }

    }



}


module.exports = { getUserByCredentials, updateAuthToken, getById };