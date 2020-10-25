const http = require('http'); // http https path fs os
const { handler } = require('./routes');

const server = http.createServer(handler);


// Starts an "Event loop"
// Keeps on running as long as there are event listeners registered
// Timers -> Pending Callbacks -> Poll (New callbacks) -> Check (setImmediate()) -> Close Callbacks
server.listen(5000);