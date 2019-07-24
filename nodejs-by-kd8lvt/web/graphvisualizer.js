//NOTE - THIS FILE USES THE p5.js LIBRARY
//IF IT EVER CEASES FUNCTION, PLEASE SUBMIT A PULL REQUEST FIXING IT
//****I WILL BE DOING VERY LITTLE MAINTENANCE****


let table;
let input;
let button;
let scalingB;
let scaleGraphs = true;

function preload() {
    input = createInput('http://localhost:8080/bulbasaur.csv');
    button = createButton('Load CSV');
    button.mouseClicked(loadCSV);
    scalingB = createButton('Scale? '+scaleGraphs.toString());
    scalingB.mouseClicked(scaleGraph);
    loadCSV();
}

function scaleGraph() {
    scaleGraphs = !scaleGraphs;
    this.html("Scale? "+scaleGraphs.toString());
}

function draw() {
    createDiv(); //Keep the inputs and output on separate lines
    createCanvas(500,500);
    background(0);
    stroke(255);
    let totalPops = [];
    let femPops = [];
    let malPops = [];

    let arr = table.getArray();

    for (let i=0;i<arr.length;i++) {
        totalPops[i] = arr[i][1] + arr[i][2]; //Convert to total pops.
        femPops[i] = arr[i][1]; //Add female
        malPops[i] = arr[i][2]; //And male
    }

    let minPop = min(totalPops);
    let maxPop = max(totalPops);
    let minPopF = min(femPops);
    let maxPopF = max(femPops);
    let minPopM = min(malPops);
    let maxPopM = max(malPops);

    let lastX,lastY,lastXF,lastYF,lastXM,lastYM = 0;
    for (let i = 0; i < totalPops.length; i++) {
        let val = totalPops[i];

        let xpos = map(i, 0, totalPops.length, 0, width);
        let ypos = map(val, minPop, maxPop, height, 0);

        line(xpos,ypos,lastX,lastY);
        lastX = xpos;
        lastY = ypos;
    }
    stroke(255,105,180);
    for (let i = 0; i < femPops.length; i++) {
        let val = femPops[i];
        let xpos,ypos = 0;
        if (scaleGraphs) {
            xpos = map(i, 0, femPops.length, 0, width);
            ypos = map(val, minPop, maxPop, height, 0);
        } else {
            xpos = map(i, 0, femPops.length, 0, width);
            ypos = map(val, minPopF, maxPopF, height, 0);
        }
        line(xpos,ypos,lastXF,lastYF);
        lastXF = xpos;
        lastYF = ypos;
    }
    stroke(0,191,255);
    for (let i = 0; i < malPops.length; i++) {
        let val = malPops[i];
        let xpos,ypos = 0;
        if (scaleGraphs) {
            xpos = map(i, 0, malPops.length, 0, width);
            ypos = map(val, minPop, maxPop, height, 0);
        } else {
            xpos = map(i, 0, malPops.length, 0, width);
            ypos = map(val, minPopM, maxPopM, height, 0);
        }

        line(xpos,ypos,lastXM,lastYM);
        lastXM = xpos;
        lastYM = ypos;
    }
}

async function loadCSV() {
    table = await loadTable(input.value(),'csv','header');
}