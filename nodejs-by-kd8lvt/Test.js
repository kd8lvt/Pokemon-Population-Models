const Population = require('./Population.js');

class Test {
    constructor(options) {
        if (options) {this.pop = new Population(options.population)}else{this.pop = new Population()};
        this.interval = null;
        this.ticks = 0;
        if (options) {
            this.csv = require('csv-writer').createObjectCsvWriter({
                path:'./web/'+(options.csvName||'bulbasaur_test_'+Math.round(Math.random()*100))+'.csv',
                header: [
                    {id:'tick',title:'tick'},
                    {id:'females',title:'females'},
                    {id:'males',title:'males'}
                ]
            });
        } else {
            this.csv = require('csv-writer').createObjectCsvWriter({
                path:'./web/bulbasaur_test_'+Math.round(Math.random()*100)+'.csv',
                header: [
                    {id:'tick',title:'tick'},
                    {id:'females',title:'females'},
                    {id:'males',title:'males'}
                ]
            });
        }
    }

    start() {
        this.interval = setInterval(()=>{
            this.pop.tick();
            if (this.pop.totalPop >= 20000) {
                console.log('Stopped in '+this.ticks+' ticks due to "max population reached"');
                this.csv.writeRecords(this.pop.dataArr);
                clearInterval(this.interval);
            } else if (this.pop.extinct) {
                console.log('Stopped in '+this.ticks+' ticks due to "extinct"');
                this.csv.writeRecords(this.pop.dataArr);
                clearInterval(this.interval);
            }
            this.ticks++
        },50);
    }
}

module.exports = Test;