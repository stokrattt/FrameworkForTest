const bmpClient = require('browsermob-proxy-client-nodejs');
const bmpHost = '127.0.0.1'; //ip where BrowserMob Proxy was started
const bmpPort = 7700; //tcp port where BrowserMob Proxy was started
global.browserMobProxyClient = undefined;

module.exports = (new bmpClient(bmpHost, bmpPort)).create()
	.then((client) => {
		//Browser Mob Client
		browserMobProxyClient = client;
	}, rej => {
		console.log(rej);
	})
	.then(() => {
		console.log(`proxy was created on ${bmpHost}:${browserMobProxyClient.port}`.green);
		return `${bmpHost}:${browserMobProxyClient.port}`;
		//start capture a traffic
	}, rej => {
		console.log(rej);
	});