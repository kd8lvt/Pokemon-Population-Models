class Population {
    constructor(options) {
        if (options) { //Customized? Maybe!
            this.mPop = options.mPop || 14; //Starting male population
            this.fPop = options.fPop || 2; //Starting female population
            this.eggs = Population.populateEggVars();
            this.totalPop = this.mPop + this.fPop;
            this.ticks = 0;
            this.dataArr = [];
            options.sex = options.sex || null; //Shouldn't have to do this, but WebStorm was having a fit.
            if (options.sexRates != null) {
                this.outOf = options.sexRates.outOf || 8;
                this.maleRate = options.sexRates.mRate || 7; //options.sexRates.mRate out of options.sexRates.outOf eggs will hatch male
            } else {
                this.outOf = 8;
                this.maleRate = 7;
            }
            options.fertility = options.fertility || null;
            if (options.fertility != null) {
                this.fertRate = options.fertility.fertRate || 50;
                this.humanFertRate = options.fertility.humanFertRate || 50;
                this.humansSuck = options.fertility.humanInterference || false; //We do.
            } else {
                this.fertRate = 50;
                this.humanFertRate = 50;
                this.humansSuck = false; //We still do.
            }
        } else { //Defaults
            this.mPop = 14; //Starting male population
            this.fPop = 2; //Starting female population
            this.eggs = Population.populateEggVars();
            this.totalPop = this.mPop + this.fPop;
            this.ticks = 0;
            this.dataArr = [];

            this.outOf = 8;
            this.maleRate = 7;

            this.fertRate = 50;
            this.humanFertRate = 50;
            this.humansSuck = false;
            this.fertRate = 50;
            this.humanFertRate = 50;
            this.humansSuck = false; //We do.
        }
    }

    static randInt(min, max) {
        return Math.round(Math.random() * (max - min + 1)) + min;
    }

    static populateEggVars() {
        let _tmp = [];
        for (let i=0;i<20;i++) {
            _tmp.push(0);
        }
        return _tmp;
    }

    tickDeaths() {
        for (let i=0;i<this.fPop;i++) {
            let death = Population.randInt(1,10000);
            if (death <= 243) {
                this.fPop -= 1;
            }
        }
        for (let i=0;i<this.mPop;i++) {
            let death = Population.randInt(1,10000);
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
        return Population.randInt(1,this.outOf) <= this.maleRate;
    }

    tickNewEggs() {
        if (this.mPop >= 1 && (this.humansSuck && this.ticks <= 100)) {
            for (let i = 0; i < this.fPop; i++) {
                let egg = Population.randInt(1,100);
                if (egg <= this.fertRate) this.eggs[this.eggs.length-1] += 1; //Male exists && humans don't currently suck.
            }
        } else if (this.fPop >= 1) {
            for (let i = 0; i < this.fPop; i++) {
                let egg = Population.randInt(1,100);
                if (egg <= this.humanFertRate) this.eggs[this.eggs.length-1] += 1; //Egg group / Ditto / Human interference... what have you.
            }
        }
    }

    tickHatches() {
        if (this.eggs[0] > 0) {
            console.log(`${this.eggs[0]} Bulbasaur eggs are hatching!`);
            for (let i = 0; i < this.eggs[0]; i++) {
                this.newEgg();
            }
        }
    }

    tickEggs() {
        for (let i=0;i<this.eggs.length;i++) {
            if (i === this.eggs.length - 1) {
                this.eggs[i] = 0;
            } else {
                this.eggs[i] = this.eggs[i+1];
            }
        }
    }

    tick() {
        console.clear();
        this.ticks += 1;
        console.log("Tick: "+this.ticks);
        let eggExists = false;
        for (let j=0;j<this.eggs.length;j++) {
            if (this.eggs[j] > 0) {
                eggExists = true;
            }
        }
        if (this.fPop <= 0 && eggExists === false) {
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
    }
}

module.exports = Population;