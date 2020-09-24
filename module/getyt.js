const request = require('sync-request');
const urlencode = require('urlencode');
const { YOUTUBE_DATA_API_KEY } = require('../config.json');

module.exports = {
    getYT: function(a) {
        let res = request('GET',`https://www.googleapis.com/youtube/v3/search?part=id&maxResults=1&key=${YOUTUBE_DATA_API_KEY}&q=${urlencode(a)}`);
        return JSON.parse(res.getBody('utf-8')).items[0].id.videoId;
    }
}
