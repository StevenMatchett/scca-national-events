const fs = require('fs');


const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)


const driverData = {};

getDirectories('data').forEach((year) => {
    fs.readdirSync(`data/${year}`, { withFileTypes: true }).forEach((event) => {
        const eventData = JSON.parse(fs.readFileSync(`data/${year}/${event.name}`));
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

fs.writeFileSync('data/drivers.json', JSON.stringify(driverEvents));
fs.writeFileSync('data/driversEvents.json', JSON.stringify(driverData));

