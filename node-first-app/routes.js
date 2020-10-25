
const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="name" /><button type="submit">Send</button></form></body>');
        res.write('</html>');

        return res.end(); // Avoid executing the rest
    } else if (url === '/message' && method === 'POST') {
        const body = [];

        // Stream and Buffer constructs
        req.on('data', chunk => {
            // console.log(chunk);
            body.push(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            // console.log(parsedBody);

            fs.writeFile('message.txt', message, err => {
                console.error(err);

                res.writeHead(302, { location: '/' });

                return res.end();
            });
            // writeFileSync = synchronous - Blocks code until finished
        });
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Hello World</title></head>');
    res.write('<body>Hello World</body>');
    res.write('</html>');

    // process.exit(); // Never used
    res.end(); // Must end with this
};

module.exports = {
    handler: requestHandler
};