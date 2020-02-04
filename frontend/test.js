//const fetch = require('node-fetch')
//const header = {}
//header['Authorization'] = `Basic ` +   Buffer.from(`admin:admin`).toString('base64')
//header['Content-Type'] = 'application/json'
//fetch('http://localhost:8000' + '/api/users/85/', {
//	method: 'GET', 
//	headers: header
//}, (res) => {
//	console.log(res)
//})
//        // .then(res => res.text())
//        // .then(res => {
//        // console.log(res)
//    //})
//

function test() {
	return new Promise((thikxa, bigryo) => {
		setTimeout(()=> {
			thikxa("hello")
			bigryo("error aayao")
		}, 2000)
	})
}

a = test()
	.then(data => { console.log(data + "world!!!" )})
	.catch(bigryo => {
		console.log("Error while getting the data: " + bigryo)
	})
	.then(() => {
		console.log("world")
	})
console.log("some other task")
