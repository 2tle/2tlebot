const request = require('sync-request');
const {PUBGAPIKEY} = require('../config.json');
const season = 'division.bro.official.pc-2018-08';

module.exports = {
    getPubg: function(platform,username) {
        const header = {
            'Authorization': 'Bearer '+PUBGAPIKEY,
            'Accept': 'application/vnd.api+json'
        }
        let responseArr = []; /*
        let getSeason = request('GET',`https://api.pubg.com/shards/${platform}/seasons`,{headers:header});
        let season1 = JSON.parse(getSeason.getBody('utf-8')).data
        let season = season1[season1.length - 1].id; */
        let getUserID = request('GET',`https://api.pubg.com/shards/${platform}/players?filter[playerNames]=${username}`, {headers:header});
        const userID = JSON.parse(getUserID.getBody('utf-8')).data[0].id;
        let getSeasonStats = request('GET', `https://api.pubg.com/shards/${platform}/players/${userID}/seasons/${season}`, {headers:header});
        let data = JSON.parse(getSeasonStats.getBody('utf-8')).data.attributes.gameModeStats;

        responseArr.push({name:"솔로 승리/탑텐", value:`${data.solo.wins} / ${data.solo.top10s}`});
        responseArr.push({name:"솔로 K/D/A", value:`${data.solo.kills} / ${data.solo.losses} / ${data.solo.assists}`});
        responseArr.push({name:'솔로 최장거리 킬',value: `${data.solo.longestKill}m`});
        responseArr.push({name:'솔로 라운드 최대킬', value: `${data.solo.roundMostKills}`});

        responseArr.push({name:"듀오 승리/탑텐", value:`${data.duo.wins} / ${data.duo.top10s}`});
        responseArr.push({name:"듀오 K/D/A", value:`${data.duo.kills} / ${data.duo.losses} / ${data.duo.assists}`});
        responseArr.push({name:'듀오 최장거리 킬',value: `${data.duo.longestKill}m`});
        responseArr.push({name:'듀오 라운드 최대킬', value: `${data.duo.roundMostKills}`});

        responseArr.push({name:"스쿼드 승리/탑텐", value:`${data.squad.wins} / ${data.squad.top10s}`});
        responseArr.push({name:"스쿼드 K/D/A", value:`${data.squad.kills} / ${data.squad.losses} / ${data.squad.assists}`});
        responseArr.push({name:'스쿼드 최장거리 킬',value: `${data.squad.longestKill}m`});
        responseArr.push({name:'스쿼드 라운드 최대킬', value: `${data.squad.roundMostKills}`});

        return responseArr;
    }
};