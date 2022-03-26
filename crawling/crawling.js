"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
let lastPageNum;
(async () => {
    await axios_1.default.get('http://www.yes24.com/24/Category/Display/001001003022')
        .then(res => {
        let $ = cheerio.load(res.data);
        // 마지막 페이지번호
        const lastPageNumUrl = $('.yesUI_pagenS .end').attr('href');
        const equalIndexNum = lastPageNumUrl === null || lastPageNumUrl === void 0 ? void 0 : lastPageNumUrl.indexOf('=');
        if (equalIndexNum)
            lastPageNum = +(lastPageNumUrl === null || lastPageNumUrl === void 0 ? void 0 : lastPageNumUrl.slice(equalIndexNum + 1));
        return lastPageNum;
    })
        .then(res => {
        console.log(res);
        for (let i = 1; i <= 1; i++) {
            let urlArray = [];
            axios_1.default.get(`http://www.yes24.com/24/Category/Display/001001003022?PageNumber=${i}`)
                .then(res => {
                // const bodyDecoded = decode(res.data, 'utf-8')
                // let $ = cheerio.load(bodyDecoded)
                let $ = cheerio.load(res.data);
                const $liTags = $('.clearfix').children('li');
                console.log($liTags.html());
                $liTags.each((i, el) => {
                    console.log(el);
                    urlArray[i] = $(el).find('.goods_name a').attr('href');
                });
                return urlArray;
            })
                .then(res => console.log(res));
        }
    })
        .catch(err => console.log(err));
})();
// axios.get('http://www.yes24.com/Product/Goods/2112729')
//   .then(res => {
//     const $ = cheerio.load(res.data)
//     // 책 이미지
//     const bookImgUrl = $('.gd_img .imgBdr img').attr('src')
//     console.log(bookImgUrl)
//     // 책 제목
//     const bookName = $('.gd_titArea .gd_name').text()
//     console.log('booknamd: ', bookName)
//     // 책 저자, 출판사, 출판일
//     const bookInfo = $('.gd_pubArea')
//     const bookWriter = bookInfo.find('.gd_auth a').text()
//     const bookPub = bookInfo.find('.gd_pub a').text()
//     const bookPubDate = bookInfo.find('.gd_date').text()
//     console.log(bookWriter, bookPub, bookPubDate)
//   })
