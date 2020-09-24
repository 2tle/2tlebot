const request = require('sync-request');
const urlencode = require('urlencode');
const cheerio = require('cheerio');

module.exports = {
    getWT: function(location) {
        let res = request('GET',`https://m.search.naver.com/search.naver?where=m&query=${urlencode('날씨'+location)}`);
        let $ =  cheerio.load(res.getBody('utf-8'));
        let $select = $('div.temperature_text strong');
        const nowDegree =  $select[0].children[1].data;
        $select = $('div.title_area h2.title');
        const nowloca = $select[0].children[0].data;
        $select = $('div.temperature_info p.summary');
        const weather=  $select[0].children[2].data;
        $select = $('li.type_humidity div.inner div.graph_info span.figure_result');
        const humidity =  $select[0].children[0].data + '%';
        return {
            degree: nowDegree,
            location: nowloca,
            weather: weather,
            humidity: humidity
        };
    }
};
