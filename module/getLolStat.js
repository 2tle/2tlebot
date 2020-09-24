const {RIOTAPIKEY} = require('../config.json');
const request = require('sync-request');
const urlencode = require('urlencode');

module.exports = {
    getLolData: function(username) {
        let res1 = request('GET',`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${urlencode(username)}?api_key=${RIOTAPIKEY}`);
        let dt  = JSON.parse(res1.getBody('utf-8'));
        let res2 = request('GET',`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${dt.id}?api_key=${RIOTAPIKEY}`);
        const lolData = JSON.parse(res2.getBody('utf-8'));
        console.log(lolData.length);
        let solo = null;
        let team = null;
        let soloWL = null;
        let teamWL = null;
        if(lolData.length == 1){
            if (lolData[0].queueType == "RANKED_SOLO_5x5") {
                solo = lolData[0].tier+' '+lolData[0].rank+' / '+lolData[0].leaguePoints;
                soloWL = lolData[0].wins+' / '+lolData[0].losses;
            } else if (lolData[0].queueType == "RANKED_FLEX_SR") {
                team = lolData[0].tier+' '+lolData[0].rank+' / '+lolData[0].leaguePoints;
                teamWL = lolData[0].wins+' / '+lolData[0].losses;
            }
        } else if(lolData.length == 2) {
            if(lolData[0].queueType == "RANKED_SOLO_5x5" && lolData[1].queueType == "RANKED_FLEX_SR") {
                solo = lolData[0].tier+' '+lolData[0].rank+' / '+lolData[0].leaguePoints;
                soloWL = lolData[0].wins+' / '+lolData[0].losses;
                team = lolData[1].tier+' '+lolData[1].rank+' / '+lolData[1].leaguePoints;
                teamWL = lolData[1].wins+' / '+lolData[1].losses;
            } else if(lolData[1].queueType == "RANKED_SOLO_5x5" && lolData[0].queueType == "RANKED_FLEX_SR") {
                solo = lolData[1].tier+' '+lolData[1].rank+' / '+lolData[1].leaguePoints;
                teamWL = lolData[0].wins+' / '+lolData[0].losses;
                team = lolData[0].tier+' '+lolData[0].rank+' / '+lolData[0].leaguePoints;
                soloWL = lolData[1].wins+' / '+lolData[1].losses;
            }
        }
        if(solo != null && team != null) {
            return [{name: '솔랭', value: solo},{name: '솔랭 승/패', value: soloWL},{name: '자랭',value: team},{name: '자랭 승/패', value: teamWL}];
        } else if (solo != null && team == null) {
            return [{name: '솔랭', value: solo},{name: '솔랭 승/패', value: soloWL}];
        } else if (team != null && solo == null) {
            return [{name: '자랭',value: team},{name: '자랭 승/패', value: teamWL}];
        } else {
            return null;
        }
    }
};