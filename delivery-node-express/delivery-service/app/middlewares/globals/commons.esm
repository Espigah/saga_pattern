const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
/** @param { import('express').Express} app */
module.exports = (app) => {
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(helmet());
};
