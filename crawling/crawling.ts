import axios from 'axios'
import * as cheerio from 'cheerio'
import { decode } from 'iconv-lite'

let lastPageNum: number

(async () => {
  await axios.get('http://www.yes24.com/24/Category/Display/001001003022')
    .then(res => {
      let $ = cheerio.load(res.data)

      // 마지막 페이지번호
      const lastPageNumUrl = $('.yesUI_pagenS .end').attr('href') as string
      const equalIndexNum = lastPageNumUrl?.indexOf('=')
      
      if (equalIndexNum) lastPageNum = +lastPageNumUrl?.slice(equalIndexNum+1)
      return lastPageNum
    })
    .then(res => {
      console.log(res)
      for (let i: number =1; i<=1; i++) {
        let urlArray:string[] = []
        axios.get(`http://www.yes24.com/24/Category/Display/001001003022?PageNumber=${i}`)
          .then(res => {
            // const bodyDecoded = decode(res.data, 'utf-8')
            // let $ = cheerio.load(bodyDecoded)
            let $ = cheerio.load(res.data)
            const $liTags = $('.clearfix').children('li')
            console.log($liTags.html())
    
            $liTags.each((i, el) => {
              console.log(el)
              urlArray[i] = $(el).find('.goods_name a').attr('href') as string
            })
            return urlArray
          })
          .then(res => console.log(res))
        }
      })
    .catch(err => console.log(err))
  
  

})()
  


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
