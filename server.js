const si = require('systeminformation');
require('dotenv').config();
const https = require('https');
const http = require('https');
let deviceName = 'enp1s0';
setInterval(function () {
  si.networkStats(deviceName, function (data) {
    //sendRequestToServer(data.rx_sec);
    console.log(process.env.KEY);
  });
}, 2000);

function sendRequestToServer (bandwidth) {
  let request = https.request({
    host: 'dev.calling.fun',
    port: '443',
    path: '/api/jitsi-webhook',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => { });
    res.on('end', (data) => { });
  });
  request.on('error', e => {
    console.error(e);
  });
  request.write(JSON.stringify({
    'event_type': 'health-check',
    'current_bandwidth': bandwidth,
    'server_status': true,
    'server_sid': '8a26b3f54e2a719b3aa9ece6283728c8',
  }));
  request.end();
}

function checkServerHealth () {
  return new Promise((reslove, reject) => {
    let request = http.request({
      host: 'localhost',
      port: '8888',
      path: '/about/health',
      method: 'GET'
    }, (res) => {
      res.setEncoding('utf8');
      res.on('data', (chunk) => reslove());
      res.on('end', (data) => reslove());
    });
    request.on('error', e => {
      reject(e);
    });
    request.end();
  });
}
