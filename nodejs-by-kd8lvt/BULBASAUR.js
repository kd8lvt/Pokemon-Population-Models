const Test = require('./Test.js');

if (process.argv[2] && process.argv[2].toLowerCase() == 'humans') {
	let test = new Test({
		population: {
			sexRates: {outOf: 8, mRate: 7},
			fertility: {humanFertRate: 10, humanInterference: true}
		}
	});
	test.start();
} else (process.argv[2] == null)
{
	let test = new Test();
	test.start();
}
