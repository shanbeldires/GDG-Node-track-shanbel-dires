       import http from 'http';

let students = [
    {id: 1, name: 'pascal'}, 
    {id: 2, name: 'Robert'}
];
let nextId = 3;

const studentServer = http.createServer((req, res) => {
    const { method, url } = req;
    
    if (method === 'GET' && url === '/students') {
        res.writeHead(200, {'Content-Type': 'application/json'}); 
        res.end(JSON.stringify(students));
    }

    else if (method === 'POST' && url === '/students') {
        let body = '';
        req.on('data', chunk => (body += chunk));
        req.on('end', () => {
            try {
                const data = JSON.parse(body);

                if (!data.name || typeof data.name !== 'string') {
                    res.writeHead(400, {'Content-Type': 'application/json'}); 
                    return res.end(JSON.stringify({error: 'Name field is required.'}));
                }

                let newStudent = {
                    id: nextId++,
                    name: data.name,
                };
                students.push(newStudent);

                res.writeHead(201, {'Content-Type': 'application/json'}); 
                res.end(JSON.stringify(newStudent));

            } catch (error) {
                res.writeHead(400, {'Content-Type': 'application/json'}); 
                res.end(JSON.stringify({error: 'Invalid JSON format in request body.'}));
            }
        });
    }

    else if (method === 'PUT' && url.startsWith('/students/')) {
        const parts = url.split('/');
        const id = Number(parts[2]);
        
        let body = '';
        req.on('data', chunk => (body += chunk));
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                let student = students.find(s => s.id === id);

                if (!student) {
                    res.writeHead(404, {'Content-Type': 'application/json'}); 
                    return res.end(JSON.stringify({error: `Student with ID ${id} not found.`}));
                }
                
                if (!data.name || typeof data.name !== 'string') {
                    res.writeHead(400, {'Content-Type': 'application/json'}); 
                    return res.end(JSON.stringify({error: 'New name is required for update.'}));
                }

                student.name = data.name;
                res.writeHead(200, {'Content-Type': 'application/json'}); 
                res.end(JSON.stringify(student));

            } catch (error) {
                res.writeHead(400, {'Content-Type': 'application/json'}); 
                res.end(JSON.stringify({error: 'Invalid JSON format in request body.'}));
            }
        });
    }

    else if (method === 'DELETE' && url.startsWith('/students/')) {
        const parts = url.split('/');
        const id = Number(parts[2]);
        const index = students.findIndex(s => s.id === id);

        if (index === -1) { 
            res.writeHead(404, {'Content-Type': 'application/json'}); 
            return res.end(JSON.stringify({error: `Student with ID ${id} not found.`}));
        }

        students.splice(index, 1);
        res.writeHead(200, {'Content-Type': 'application/json'}); 
        return res.end(JSON.stringify({message: `Student with ID ${id} deleted successfully.`}));
    } 
    
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 Resource Not Found');
    }
});

studentServer.listen(4000, () => {
    console.log('Server is Running on port 4000');
});