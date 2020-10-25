
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <html>
                <head><title>Greetings</title></head>
                <body>
                    <h1>Assignment - 1</h1>
                    <form action="/create-user" method="POST">
                        <input type="text" name="username" />
                        <button type="submit">Send</button>
                    </form>
                </body>
            </html>
        `);

        return res.end();
    } else if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <html>
                <head><title>Users</title></head>
                <body>
                    <h1>Users</h1>
                    <ul>
                        <li>User 1</li>
                    </ul>
                </body>
            </html>
        `);

        return res.end();
    } else if (url === '/create-user' && method === 'POST') {
        const body = [];

        req.on('data', chunk => body.push(chunk));

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];

            console.log(username);

            res.writeHead(302, { location: '/' });

            return res.end();
        });
    }

    res.writeHead(302, { location: '/' });

    res.end();
};

module.exports = {
    handler: requestHandler
};