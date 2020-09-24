const request = require('sync-request');
const cheerio = require('cheerio');
const urlencode = require('urlencode');

module.exports = {
    getCov: function() {
        let res = request('GET', `http://ncov.mohw.go.kr`);
        let $ = cheerio.load(res.getBody('utf-8'));
        let $sel = $('div.liveNumOuter div.liveNum_today_new div.datalist ul li span.data'); //일일데이터
        //일일확진자 $sel[0].children[0].data; 해외유입 sel[1].children[0].data;
        // 전체 확진자 $sel2[0].children[1].data;
        // 완치 $sel2[1].children[0].data;
        // 치료중 $sel2[2].children[0].data;
        // 사망 $sel2[3].children[0].data;
        let $sel2 = $('div.liveNumOuter div.liveNum ul.liveNum li span.num');
        return {
            hwakjin: $sel[0].children[0].data,
            haewae: $sel[1].children[0].data,
            all: $sel2[0].children[1].data,
            wanchi: $sel2[1].children[0].data,
            healing: $sel2[2].children[0].data,
            death: $sel2[3].children[0].data
        };

    }
};