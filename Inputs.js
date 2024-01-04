import Cleave from "./node_modules/cleave.js/dist";

var cleave = new Cleave('#newLat', {
    delimiter: '·',
    blocks: [2, 7],
    uppercase: true
});

var cleave = new Cleave('#newLon', {
    delimiter: '·',
    blocks: [1, 7],
    uppercase: true
});

var cleave = new Cleave('#newlat', {
    delimiter: '·',
    blocks: [2, 7],
    uppercase: true
});

var cleave = new Cleave('#newlon', {
    delimiter: '·',
    blocks: [1, 7],
    uppercase: true
});
var cleave = new Cleave('#newYear', {
    blocks: [4],
    uppercase: true
});
var cleave = new Cleave('#year', {
    blocks: [4],
    uppercase: true
});

var cleave = new Cleave('#newDay', {
    blocks: [2],
    uppercase: true
});
var cleave = new Cleave('#day', {
    blocks: [2],
    uppercase: true
});