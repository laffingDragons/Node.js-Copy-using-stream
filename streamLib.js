/* Types of Streams#

There are four fundamental stream types within Node.js:

Readable - streams from which data can be read (for example fs.createReadStream()).
Writable - streams to which data can be written (for example fs.createWriteStream()).
Duplex - streams that are both Readable and Writable (for example net.Socket).
Transform - Duplex streams that can modify or transform the data as it is written and read (for example zlib.createDeflate())

*/
const fs = require('fs')

/* Reading A File Via Stream */
let readFileStream = () => {

    let readStream = fs.createReadStream('bigTextFile.txt')

    readStream.on('data',(chunk)=>{
        console.log(chunk)
    })
    readStream.on('end',()=>{
        console.log('File Read Operation : Successful')
    })
}

/* Writing A File Via Stream */
let writeFileStream = () => {
    let writeStream = fs.createWriteStream('fileStream.txt');
    writeStream.write('Hello edWisor!\n');
    writeStream.write('Another line\n');
    writeStream.end();
    console.log('File Written Successfully')
}

let generateBigTextFile = () => {
    const writeStream = fs.createWriteStream('./bigTextFile.txt')
    console.log('Writing To File Started. Approx ~900 MB file will be generated')
    //1e6 Equals to 1*10^6
    for(let i=0; i<= 1e6; i++) {
        writeStream.write(`Lorem ipsum dolor sit amet,
        consectetur adipisicing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet,
        consectetur adipisicing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`)
    }

    writeStream.end();
}


/* Copying A File Using Both Read And Write Streaming Mechanism */
let copyFile = (sourceFile, destinationFile) => {
    let readStream = fs.createReadStream(sourceFile)
    let writeStream = fs.createWriteStream(destinationFile)
    readStream.on('data',(chunk)=>{
        writeStream.write(chunk)
    })
    readStream.on('end',()=>{
        console.log('File Read Complete')
        writeStream.end()
        console.log('File Write Complete')
    })
}


/* Implement a Readable Stream */

let createReadStream = () => {
    const { Readable } = require('stream')
    const inStream = new Readable()
    inStream.push('Hello')
    inStream.push('edWisor!')
    inStream.push(null); // No more data to push
    inStream.pipe(process.stdout)
}


let createWritableStream = () => {
    /* Importing The Writable Interface From Stream Module */
    const { Writable } = require('stream')
    const outStream = new Writable({
        write(chunk, encoding, callback) {
            console.log('Raw Input Is')
            console.log(chunk)
            console.log('The Encoded Input')
            console.log(chunk.toString())
            callback()
        }
    })
    process.stdin.pipe(outStream)

}

module.exports = {
    readFileStream: readFileStream,
    writeFileStream: writeFileStream,
    copyFile: copyFile,
    generateBigTextFile: generateBigTextFile,
    createReadStream: createReadStream,
    createWritableStream: createWritableStream
}