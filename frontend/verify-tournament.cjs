const {buildSync} = require('esbuild');
const source = `
import assert from 'node:assert/strict';
import {clubs} from './src/clubs';
import {createDemoTournament,roundDate} from './src/demoTournament';
import {clubZones} from './src/zones';
import {buildStandings} from './src/standings';
const matches=createDemoTournament();
assert.deepEqual(clubZones.map(zone=>zone.clubIds.length),[13,13,4]);
assert.equal(new Set(clubZones.flatMap(zone=>zone.clubIds)).size,30);
assert(clubZones.flatMap(zone=>zone.clubIds).every(id=>clubs.some(club=>club.id===id)));
assert.equal(clubs.length,30);
assert.equal(matches.length,435);
assert.equal(new Set(matches.map(m=>m.id)).size,435);
const pairs=new Set();
for(let round=1;round<=29;round++) {
 const games=matches.filter(m=>m.round===round);
 assert.equal(games.length,15);
 assert.equal(new Set(games.flatMap(m=>[m.homeClubId,m.awayClubId])).size,30);
 for(const game of games) {
   assert.notEqual(game.homeClubId,game.awayClubId);
   const pair=[game.homeClubId,game.awayClubId].sort().join('|');
   assert(!pairs.has(pair)); pairs.add(pair);
 }
}
for(const club of clubs) {
 const games=matches.filter(m=>m.homeClubId===club.id||m.awayClubId===club.id);
 assert.equal(games.length,29);
 assert.equal(games.filter(m=>m.status==='Finalizado').length,2);
 const home=games.filter(m=>m.homeClubId===club.id).length;
 assert(home===14||home===15,club.name+' home count '+home);
}
const rows=buildStandings(matches);
assert.equal(rows.length,30);
assert(rows.every(r=>r.played===2));
assert.equal(rows.reduce((s,r)=>s+r.gf,0),rows.reduce((s,r)=>s+r.ga,0));
const changed=matches.map((m,i)=>i===30?{...m,status:'Finalizado' as const,homeGoals:3,awayGoals:1}:m);
assert.equal(buildStandings(changed).reduce((s,r)=>s+r.played,0),62);
assert.equal(roundDate(29),'2027-05-23');
console.log('OK: 30 clubes, 29 fechas, 435 cruces únicos, localías equilibradas, tabla y corrección de resultado.');
`;
const result = buildSync({stdin:{contents:source,resolveDir:__dirname,loader:'ts'},bundle:true,platform:'node',format:'cjs',write:false});
new Function('require',result.outputFiles[0].text)(require);
