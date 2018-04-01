

var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */

function queryOnSheet(sheetId, range){
    return new Promise(function(resolve, reject){
        console.log(process.env.SERVICEMAIL)
        console.log(process.env.GSUITKEY)
        
        var jwtClient = new google.auth.JWT({
            email:  process.env.SERVICEMAIL,
            key: process.env.GSUITKEY,
            scopes: 'https://www.googleapis.com/auth/drive'
        });

        var sheets = google.sheets('v4');

        jwtClient.authorize(function (err, tokens) {
            if (err) {
                console.log(err);
                return;
            }

            console.log(tokens);
            const axios = require("axios");
            const url = "https://sheets.googleapis.com/v4/spreadsheets/" + sheetId + "/values/" + range;
            return axios.get(url, {
                headers: {
                    'Authorization' : tokens.token_type + " " + tokens.access_token
                }
            }).then(response => {
                resolve(response.data.values);
            });
        });
    });
}

export default {
    getSocioEconomicEmails: function(){
        return queryOnSheet("1juluKaJ3U9qHp8eJJktr_eL_E258I47RpbjrGLrCOHI", "Sheet1!B2:B");
    }
};