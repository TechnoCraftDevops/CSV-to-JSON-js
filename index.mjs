import papaparse from "papaparse";
import date from "date-and-time";
import fs from 'fs';

const file = fs.createReadStream('commissions_07_2022.csv');

let caluclatedArray = []
let caluclatedYearlyArray = []
const config = {
    worker: true,
    delimiter: ';',
    header: true,
    complete: function (results) {
        const jsonResult =  results.data
        jsonResult.forEach(element => {
            element.CI_montant_ht = parseInt(element.CI_montant_ht) * 15
            caluclatedArray.push(element);
        });
        fs.writeFile('myjsonfileCalc.json', JSON.stringify(caluclatedArray), 'utf8', (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    }
};

function convertCsvToJson() {
    try {
        papaparse.parse(file, {
            worker: true,
            delimiter: ';',
            header: true,
            complete: function (results) {
                const jsonResult =  results.data
                jsonResult.forEach(element => {
                    element.CI_montant_ht = parseInt(element.CI_montant_ht) * 15
                    let fuckDate = element.CI_date_effet.split('/').join('-')
                    element.CI_date_effet = JSON.stringify(date.parse(fuckDate, 'DD-MM-YYYY').getFullYear());
                    caluclatedArray.push(element);
                });
                fs.writeFile('myjsonfileCalc.json', JSON.stringify(caluclatedArray), 'utf8', (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });
            }});
    } catch (error) {
        console.log('converte function : ', error)
    }
}

convertCsvToJson()
