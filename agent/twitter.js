var twitter = require('ntwitter');
var credentials = require('./credentials.js');

var databaseUrl = 'soagent'; // "username:password@example.com/mydb"
var collections = ['tweets']
var db = require('mongojs').connect(databaseUrl, collections);

var t = new twitter({
    consumer_key: credentials.consumer_key,
    consumer_secret: credentials.consumer_secret,
    access_token_key: credentials.access_token_key,
    access_token_secret: credentials.access_token_secret
});

var tracked = [
    'Lion Air',
    'Air Asia',
    'Valuair',
    'Jetstar',
    'Tiger',
    'Merpati',
    'Mandala',
    'Citilink',
    'Telkomsel',
    'Kartuhalo',
    'Indosat',
    'IM3',
    'Matrix',
    'M3',
    'Excel',
    'XL',
    'Smartfren',
    'Tri',
    'Axis',
    'Esia',
    'PKS',
    'Partai Keadilan Sejahtera'
];

t.stream(
    'statuses/filter',
    { track: tracked },
    function(stream) {
        stream.on('data', function(tweet) {
        	db.tweets.save( tweet, function(err, saved) {
				if( err || !saved ) {
				}else{
				  	console.log('failed to save tweet');
				} 
			});
            console.log(tweet.text);
        });
    }
);

/*
budget airlines

Lion Air
Air Asia
Valuair
Jetstar
Tiger
Merpati
Mandala
Citilink

telco

Telkomsel
Kartuhalo
Halo
Indosat
IM3
Matrix
M3
Excel
XL
Smartfren
3
Axis
Esia

partai

PKS
Partai Keadilan Sejahtera
*/

