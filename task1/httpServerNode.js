                import http from 'http';

let portNum = 3000;

const server = http.createServer((req, res) => {
    const { method, url } = req;

    if (method === 'GET' && url === "/") {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("Welcome to Home Page");
    }
    else if (method === 'GET' && url === "/info") {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("This is the information Page");
    }
    else if (method === 'POST' && url === "/submit") {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const jsonBody = JSON.parse(body);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(jsonBody));
            }
            catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON in request body' }));
            }
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("404 Not Found");
    }
});

server.listen(portNum, () => {
    console.log(`Server is Running on ${portNum}`);
});