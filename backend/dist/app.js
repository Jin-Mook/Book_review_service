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
const redis_1 = require("redis");
const app = (0, express_1.default)();
const client = (0, redis_1.createClient)();
app.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newId = req.params.id;
        console.log(newId);
        res.send(`new id: ${newId}`);
    }
    catch (err) {
        console.error(err);
        res.send('rule');
    }
}));
app.get('/redis/:word', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newWord = req.params.word;
        yield client.connect();
        yield client.set('key', newWord);
        const inputWord = yield client.get('key');
        res.send(`new word is ${inputWord}`);
    }
    catch (err) {
        console.error(err);
        res.send('error');
    }
}));
app.get('/test', (req, res, next) => {
    console.log('test');
    console.log('test2');
    res.send('test3');
});
app.listen('3000', () => {
    console.log('3000포트에서 서버 시작');
});
//# sourceMappingURL=app.js.map