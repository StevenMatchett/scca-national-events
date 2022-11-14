const fs = require('fs');


const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)


const driverData = {};

getDirectories('public').forEach((year) => {
    fs.readdirSync(`public/${year}`, { withFileTypes: true }).forEach((event) => {
        const eventData = JSON.parse(fs.readFileSync(`public/${year}/${event.name}`));
        eventData.drivers.forEach((driver) => {
            if (!driverData[driver]) {
                driverData[driver] = [];
            }
            driverData[driver].push(`${year}-${event.name.split('.')[0]}`);
        })
    })
})

let driverEvents = [];
Object.keys(driverData).forEach((driver) => {
    driverEvents.push({
        name: driver,
        events: driverData[driver].length
    })
})
driverEvents = driverEvents.sort((a,b) => b.events - a.events);

fs.writeFileSync('public/drivers.json', JSON.stringify(driverEvents));
fs.writeFileSync('public/driversEvents.json', JSON.stringify(driverData));

