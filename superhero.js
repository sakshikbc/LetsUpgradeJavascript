const http = require('http');
let superheroes = [
    {
        "id": "1",
        "name": "Thor",
        "age": "32",
        "planet": "Earth",
        "weapons" : "hammer"
    },
    {
        "id": "2",
        "name": "Captain America",
        "age": "31",
        "planet": "Jupiter",
        "weapons" : "shields"
    },
    {
        "id": "3",
        "name": "Spider-Man",
        "age": "23",
        "planet": "Mars",
        "weapons" : "Web"
    },

];

const server = http.createServer((request, response) => {
    
    const path = request.url;
    // console.log(path, superheroes);
    if (request.url == '/') {
        if (request.method == 'OPTIONS') {
            response.end();
        }
        if (request.method == 'GET') {
            response.end(JSON.stringify(superheroes));
        } else if (request.method == 'POST') {
            let body = "";
            request.on('data', (data) => {
                body += data;
            });
    
            request.on('end', () => {
                let superhero = JSON.parse(body);
                superheroes.push(superhero);
            });

            response.end(JSON.stringify({message: "SuperHero Added to the Mission"}))
        } else if (request.method == 'PUT') {
            let id = request.url.split('?')[1].split('=')[1];
            let body = "";
            request.on('data', (data) => {
                body += data;
            });
            request.on('end', () => {
                let superhero = JSON.parse(body);
    
                superheroes.forEach((ele) => {
                    if (ele.id == id) {
                        ele.name = superhero.name;
                        ele.age = superhero.age;
                        ele.planet = superhero.planet;
                        ele.weapon = superhero.weapon;
                    }
                })
            })
    
            response.end(JSON.stringify({message: "SuperHero Detail Updated"}))
        } else if (request.method == 'DELETE') {
            let id = request.url.split('?')[1].split('=')[1];
            
            superheroes.forEach((ele, index) => {
                if (ele.id == id) {
                    superheroes.splice(index, 1);
                }
            });
            response.end(JSON.stringify({ message: "SuperHero Removed From Mission" }));
        } else {
            response.writeHead(404, {
                "Content-Type":"text/html"
            });
            response.end(JSON.stringify({ message: "SuperHero Not Found! Thankyou" }));
        }
    } else {
        response.writeHead(404, {
            "Content-Type":"text/html"
        });
        response.end(JSON.stringify({ message: "What do you Want ??" }));
    }
    


});

server.listen('3000', '127.0.0.1', () => {
    console.log('Server has been started');
});