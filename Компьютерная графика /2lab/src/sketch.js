'use strict'
new p5();
//sizes of window
let WIDTH = 600, HEIGHT = WIDTH;

function drawPiramid (h, R, x, y, z) {
	let n = document.getElementById('n_number_of_sides').value;
	if (n < 3) {
		return;
	}
	let arr = []
	for (let i = 0; i < n; i++) {
		arr.push({x: cos(i * 2 * PI / n) * R + (x || 0),y: 0 + (y || 0),z: -(sin(i * 2 * PI / n) * R) + (z || 0)})
	}

	let top_point = {x: 0 + (x || 0), y: - h + (y || 0), z: 0 + (z || 0)};

	beginShape(TRIANGLES);
	vertex(top_point.x, top_point.y, top_point.z);
	vertex(arr[arr.length - 1].x, arr[arr.length - 1].y, arr[arr.length - 1].z);
	vertex(arr[0].x, arr[0].y, arr[0].z);
	endShape();

	for (let i = 1; i < n; i++) {
		beginShape(TRIANGLES);
		vertex(top_point.x, top_point.y, top_point.z);
		vertex(arr[i - 1].x, arr[i - 1].y, arr[i - 1].z);
		vertex(arr[i].x, arr[i].y, arr[i].z);
		endShape();
	}

	beginShape();
	for (let i = 0; i < n; i++) {
		vertex(arr[i].x, arr[i].y, arr[i].z);
	}
	endShape(CLOSE);
}

function keyPressed() {
	if (keyCode === RIGHT_ARROW) {
		camera_x += 10
		console.log('pressed right')
	} else if (keyCode === LEFT_ARROW) {
		camera_x -= 10
		console.log('pressed left')
	} else if (keyCode === UP_ARROW) {
		camera_y += 10
		console.log('pressed up')
	} else if (keyCode === DOWN_ARROW) {
		camera_y -= 10
		console.log('pressed down')
	}
}


function setup() {
	createCanvas(WIDTH, HEIGHT, WEBGL);
	background(200);
	debugMode();
}

function draw() {
	background(200);

	directionalLight(250, 250, 250, 0, 0, 0);
	// ambientLight(255);
	ambientMaterial(250);
	orbitControl();

	push();
	drawPiramid(200, 100, 0, -20, 0);
	pop();
}
