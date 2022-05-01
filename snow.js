window.onload = function(){
    let ctx = document.getElementById('sky').getContext('2d');
    let W = window.innerWidth;
    let H = window.innerHeight;
    ctx.canvas.width = W;
    ctx.canvas.height = H;

    //generate the snowflakes and aply attributes
    let mf = 100; // max flakes
    let flakes = [];

    //loop through the empty flakes and apply attributes
    for (let i = 0; i < mf; i++) {
        flakes.push({
            x: Math.random()*W,
            y: Math.random()*H,
            r: Math.random()*5 + 1, //flake radius min 1px max 7px
            d: Math.random()+1 //density of the flake: how quickly it falls down
        })
    }//console.log(flakes);

    //draw flakes onto the canvas
    function drawFlakes() {
        ctx.clearRect(0, 0, W, H);
        ctx.beginPath();
        ctx.fillStyle = 'white';
        for(let i = 0; i < mf; i++){
            let f = flakes[i];
            ctx.moveTo(f.x, f.y);
            ctx.arc(f.x,f.y,f.r,0,Math.PI*2,true);
        }
        ctx.fill();
        moveFlakes();
    }

    //animate/move the flakes
    let angle = 0;
    function moveFlakes(){
        angle += 0.01;
        for(let i = 0; i < mf; i++){
            //store current flake
            let f = flakes[i];
            //update X and Y coordinates of each flake
            f.y += Math.pow(f.d, 2) + 1;
            f.x += Math.sin(angle) * 2;
            //if the flake reaches the bottom, send a new one to the top
            if(f.y > H){
                flakes[i] = {x:Math.random()*W,y:0,r:f.r,d:f.d};
                console.log(flakes[i]);
            }
        }
    }//end moveFlakes()

    setInterval(drawFlakes, 25);


}// end of window.onload