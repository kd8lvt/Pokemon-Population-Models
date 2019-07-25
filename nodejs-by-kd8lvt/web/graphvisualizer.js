//NOTE - THIS FILE USES THE p5.js LIBRARY
//IF IT EVER CEASES FUNCTION, PLEASE SUBMIT A PULL REQUEST FIXING IT
//****I WILL BE DOING VERY LITTLE MAINTENANCE****


let scaleGraphs = true;
let table,input,button,scalingB,div,canvas,minPop,maxPop,totalPops,malPops,femPops;
let arrays = [totalPops,malPops,femPops];
function preload() {
    input = createInput('http://localhost:8080/bulbasaur.csv');
    button = createButton('Load CSV');
    button.mouseClicked(loadCSV);
    scalingB = createButton('Scale? ' + scaleGraphs.toString());
    scalingB.mouseClicked(scaleGraph);
    div = createDiv(); //Keep the inputs and output on separate lines
    totalPops=[];malPops=[];femPops = [];
    loadCSV();
}
function setup() {
    canvas = createCanvas(500,500);
    //canvas.mouseMoved(checkX);
}
function scaleGraph() {
    scaleGraphs = !scaleGraphs;
    this.html("Scale? "+scaleGraphs.toString());

}

function draw() {
    let arr = table.getArray();

    for (let i=0;i<arr.length;i++) {
        totalPops[i] = parseInt(parseInt(arr[i][1]) + parseInt(arr[i][2])); //Convert to total pops.
        femPops[i] = arr[i][1]; //Add female
        malPops[i] = arr[i][2]; //And male
    }

    minPop = min(totalPops);
    maxPop = max(totalPops);

    background(0);
    strokeWeight(1);
    stroke(255);

    drawGraph({r:255,g:255,b:255},totalPops);
    drawGraph({r:255,g:105,b:180},femPops);
    drawGraph({r:0,g:191,b:255},malPops);
}

function drawGraph(rgb,arr) {
    let lastX,lastY=0;
    stroke(rgb.r,rgb.g,rgb.b,255);
    minPopNS = min(arr);
    maxPopNS = max(arr);
    for (let i = 0; i < arr.length; i++) {
        let val = arr[i];
        xpos = i;//map(i, 0, arr.length, 0, width);
        if (scaleGraphs) {
            ypos = map(val, minPop, maxPop, height-50, 0)+50;
        } else {
            ypos = map(val, minPopNS, maxPopNS, height-50, 0)+50;
        }

        line(xpos,ypos,lastX,lastY);

        lastX = xpos;
        lastY = ypos;

        if (mouseX <= width && mouseX >= 0) {
            if (xpos == mouseX) {
                stroke(255,255,0);
                line(mouseX,0,mouseX,height);
                noStroke();
                fill(rgb.r,rgb.g,rgb.b)
                text(val, xpos, ypos - 30);
                stroke(rgb.r,rgb.g,rgb.b)
            }
        }
    }
}

function checkX() {
    if (mouseX <= 500 && mouseX >= 0) {
        for (let j = 0; j < arrays; j++) {
            let arr = arrays[j];
            for (let k = 0; k < arr.length; k++) {
                let xpos = k;//map(k, 0, arr.length, 0, width);
                if (scaleGraphs) {
                    ypos = map(val, minPop, maxPop, height, 0);
                } else {
                    ypos = map(val, minPopNS, maxPopNS, height, 0);
                }
                if (k === mouseX) {
                    strokeWeight(10);
                    point(xpos, ypos);
                    text(arr[i], xpos, ypos - 20);
                    strokeWeight(1);
                }
            }
        }
    }
}

async function loadCSV() {
    table = await loadTable(input.value(),'csv','header');
}