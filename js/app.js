//Player Class
var Player=function(parameterX,parameterY)
{
	this.playerX=parameterX;//initial position of player character on the x axis
	this.playerY=parameterY;//initial position of player character on the y axis
	this.sprite='images/char-boy.png';//character used as player
	this.playerPoints=0;//points scored
}
Player.prototype.render=function()
{
	ctx.drawImage(Resources.get(this.sprite), this.playerX, this.playerY);//displays the player character
}

Player.prototype.checkPoint=function()
{
	this.playerPoints+=5;//increments the points by 5
	var x=document.getElementById('points');

	if(this.playerPoints>=500)
	{document.write("<h1>Game is finished!!!</h1>");}//if points are 500 then game is finished
	else
	{
		x.innerHTML=this.playerPoints;//displays the points on the screen
	}
}
Player.prototype.handleInput=function(key)
{
	if(key==='up')
	{
			if(this.playerY<85)
 			{this.resetPosition();}
			else
			{this.playerY-=85;}
	}
	else if(key=='down')
	{
			if(this.playerY>340)
			{this.resetPosition();}
			else
			{this.playerY+=85;}
	}
	else if(key=='left')
	{
			if(this.playerX<=5)
			{this.resetPosition();}
			else
			{this.playerX-=100;}
	}
	else if(key=='right')
	{
			if(this.playerX>=400)
			{this.resetPosition();}
			else
			{this.playerX+=100;}
	}
}
Player.prototype.resetPosition=function()
{
	this.playerX=100;//resets the position of the player
	this.playerY=395;
	this.playerPoints=0;//resets the score to 0
	var x=document.getElementById('points');
	x.innerHTML=this.playerPoints;//displays the score
}
//Key class
var Key=function()
{
	this.KeyX=100;//initial position of the key
	this.KeyY=250;
	this.sprite='images/Key.png';
}
Key.prototype.render=function()
{
ctx.drawImage(Resources.get(this.sprite), this.KeyX, this.KeyY);//displays the key
}
Key.prototype.update=function()
{
}
var Heart=function()
{
	this.HeartX=200;
	this.HeartY=250;
	this.sprite='images/Heart.png';
}
Heart.prototype.render=function()
{
	ctx.drawImage(Resources.get(this.sprite), this.HeartX, this.HeartY);//displays the Heart
}
Heart.prototype.update=function()
{
}
// Enemies class
var Enemy = function(parameterX,parameterY) {
    this.enemyX=parameterX;//initial position of enemy bug on the x-axis
	this.enemyY=parameterY;//initial position of enemy bug on the y-axis
	this.enemySpeed=Math.floor(Math.random()*100);//speed of the enemy bug
    this.sprite = 'images/enemy-bug.png';//character used as enemy
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.enemyX+=(this.enemySpeed*dt);//incrementing the enemy's x position
	if(this.enemyX>500)//if the enemy crosses the width of the canvas
	{this.enemyX=-100;}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.enemyX, this.enemyY);
};

Player.prototype.update=function(dt)
{
	if (this.playerX < allEnemies[0].enemyX + 73 && this.playerX + 73 > allEnemies[0].enemyX && this.playerY < allEnemies[0].enemyY+ 73 && this.playerY + 73 > allEnemies[0].enemyY) //checks for collision with the enemy
	{
		this.resetPosition();//character's position is reset
	}
	else if (this.playerX < allEnemies[1].enemyX + 73 && this.playerX + 73 > allEnemies[1].enemyX && this.playerY < allEnemies[1].enemyY + 73 && this.playerY + 73 > allEnemies[1].enemyY) //checks for collision with the enemy
	{
		this.resetPosition();//character's position is reset
	}
	else if (this.playerX < allEnemies[2].enemyX + 73 && this.playerX + 73 > allEnemies[2].enemyX && this.playerY < allEnemies[2].enemyY + 73 && this.playerY+ 73 > allEnemies[2].enemyY) //checks for collision with the enemy
	{
		this.resetPosition();//character's position is reset
	}

	if (this.playerX<key.KeyX+50 && this.playerX+50>key.KeyX && this.playerY<key.KeyY+50 && this.playerY+50>key.KeyY) //checks for collision with the key
	{this.updateKey();//updates the new position of the key
	 this.checkPoint();}//if collision occurs then points are increased
	if (this.playerX<heart.HeartX+70 && this.playerX+70>heart.HeartX && this.playerY<heart.HeartY+70 && this.playerY+70>key.KeyY) //checks for collision with the Heart
	{this.updateHeart();//updates the new position of the Heart
	 this.checkHeartPoint();}
}
Player.prototype.updateHeart=function()
{
	heart.HeartX=Math.random()*300;//random position of heart on x axis
	var t=Math.random()*255;
	while(t<=50 && t>=245 && t%50===0)
	{
		t=Math.random()*245;
	}
	heart.HeartY=t;//random position of heart on y axis
}
Player.prototype.checkHeartPoint=function()
{
	this.playerPoints+=20;//increments the points by 20
	var x=document.getElementById('points');
	if(this.playerPoints>=100)
	{document.write("<h1>Game is finished!!!</h1>");}//if points are 100 then game is finished
	else
	{
		x.innerHTML=this.playerPoints;//displays the points on the screen
	}
}
Player.prototype.updateKey=function()
{
	key.KeyX=Math.random()*400;//random position of key on x axis
	var t=Math.random()*255;
	while(t<=95 && t>=255)
	{
		t=Math.random()*255;
	}
	key.KeyY=t;//random position of key on y axis
}
var allEnemies=[new Enemy(0,50),new Enemy(0,140),new Enemy(0,230)];//enemy initial positions
var player=new Player(100,395);//positions of the player
var key=new Key();//key object
var heart=new Heart();//heart object;
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
player.handleInput(allowedKeys[e.keyCode]);
});
