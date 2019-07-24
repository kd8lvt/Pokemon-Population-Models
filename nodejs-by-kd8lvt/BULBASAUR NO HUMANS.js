const Population = require('./Population.js');

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const thisCsv = createCsvWriter({
	path:'./web/bulbasaur_no_humans.csv',
	header: [
		{id:'tick',title:'tick'},
		{id:'females',title:'females'},
		{id:'males',title:'males'}
	]
});

let interval = null;
async function start() {
	let pop = new Population(); //Default population. No humans exist in this alternate universe, apparently.
	let ticks = 0;
	interval = setInterval(()=>{
		pop.tick();
		if (pop.totalPop >= 20000) {
			console.log('Stopped in '+ticks+' ticks due to "max population reached"');
			thisCsv.writeRecords(pop.dataArr);
			clearInterval(interval);
		} else if (pop.extinct) {
			console.log('Stopped in '+ticks+' ticks due to "extinct"');
			thisCsv.writeRecords(pop.dataArr);
			clearInterval(interval);
		}
		ticks++
	},50);
}

start();