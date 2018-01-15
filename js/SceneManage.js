(function(){
	var SceneManage = window.SceneManage = function(){
		this.bindEvent();
	}
	SceneManage.prototype.change = function(num){
		game.scene = num;
		switch(game.scene){
			case 0:
				this.homeW = 640;
				this.homeH = 183;
				this.hx = 0;
				this.hy = -183;

				this.logoW = 288;
				this.logoH = 135;
				this.lx = 20;
				this.ly = -183;

				this.ninW = 244;
				this.ninH = 81;
				this.nx = 320;
				this.ny = -81;
				this.dir = 1;

				this.deW = 161;
				this.deH = 91;
				this.dx = -161;
				this.dy = 130;

				this.aW = 175;
				this.aH = 175;
				this.ax = game.canvas.width/5;
				this.ay = game.canvas.height*5/7;

				this.bW = 195;
				this.bH = 195;
				this.bx = game.canvas.width*5/9;
				this.by = game.canvas.height*5/7;

				this.cW = 141;
				this.cH = 141;
				this.cx = game.canvas.width*6/7;
				this.cy = game.canvas.height*4/5;

				this.step = 0;
				this.rotate1 = 0;
				this.rotate2 = 0;
				this.num = false;

				this.newW = 200;
				this.newH = 42;
				this.x = game.canvas.width*3/11;
				this.y = game.canvas.height*6/11;
				this.r = 1;

				this.g1 = false;
				this.g2 = false;
				this.g3 = false;

				this.aa = 1;
				
				
			break;
			case 1:
				document.getElementById("menu").pause();
				// this.change1 = false;
				// this.change2 = false;
				game.arr = [];
				game.score = 0;
				
				var arr = JSON.parse(localStorage.getItem("score"));
					arr = _.uniq(arr);
					arr = _.sortBy(arr,function(item){
						return item;
					});
					this.best = arr[arr.length - 1];	
			break;
			case 2:
				this.a = 1;
				this.s = 0;
				this.frame0 = 0;
				
				var arr = JSON.parse(localStorage.getItem("score"));
					arr = _.uniq(arr);
					arr = _.sortBy(arr,function(item){
						return item;
					});
					this.best = arr[arr.length - 1];
					if(game.score >= arr[arr.length - 1]){
						this.best = game.score;
					}
				arr.push(game.score);
				localStorage.setItem("score" , JSON.stringify(arr));

				// document.getElementById("over").load();
				document.getElementById("over").pause();
			break;
			case 3:
				document.getElementById("menu").pause();
				this.s2 = 0;
				this.frame = 0;

				// document.getElementById("over").load();
				// document.getElementById("over").pause();
			break;
		}
	}
	SceneManage.prototype.updateAndRender = function(){
		switch(game.scene){
			case 0:
				this.hy += 5;
				this.ly += 5;
				if(this.hy > 0){
					this.hy = 0;
				}
				if(this.ly > 0){
					this.ly = 0;
				}
				if(this.hy == 0 && this.ly == 0){
					if(this.dir == 1){
						this.ny += 5;	
						if(this.ny > 50){
							this.dir = -1;
						}
					}else if(this.dir == -1){
						this.ny -= 5;
						if(this.ny < 20){
							this.ny += 5;
						}
					}
					this.dx += 5;
					if(this.dx > 10){
						this.dx = 10;
					}
				}
				
				game.ctx.drawImage(game.R["home-mask"], this.hx, this.hy,game.canvas.width,this.homeH);
				game.ctx.drawImage(game.R["logo"], this.lx, this.ly);
				game.ctx.drawImage(game.R["ninja"], this.nx, this.ny);
				game.ctx.drawImage(game.R["home-desc"], this.dx, this.dy);

				if(this.dx==10){
					if(!this.num){
						this.step ++;
						if(this.step > 10){
							this.step = 10;
						}
						game.ctx.drawImage(game.R["dojo"],this.ax-(17.5*this.step)/2,this.ay-(17.5*this.step)/2,17.5*this.step,17.5*this.step);
						game.ctx.drawImage(game.R["new-game"],this.bx-(19.5*this.step)/2,this.by-(19.5*this.step)/2,19.5*this.step,19.5*this.step);
						game.ctx.drawImage(game.R["quit"],this.cx-(14.1*this.step)/2,this.cy-(14.1*this.step)/2,14.1*this.step,14.1*this.step);
						game.ctx.drawImage(game.R["peach"],this.ax-(6.2*this.step)/2,this.ay-(5.9*this.step)/2,6.2*this.step,5.9*this.step);
						game.ctx.drawImage(game.R["sandia"],this.bx-(9.8*this.step)/2,this.by-(8.5*this.step)/2,9.8*this.step,8.5*this.step);
						game.ctx.drawImage(game.R["boom"],this.cx-(6.6*this.step)/2,this.cy-(6.8*this.step)/2,6.6*this.step,6.8*this.step);
						// game.ctx.drawImage(game.R["new"],this.x-(7*this.step)/2,this.y-(4.2*this.step)/2,7*this.step,4.2*this.step);
						if(this.step == 10){
							this.num = true;
						}
					}
					if(this.num){
						this.rotate1 += 0.01;
						this.rotate2 -= 0.01;

						game.ctx.save();
						game.ctx.translate(this.ax, this.ay);
						game.ctx.rotate(this.rotate1);
						game.ctx.drawImage(game.R["dojo"],-175/2,-175/2);
						game.ctx.restore();
						game.ctx.save();

						game.ctx.save();
						game.ctx.translate(this.bx, this.by);
						game.ctx.rotate(this.rotate1);
						game.ctx.drawImage(game.R["new-game"],-195/2,-195/2);
						game.ctx.restore();
						
						game.ctx.save();
						game.ctx.translate(this.cx, this.cy);
						game.ctx.rotate(this.rotate2);
						game.ctx.drawImage(game.R["quit"],-141/2,-141/2);
						game.ctx.restore();

						game.ctx.save();
						game.ctx.translate(this.ax, this.ay);
						game.ctx.rotate(this.rotate2);
						game.ctx.drawImage(game.R["peach"],-62/2,-59/2);
						game.ctx.restore();

						game.ctx.save();
						game.ctx.translate(this.bx, this.by);
						game.ctx.rotate(this.rotate2);
						game.ctx.drawImage(game.R["sandia"],-98/2,-85/2);
						game.ctx.restore();

						game.ctx.save();
						game.ctx.translate(this.cx, this.cy);
						game.ctx.drawImage(game.R["boom"],-66/2,-68/2);
						game.ctx.restore();
					}
					
					if(this.r == 1){
						this.y += 0.5;
						if(this.y > 280){
							this.r = -1;
						}
					}
					if(this.r == -1){
						this.y -= 0.5;
						if(this.y < 270){
							this.r = 1;
						}
					}
					game.ctx.drawImage(game.R["new"], this.x, this.y);
				}

				if(this.g1){
					this.aa -= 0.1;
					game.ctx.save();
					game.ctx.globalAlpha = this.aa;
					game.ctx.translate(this.ax, this.ay);
					game.ctx.rotate(Math.PI*2/4);
					game.ctx.drawImage(game.R["flash"],-180,-10);
					game.ctx.restore();
					if(this.aa < 0){
						this.aa = 0;
						this.change(3);
					}
					// this.g1 = false;
				}
				if(this.g2){
					this.aa -= 0.1;
					game.ctx.save();
					game.ctx.globalAlpha = this.aa;
					game.ctx.translate(this.bx, this.by);
					game.ctx.rotate(Math.PI*2/4);
					game.ctx.drawImage(game.R["flash"],-180,-10);
					game.ctx.restore();
					if(this.aa < 0){
						this.aa = 0;
						this.change(1);
					}
					// this.g2 = false;
				}
				if(this.g3){
					this.aa -= 0.1;
					game.ctx.save();
					game.ctx.globalAlpha = this.aa;
					game.ctx.translate(this.cx, this.cy);
					game.ctx.rotate(Math.PI*2/4);
					game.ctx.drawImage(game.R["flash"],-180,-10);
					game.ctx.restore();
					if(this.aa < 0){
						this.aa = 0;
						this.change(3);
					}
					// this.g3 = false;
				}
			break;
			case 1:
				if(game.frame % 160 == 0){
					new Fruit();
					// document.getElementById("throw").load();
					document.getElementById("throw").play();
				}
				for(var i = 0 ; i < game.arr.length ; i ++){
					game.arr[i].update();
					game.arr[i].render();
				}

				game.ctx.drawImage(game.R["score"],5,5);
				game.ctx.save();
				game.ctx.fillStyle = "gold";
				game.ctx.font = "26px consolas";
				game.ctx.fillText(game.score,60,30);
				game.ctx.restore();

				game.ctx.save();
				game.ctx.fillStyle = "gold";
				game.ctx.font = "16px consolas";
				game.ctx.fillText("BEST  "+this.best,35,50);
				game.ctx.restore();
			break;
			case 2:
				game.ctx.drawImage(game.R["score"],5,5);
				game.ctx.save();
				game.ctx.fillStyle = "gold";
				game.ctx.font = "26px consolas";
				game.ctx.fillText(game.score,60,30);
				game.ctx.restore();

				game.ctx.save();
				game.ctx.fillStyle = "gold";
				game.ctx.font = "16px consolas";
				game.ctx.fillText("BEST  "+this.best,35,50);
				game.ctx.restore();

				this.a -= 0.1 ;
				if(this.a < 0){
					this.a = 0;
				}
				game.ctx.save();
				game.ctx.globalAlpha = this.a;
				game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
				game.ctx.restore();

				// if(this.a == 0){
					this.s ++;
					if(this.s > 10){
						this.s = 10;
					}
					game.ctx.drawImage(game.R["game-over"],game.canvas.width/2-(49*this.s)/2,game.canvas.height/2-(8.5*this.s)/2,49*this.s,8.5*this.s);
				// }
				this.frame0 ++;
				if(this.frame0>100){
					// this.change(0);
				}
			break;
			case 3:

				this.s2 ++;
				if(this.s2 > 10){
					this.s2 = 10;
				}
				game.ctx.drawImage(game.R["developing"],game.canvas.width/2-(42.9*this.s2)/2,game.canvas.height/2-(5.3*this.s2)/2,42.9*this.s2,5.3*this.s2);

				this.frame ++;
				if(this.frame>100){
					this.change(0);
					document.getElementById("menu").play();
				}
			break;
		}
	}
	SceneManage.prototype.bindEvent = function(){
		var self = this;
		game.canvas.onmousedown = function(event){
			var x = event.offsetX;
			var y = event.offsetY;
			this.onmousemove = function(event){
				var _x = event.offsetX;
				var _y = event.offsetY;
				switch(game.scene){
					case 0:
						if(x>self.ax-120 && x<self.ax && y>self.ay-175/2 && y<self.ay+175/2 && _x>self.ax && _x<self.ax+120 && _y>self.ay-175/2 &&  _y<self.ay+175/2
							||
							_x>self.ax-120 && _x<self.ax && _y>self.ay-175/2 && _y<self.ay+175/2 && x>self.ax && x<self.ax+120 && y>self.ay-175/2 &&  y<self.ay+175/2
							||
							y>self.ay-200 && y<self.ay && x>self.ax-175/2 && x<self.ax+175/2 && _y>self.ay && _y<self.ay+200 && _x>self.ax-175/2 &&  _x<self.ax+175/2
							||
							_y>self.ay-200 && _y<self.ay && _x>self.ax-175/2 && _x<self.ax+175/2 && y>self.ay && y<self.ay+200 && x>self.ax-175/2 &&  x<self.ax+175/2
						){
							self.g1 = true;
							// document.getElementById("splatter").load();
							document.getElementById("splatter").play();
							// document.getElementById("start").load();
							// document.getElementById("start").play();
						}
						if(x>self.bx-120 && x<self.bx && y>self.by-195/2 && y<self.by+195/2 && _x>self.bx && _x<self.bx+120 && _y>self.by-195/2 &&  _y<self.by+195/2
							||
							_x>self.bx-120 && _x<self.bx && _y>self.by-195/2 && _y<self.by+195/2 && x>self.bx && x<self.bx+120 && y>self.by-195/2 &&  y<self.by+195/2
							||
							y>self.by-200 && y<self.by && x>self.bx-195/2 && x<self.bx+195/2 && _y>self.by && _y<self.by+200 && _x>self.bx-195/2 &&  _x<self.bx+195/2
							||
							_y>self.by-200 && _y<self.by && _x>self.bx-195/2 && _x<self.bx+195/2 && y>self.by && y<self.by+200 && x>self.bx-195/2 &&  x<self.bx+195/2
						){
							self.g2 = true;
							// document.getElementById("splatter").load();
							document.getElementById("splatter").play();
							// document.getElementById("start").load();
							document.getElementById("start").play();
						}
						if(x>self.cx-100 && x<self.cx && y>self.cy-141/2 && y<self.cy+141/2 && _x>self.cx && _x<self.cx+100 && _y>self.cy-141/2 &&  _y<self.cy+141/2
							||
							_x>self.cx-100 && _x<self.cx && _y>self.cy-141/2 && _y<self.cy+141/2 && x>self.cx && x<self.cx+100 && y>self.cy-141/2 &&  y<self.cy+141/2
							||
							y>self.cy-200 && y<self.cy && x>self.cx-141/2 && x<self.cx+141/2 && _y>self.cy && _y<self.cy+200 && _x>self.cx-141/2 &&  _x<self.cx+141/2
							||
							_y>self.cy-200 && _y<self.cy && _x>self.cx-141/2 && _x<self.cx+141/2 && y>self.cy && y<self.cy+200 && x>self.cx-141/2 &&  x<self.cx+141/2
						){
							self.g3 = true;
							// document.getElementById("splatter").load();
							document.getElementById("splatter").play();
							// document.getElementById("start").load();
							// document.getElementById("start").play();
						}
						break;
					case 1:
						break;
					case 2:
						break;
					case 3:
						break;
				}
			}
		}
		document.onmouseup = function(){
			game.canvas.onmousemove = null;
		}
	}
})()