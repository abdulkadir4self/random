const express = require('express');
const multer = require('multer');
const path = require('path');

const productImageStorageSetting = multer.diskStorage({
    destination: function(req, file, callback){
        const destinationFolder = path.join(__dirname, '../uploads/');
        callback(null, destinationFolder)
    },
    filename: function(req,file,callback)
    {
        let timestamp= Date.now(); 
        const extname = path.extname(file.originalname)
        let fileNewName = `${timestamp}${extname}`
        req.fileNewName = fileNewName; 
        callback(null , fileNewName )
    }
})

const upload = multer({
    storage: productImageStorageSetting,
    fileFilter: function(req, file , callback)
    {
        const allowedMimeTypes = ['image/jpeg', 'image/png' , 'image/jpg' , 'image/webp'];
        const mimetype = file.mimetype;
        callback(null , true)
    }
})

module.exports = upload;