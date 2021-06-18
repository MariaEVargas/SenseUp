var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var sqlite = require('sqlite3');

var appRoutes = require('./src/routes');

var app = express();
sqlite.