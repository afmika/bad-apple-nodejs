/**
 * @author afmika
 */
const input = require ('./bad-apple.json');
const color_map = ' 12';

function read (image) {
	let str = '';
	for (let i32 of image) {
		i32 = i32 & 0xFFFFFFFF;
		if (i32 < 0) {
			str += '\n';
			continue;
		}
		const color  = color_map [i32 >> 24];
		const length = i32 & 16777215;
		for (let i = 0; i < length; i++)
			str += color;
	}
	
	return str;
}


function readAfter (str, ms) {
	return new Promise ((res, rej) => {
		setTimeout (() => {
			res (str);			
		}, ms);
	});
}

async function run () {
	for (let frame of input['data']) {
		const str = read (frame);
		console.log(await readAfter (str, 1000 / 7));
	}
}

run ();