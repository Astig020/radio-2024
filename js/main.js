let canvas, c, radio, animation, w, h, w2, h2, txt, pos;

function init(){

	radio = new Radio();

	canvas = document.createElement('canvas');
	canvas.width = w = innerWidth;
	canvas.height = h = innerHeight;
	c = canvas.getContext('2d');

	w2 = w>>1;
	h2 = h>>1;

	document.body.appendChild(canvas);
	
	animation = new Animation01();
	
	addEvents();
	update();
}

function showPaused(){
	txt = "Play";
	c.font = "bold italic 3em serif";
	pos = {
		x: (w-c.measureText(txt).width)/2,
		y: h2
	};
	c.fillStyle = "black";
	c.fillRect(0,0,w,h);
	c.fillStyle = "white";
	c.fillText(txt, pos.x, pos.y);
}

function update(){

	if( radio.player.paused ){
		showPaused();
		return;
	}

	requestAnimationFrame(update);	

	radio.analyser.getByteTimeDomainData(radio.data);

	animation.show();
	
}

function addEvents(){

	canvas.addEventListener('click', function(){
		radio.togglePlay();
		update();
	});
	
	window.addEventListener('resize',function(){
		canvas.width = w = innerWidth;
		canvas.height = h = innerHeight;
		update();
	});

}

window.onload = function(){
	init();
};
