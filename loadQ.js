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
    colorLog('Missing question_id!', 'error');
    process.exit();
}
const questionId = args[0];

const algPromise = new Promise((resolve, reject) => {
    // get algorithm list
    let algorithmStr = '';
    https.get(algorithmApi, (res) => {
        res.on('data', (chunk) => {
            algorithmStr += chunk;
        }).on('end', () => {
            colorLog('Get algorithm data success!', 'success');
            resolve(JSON.parse(algorithmStr));
        })
    }).on('error', (e) => {
        reject(e);
    })
});

algPromise.then((algorithm) => {
    // find question stat by question_id
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
        colorLog('Question not found!', 'error');
        process.exit();
    }

    const humpTitle = humpName(stat.question__title);

    // update README.md
    // TODO: check is README.md has this question id
    let readmeStr = `\n|${stat.question_id}| [${stat.question__title}](${algorithmPrefix + stat.question__title_slug}) | [javascript](./algorithm/${humpTitle}.js) | ${stat.level} |`;
    fs.appendFile('README.md', readmeStr, (err) => {
        if (err) throw err;
        colorLog('Update README.md success!', 'success');
    });

    // create solution file
    const filePath = './algorithm/' + humpTitle + '.js';
    try {
        const fileStat = fs.statSync(filePath);
        colorLog(`File: ${humpTitle}.js is exist!`, 'warn');
    } catch (e) {
        fs.writeFile(filePath, '// solution', (err) => {
            if (err) throw err;
            colorLog(`Created ${filePath} success!`, 'success');
        });
    }

}).catch((e) => {
    colorLog(e.message, 'error');
    process.exit();
})

/**
 * Convert to hump named
 * 
 * @param {string} str name string
 * @return {string} humpName
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

/**
 * Stdout colored text
 * 
 * @param {string} text print text
 * @param {string=} level info(blue)|warn(yellow)|error(red)
 * @return void
 */
function colorLog(text, level) {
    if (!level) {
        level = 'LOG';
    } else {
        level = level.toUpperCase();
    }

    const LEVEL = {
        'LOG': 0,
        'INFO': 34,
        'WARN': 33,
        'ERROR': 31,
        'SUCCESS': 32
    }

    console.log('\x1B[' + LEVEL[level] + 'm%s\x1B[0m\n', text);
}