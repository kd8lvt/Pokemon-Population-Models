const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const thisCsv = createCsvWriter({
	path:'./bulbasaur no humans.csv',
	header: [
		{id:'tick',title:'tick'},
		{id:'females',title:'females'},
		{id:'males',title:'males'}
	]
});


function randInt(min,max) {
	return Math.round(Math.random()*(max - min + 1)) + min;
}

class Population {
	constructor(sleep) {
		this.mPop = 14;
		this.fPop = 2;
		this.eggs = this.populateEggVars();
		this.totalPop = this.mPop+this.fPop;
		this.sleep = sleep;
		this.ticks = 0;
		this.dataArr = [];
		//this.start();
	}

	start() {
		this.interval = setInterval(this.tick,this.sleep)
	}

	populateEggVars() {
		let _tmp = [];
		for (let i=0;i<20;i++) {
			_tmp.push(0);
		}
		return _tmp;
	}

	tickDeaths() {
		for (var i=0;i<this.fPop;i++) {
			let death = randInt(1,10000);
			if (death <= 243) {
				this.fPop -= 1;
			}
		}
		for (var i=0;i<this.mPop;i++) {
			let death = randInt(1,10000);
			if (death <= 243) {
				this.mPop -= 1;
			}
		}
	}

	newEgg() {
		if (this.chooseSex()) {
			this.mPop += 1;
		} else {
			this.fPop += 1;
		}
	}

	chooseSex() {
		let s = randInt(1,8);
		if (s <= 7) return true;
		return false;
	}

	tickNewEggs() {
		if (this.mPop >= 1) {
			for (var i = 0; i < this.fPop; i++) {
				let egg = randInt(1,100)
				if (egg <= 50) this.eggs[this.eggs.length-1] += 1; //Male exists
			}
		} else if (this.fPop >= 1) {
			for (var i = 0; i < this.fPop; i++) {
				let egg = randInt(1,100);
				if (egg <= 10) this.eggs[this.eggs.length-1] += 1; //Egg group / Ditto
			}
		}
	}

	tickHatches() {
		if (this.eggs[0] > 0) {
			console.log(`${this.eggs[0]} Bulbasaur eggs are hatching!`);
			for (var i = 0; i < this.eggs[0]; i++) {
				this.newEgg();
			}
		}
	}

	tickEggs() {
		for (let i=0;i<this.eggs.length;i++) {
			if (i == this.eggs.length - 1) {
				this.eggs[i] = this.eggs[i] - this.eggs[i];
			} else {
				this.eggs[i] = this.eggs[i] - this.eggs[i] + this.eggs[i+1];
			}
		}
	}

	tick() {
		console.clear();
		this.ticks += 1;
		console.log("Tick: "+this.ticks);
		//for (let j=0;j < 20000;j=this.totalPop) {
			let eggExists = false;
			for (let j=0;j<this.eggs.length;j++) {
				if (this.eggs[j] > 0) {
					eggExists = true;
				}
			}
			if (this.fPop <= 0 && eggExists == false) {
				this.extinct = true;
			}
			this.tickNewEggs();
			this.tickHatches();
			this.tickDeaths();
			this.tickEggs();
			this.totalPop = this.mPop + this.fPop;

			let waitingEggs = 0;
			for (let i=0;i<this.eggs.length;i++) {
				waitingEggs += this.eggs[i];
			}
			console.log('Total Population: '+this.totalPop);
			console.log('Females: '+this.fPop);
			console.log('Males: '+this.mPop);
			console.log('Eggs Waiting To Hatch: '+waitingEggs);
			this.dataArr.push({tick:this.ticks,females:this.fPop,males:this.mPop});
			//ticks = j;
		//}
	}
}

let interval = null;
async function start() {
	let pop = await new Population();
	let ticks = 0;
	interval = setInterval(()=>{
		pop.tick();
		if (pop.totalPop >= 20000) {
			console.log('Stopped in '+ticks+' ticks due to "max population reached"');
			//console.log(asciichart.plot(pop.chart,{height:100}));
			thisCsv.writeRecords(pop.dataArr);
			clearInterval(interval);
		} else if (pop.extinct) {
			console.log('Stopped in '+ticks+' ticks due to "extinct"');
			//console.log(asciichart.plot(pop.chart,{height:100}));
			thisCsv.writeRecords(pop.dataArr);
			clearInterval(interval);
		}
		ticks++
	},50);
}

start();