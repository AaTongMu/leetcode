#!/usr/bin/env node

/**
 * @file Help loading the title information, easy to update README.md & create a solution tempalte
 * @example:
 * ./loadQ.js question_id
 */

const fs = require('fs');
const https = require('https');
const algorithmApi = 'https://leetcode.com/api/problems/algorithms/';
const algorithmPrefix = 'https://leetcode.com/problems/';

const args = process.argv.slice(2);
if (!args.length) {
    console.log('\x1B[33m Missing question_id! \x1B[0m');
    process.exit();
}
const questionId = args[0];

const algPromise = new Promise((resolve, reject) => {
    let algorithmStr = '';
    https.get(algorithmApi, (res) => {
        res.on('data', (chunk) => {
            algorithmStr += chunk;
        }).on('end', () => {
            resolve(JSON.parse(algorithmStr));
        })
    }).on('error', (e) => {
        reject(e);
    })
});

algPromise.then((algorithm) => {
    let stat = null;
    algorithm.stat_status_pairs.forEach((item) => {
        if (item.stat.question_id == questionId) {
            stat = item.stat;
            switch (item.difficulty) {
                case 2:
                    stat.level = 'Medium'
                    break;
                case 3:
                    stat.level = 'Hard'
                    break;
                default:
                    stat.level = 'Easy'
            }
        }
    })

    return stat;
}).then((stat) => {
    if (!stat) {
        console.log('\x1B[31m Question not found! \x1B[0m');
        process.exit();
    }

    let readmeStr = `
        \n|${stat.question_id}| [${stat.question__title}](${algorithmPrefix + stat.question__title_slug}) | [javascript](./algorithm/${humpName(stat.question__title)}.js) | ${stat.level} |
    `;

    // update README.md
    fs.writeFile('README.md', readmeStr.split('\n').join(''), (err) => {
        if (err) throw err;
        console.log('\x1B[31m Update README.md sucess! \x1B[0m');
    });

    // create solution file


}).catch((e) => {
    console.log('\x1B[31m' + e.message + '\x1B[0m');
})

/**
 * Convert to hump named
 * @param str {String} name string
 * @return humpName {String}
 * 
 * @example:
 * humpName('Your name')  ->  'yourName'
 */
function humpName(str) {
    if (!typeof str === 'string') {
        throw new Error('Converted name must a string');
    }

    let nameArr = str.split(' ');
    let nameConvertedArr = nameArr.map((str, index) => {
        if (index === 0) {
            return str.toLowerCase();
        } else {
            return str.substr(0, 1).toUpperCase() + str.substr(1).toLowerCase();
        }
    });

    return nameConvertedArr.join('');
}