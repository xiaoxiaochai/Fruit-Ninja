(function(){
	var Fruit = window.Fruit = function(){
		this.pic1 = _.sample(["apple","banana","basaha","peach","sandia","boom"],1)[0];
		this.x1 = (game.canvas.width - 60)*Math.random()+60;

		this.pic2 = _.sample(["apple","banana","basaha","peach","sandia","boom"],1)[0];
		this.x2 = (game.canvas.width - 60)*Math.random()+60;

		if(this.x1 == this.x2){
			return;
		}
		this.y = game.canvas.height;

		this.rotate = 0;
		this.aa = 1;

		this.dy = 50;
		this.ddy = 3;

		this.change1 = false;
		this.change2 = false;
		this.lock = true;
		this.bindEvent();
		game.arr.push(this);
	}
	Fruit.prototype.update = function(){
		if(this.x1 > (game.canvas.width/2)){
			this.x1 -= 2;
		}else if(this.x1 < game.canvas.width/2){
			this.x1 += 2;
		}

		if(this.x2 > game.canvas.width/2){
			this.x2 -= 2;
		}else if(this.x2 < game.canvas.width/2){
			this.x2 += 2;
		}

		this.rotate -= 0.1;
		if(this.change1 || this.change2){
			this.aa -= 0.05;
			if(this.aa < 0){
				this.aa = 0;
			}
		}

		this.dy -= this.ddy;
		this.y -= this.dy;
		if(this.dy < 0){
			this.dy += this.ddy;
			this.y += this.dy;
			if(this.y > game.canvas.height){
				for(var i = 0 ; i < game.arr.length-1 ; i ++){
					if(game.arr[i] == this){
						game.arr.splice(i,1);
					}
				}
			}
		}
		
	}
	Fruit.prototype.render = function(){
		if(this.x1 == this.x2){
			return;
		}
		if((this.pic1 == "boom" && this.change1) || (this.pic2 == "boom" && this.change2)){
			game.ctx.save();
			game.ctx.globalAlpha = this.aa;
			game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
			game.ctx.restore();
			game.ctx.drawImage(game.R["boom"],30+this.x1,this.y);
			game.sm.change(2);
			// document.getElementById("boom").load();
			document.getElementById("boom").play();
		}
		if(this.change1){
			if(this.pic1 != "boom"){
				game.ctx.save();
				game.ctx.drawImage(game.R[this.pic1+"1"],-30+this.x1,this.y);
				game.ctx.drawImage(game.R[this.pic1+"2"],30+this.x1,this.y);
				game.ctx.restore();
				if(this.lock){
					game.score += 2;
					this.lock = false;
				}
			}

			game.ctx.save();
			game.ctx.globalAlpha = this.aa;
			game.ctx.drawImage(game.R["flash"],-150+this.x1,-10+this.y);
			game.ctx.restore();
		}else{
			game.ctx.save();
			game.ctx.translate(this.x1, this.y);
			game.ctx.rotate(this.rotate);
			game.ctx.drawImage(game.R[this.pic1],-30,-30);
			game.ctx.restore();
		}

		if(this.change2){
			if(this.pic2 != "boom"){
				game.ctx.save();
				game.ctx.drawImage(game.R[this.pic2+"1"],-30+this.x2,this.y);
				game.ctx.drawImage(game.R[this.pic2+"2"],30+this.x2,this.y);
				game.ctx.restore();
				if(this.lock){
					game.score += 2;
					this.lock = false;
				}
			}

			game.ctx.save();
			game.ctx.globalAlpha = this.aa;
			game.ctx.drawImage(game.R["flash"],-150+this.x2,-10+this.y);
			game.ctx.restore();
		}else{
			game.ctx.save();
			game.ctx.translate(this.x2, this.y);
			game.ctx.rotate(this.rotate);
			game.ctx.drawImage(game.R[this.pic2],-30,-30);
			game.ctx.restore();
		}
	}
	Fruit.prototype.bindEvent = function(){
		var self = this;
		game.canvas.onmousedown = function(event){
			var x = event.offsetX;
			var y = event.offsetY;
			this.onmousemove = function(event){
				var _x = event.offsetX;
				var _y = event.offsetY;
				if(x<self.x1-50 && y>self.y-50 && y <self.y+50 && (_x>self.x1+50 || _y<self.y-50 || _y>self.y+50)
					||
					x>self.x1+50 && y>self.y-50 && y <self.y+50 && (_x<self.x1-50 || _y<self.y-50 || _y>self.y+50)
					||
					x>self.x1-50 && x<self.x1+50 && y<self.y-50 && (_y >self.y+50 || _x<self.x1-50 || _x>self.x1+50)
					||
					x>self.x1-50 && x<self.x1+50 && y >self.y+50 && (_y<self.y-50 || _x<self.x1-50 || _x>self.x1+50)
					){
					self.change1 = true;
					// document.getElementById("splatter").load();
					document.getElementById("splatter").play();
				}
				if(x<self.x2-50 && y>self.y-50 && y <self.y+50 && (_x>self.x2+50 || _y<self.y-50 || _y>self.y+50)
					||
					x>self.x2+50 && y>self.y-50 && y <self.y+50 && (_x<self.x2-50 || _y<self.y-50 || _y>self.y+50)
					||
					x>self.x2-50 && x<self.x2+50 && y<self.y-50 && (_y >self.y+50 || _x<self.x2-50 || _x>self.x2+50)
					||
					x>self.x2-50 && x<self.x2+50 && y >self.y+50 && (_y<self.y-50 || _x<self.x2-50 || _x>self.x2+50)
					){
					self.change2 = true;
					// document.getElementById("splatter").load();
					document.getElementById("splatter").play();
				}
			}
		}
		document.onmouseup = function(){
			game.canvas.onmousemove = null;
		}
	}	
})()