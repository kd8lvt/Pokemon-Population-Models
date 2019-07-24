-- How To Run --

-- INSTALLATION: --

1. Install NodeJS - make sure you install npm with it!
2. Open your shell of choice ('CMD' on Windows, 'bash' on most Linux distros, etc etc)
3. Navigate to this folder (if you cloned this, that should be easy enough to do)
4. Run 'npm install' - this downloads the CSV package.

-- RUNNING: --

To generate data, simply run 'node "BULBASAUR.js"' or 'node "BULBASAUR NO HUMANS.js"' in your shell of choice. It's a near 1-1 of Austin's python code, but cleaned up... and then made messy again... Don't sue me.

-- VIEWING DATA --

To view data as a (rather uninformative) line-graph:
1. Run 'node webserver.js' in your shell of choice
2. Go to 'http://localhost:8080' in your web browser of choice

You are able to load other csv files into the graph by entering their file names in the textbox and clicking "Load CSV". They must be in the format "tick, males, females" however.

White line is total population, Pink line is females, and Blue line is males.

If it doesn't work, make sure you have an internet connection - you need it to download p5.js!