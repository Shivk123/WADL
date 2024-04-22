// Importing necessary modules
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// Port on which the server will listen
const PORT = 5000;

// Maps file extension to MIME types
const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'application/vnd.ms-fontobject',
    '.ttf': 'application/font-sfnt'
};

// Creating a server and listening on the specified port
http.createServer((req, res) => {
    // Parsing the requested URL
    const parsedUrl = url.parse(req.url);

    // If requested URL is "/", list files in the directory
    if (parsedUrl.pathname === "/") {
        var filesLink = "<ul>";
        res.setHeader('Content-type', 'text/html');
        var filesList = fs.readdirSync("./");
        filesList.forEach(element => {
            if (fs.statSync("./" + element).isFile()) {
                filesLink += `<br/><li><a href='./${element}'>${element}</a></li>`;
            }
        });
        filesLink += "</ul>";
        res.end("<h1>Shivam Khetan 33240</h1><h1>List of files:</h1> " + filesLink);
    } else {
        // Preprocessing the requested file pathname to avoid directory traversal
        const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');
        let pathname = path.join(__dirname, sanitizePath);

        // Check if the file exists
        if (!fs.existsSync(pathname)) {
            // If the file is not found, return 404
            res.statusCode = 404;
            res.end(`File ${pathname} not found!`);
        } else {
            // Read file from file system
            fs.readFile(pathname, function (err, data) {
                if (err) {
                    res.statusCode = 500;
                    res.end(`Error in getting the file.`);
                } else {
                    // Extract the file extension
                    const ext = path.parse(pathname).ext;
                    // Set Content-type header based on the file extension
                    res.setHeader('Content-type', mimeType[ext] || 'text/plain');
                    // Send file data
                    res.end(data);
                }
            });
        }
    }
}).listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
