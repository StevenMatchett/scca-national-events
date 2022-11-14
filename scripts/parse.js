const { PdfReader, Rule } = require("pdfreader");
const fs = require('fs');

const run = (pdfLocation) => {
    const path = pdfLocation.split('/');
    const year = path[1];
    const event = path[2].split('.')[0];

    const drivers = [];
    let isIgnoring = true;
    let permIgnore = false;
    let tempDriver = [];
    
    function makeDriver(data) {
        const driver = {}
        driver['name'] = data[1];
        driver['class'] = data[2];
        driver['number'] = data[3];
        driver['time'] = data[4];
        driver['pax'] = data[5];
        return driver;
    }
    
    function writeFile(year, eventName){
        if (!fs.existsSync(`public/${year}`)){
            fs.mkdirSync(`public/${year}`);
        }
    
        let views = {};
        let driversName = [];
        drivers.forEach((driver, index)=>{
            views[driver.class] = true;
            drivers[index].percentile = (index+1)/drivers.length*100;
            driversName.push(driver.name)
        })
        views = ['PAX', 'RAW', ...Object.keys(views)];
        const data = {
            views: views,
            drivers: driversName,
            results: drivers
        }
        fs.writeFileSync(`public/${year}/${eventName}.json`, JSON.stringify(data));
    }
    
    const dateRegex = /(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}/;
    
    let count = 1
    new PdfReader().parseFileItems(`pdfs/${year}/${event}.pdf`, (err, item) => {
        if (err) console.error("error:", err);
        else if (!item) writeFile(year,event);
    
        if (!item?.text) {
            return;
        }
    
        if (item?.text === 'No Time' || permIgnore){
            permIgnore = true;
            return;
        }
    
        if (tempDriver.length === 9) {
            if (!(tempDriver[1] === 'Unknown Driver' || tempDriver[1] === 'Bad Scan' || tempDriver[1] === 'Missing Scan')) {
                drivers.push(makeDriver(tempDriver));
            }
            tempDriver = [];
            count++;
        }
    
        if (!isIgnoring) {
            tempDriver.push(item.text);
        }
    
    
        if (item?.text && item.text.includes("From Previous")) {
            isIgnoring = false;
        }
        if (item?.text && dateRegex.test(item.text.split(' ')[0].trim())) {
            // console.log(tempDriver);
            tempDriver = [];
            isIgnoring = true;
        }
    });    
}

module.exports = run;