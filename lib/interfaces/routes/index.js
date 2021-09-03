import fs from 'fs';
import path from 'path';
import express from 'express';
const router = express.Router();
/* 
router.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  req.originalUrl = req.originalUrl.replace('//',
    '/');
  return next();
}); */

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== 'index.js';
  })
  .forEach((file) => {
    file = file.replace('.js',
      '');
    router.use(
      '/' + file.replace('.js',
        ''),
      require(path.join(__dirname,
        file))
    );
  });

module.exports = router;
