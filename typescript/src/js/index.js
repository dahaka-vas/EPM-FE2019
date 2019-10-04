"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../css/normalize.css");
require("../scss/style.scss");
var BlogRenderer_1 = __importDefault(require("./classes/BlogRenderer"));
BlogRenderer_1.default.render('blog-1_section');
