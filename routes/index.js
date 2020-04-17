﻿'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');
const dataPath = process.cwd() + '/public/data/';

router.get('/', function (req, res) {
    res.render('index');
});

// Create & update file.
router.post('/', function (req, res) {
    let content = req.body.content;
    let filename = req.body.filename;
    let filePath = dataPath + filename;
    fs.writeFile(filePath, content, err => {
    	res.json(err);
    });
});

// Get existing file list.
router.get("/list", function (req, res) {
    fs.readdir(dataPath, (err, files) => {
        res.json(files);
    });
});

// Get target file.
router.get('/:filename', function (req, res) {
    const targetFile = dataPath + req.params.filename;
    fs.readFile(targetFile, 'utf-8', function (error, data) {
        if (error) {
            console.error(error);
            res.send(error.message);
        } else {
            res.send(data);
        }
    })
});

module.exports = router;
