"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { v1: uuidv1 } = require('uuid');
const Redis = require('ioredis');
const redis = new Redis();
router.post('/store', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const imageName = (_a = req.body) === null || _a === void 0 ? void 0 : _a.imageName;
        const imageLink = (_b = req.body) === null || _b === void 0 ? void 0 : _b.imageLink;
        console.log('imageName', imageName);
        console.log('imageLink', imageLink);
        const uniqueID = uuidv1();
        yield redis.set(uniqueID, JSON.stringify({
            imageName: imageName,
            imgLink: imageLink,
        }));
        const data = JSON.parse(yield redis.get(uniqueID));
        res.status(200).send(uniqueID);
    }
    catch (error) {
        console.log(error);
    }
}));
router.get('/get', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keys = yield redis.keys('*');
    let values = [];
    for (let i = 0; i < keys.length; i++) {
        values.push(JSON.parse(yield redis.get(keys[i])));
    }
    res.status(200).send(values);
}));
router.get('/get/name/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.params.name;
    console.log('name', name);
    const keys = yield redis.keys('*');
    let values = [];
    for (let i = 0; i < keys.length; i++) {
        values.push(JSON.parse(yield redis.get(keys[i])));
    }
    const found = values.filter((value) => {
        if (value.imageName.toLowerCase().includes(name.toLowerCase())) {
            return value;
        }
    });
    res.status(200).send(found);
}));
exports.default = router;
