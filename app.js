const streamLib = require('./streamLib')
const fs = require('fs')
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});





// variables
var input = '';
var allFiles = [];
var inputNumber = '';
var inputDestination = '';


// Asking for user input
let question = () => {

  return new Promise((resolve, reject) => {

    rl.question('Enter a directory in which your file you wish to copy is. ', (answer) => {

      if (answer) {
        input = '';
        input = answer;

        resolve(input)

      } else {

        reject('Please enter a directory which contains your file, considering this as your root directory')

      }

    });

  })

}//end of question


// scaning for the files
let scanForFile = () => {

  return new Promise((resolve, reject) => {

    fs.readdir(input, (err, file) => {

      if (err) {

        reject(err)

      } else {

        allFiles = [];

        const len = file.length;
        for (let i = 0; i < len; i++) {
          const key = i;
          obj = { [key]: file[i] };
          allFiles.push(obj);
        }

        resolve(allFiles)

      }
    })
  })
}//end of scanning files

let displayFiles = () => {

  return new Promise((resolve, reject) => {

    rl.question(`Enter the number of the File which you wish to copy. ${JSON.stringify(allFiles)}`, (number) => {
      //handle in case of alphabets or wrong no.
      if (/^[0-9]*$/.test(number) && allFiles.length > number) {

        inputNumber = '';
        let name = allFiles[number];
        inputNumber = name[number];

        resolve(inputNumber)

      } else {

        reject('Please enter a number of file want to Copy')

      }

    });
  })
}

let destinationDirectory = () => {

  return new Promise((resolve, reject) => {

    rl.question('Enter a directory in which you wish to copy the file. ', (answer) => {

      if (answer) {
        inputDestination = '';
        inputDestination = answer;

        resolve(inputDestination)

      } else {

        reject('Please enter a directory in which you wish to copy the file, considering this as your root directory')

      }

    });

  })

}//end of question


// scaning for the files
let scanForDestinationFile = () => {

  return new Promise((resolve, reject) => {

    fs.readdir(inputDestination, (err, file) => {

      if (err) {

        reject(err)

      } else {

        // check for the directory contains file with same name
        if (file.includes(inputNumber)) {

          let copyArray = inputNumber.split(".")

          streamLib.copyFile(`${input}${inputNumber}`, `${inputDestination}${copyArray[0]}copy.${copyArray[1]}`)

          resolve(`File is been copied from ${input}${inputNumber} to ${inputDestination}${copyArray[0]}copy.${copyArray[1]} and renamed`)

        } else {

          streamLib.copyFile(`${input}${inputNumber}`, `${inputDestination}${inputNumber}`)

          resolve(`File is been copied from ${input}${inputNumber} to ${inputDestination}${inputNumber} directory`)

        }

      }
    })
  })
}//end of scanning files


//resolving promises
question()
  .then(scanForFile)
  .then(displayFiles)
  .then(destinationDirectory)
  .then(scanForDestinationFile)
  .then(resolve => {

    console.log(resolve);
    rl.close();

  })
  .catch((err) => {

    console.log(err);
    rl.close();

  })







