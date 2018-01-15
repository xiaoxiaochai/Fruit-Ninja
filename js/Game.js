(function(){
	var Game = window.Game = function(){
		this.canvas = document.getElementById("canvas");
		this.ctx = this.canvas.getContext("2d");
		var windowW = document.documentElement.clientWidth;
		var windowH = document.documentElement.clientHeight;
		this.canvas.width = windowW <= 750 ? windowW : 750;
		this.canvas.height = windowH <= 420 ? windowH : 420;

		this.scene = 0;

		if(!localStorage.getItem("score")){
			localStorage.setItem("score","[]");
		}

		var self = this;
		this.loadresouces(function(){
			self.start();
		});
	}
	Game.prototype.loadresouces = function(callback){
		this.R = {
			"bg" : "images/background.jpg",
			"apple" : "images/fruit/apple.png",
			"apple1" : "images/fruit/apple-1.png",
			"apple2" : "images/fruit/apple-2.png",
			"banana" : "images/fruit/banana.png",
			"banana1" : "images/fruit/banana-1.png",
			"banana2" : "images/fruit/banana-2.png",
			"basaha" : "images/fruit/basaha.png",
			"basaha1" : "images/fruit/basaha-1.png",
			"basaha2" : "images/fruit/basaha-2.png",
			"peach" : "images/fruit/peach.png",
			"peach1" : "images/fruit/peach-1.png",
			"peach2" : "images/fruit/peach-2.png",
			"sandia" : "images/fruit/sandia.png",
			"sandia1" : "images/fruit/sandia-1.png",
			"sandia2" : "images/fruit/sandia-2.png",
			"boom" : "images/fruit/boom.png",
			"flash" : "images/flash.png",
			"home-mask" : "images/home-mask.png",
			"logo" : "images/logo.png",
			"ninja" : "images/ninja.png",
			"home-desc" : "images/home-desc.png",
			"dojo" : "images/dojo.png",
			"new-game" : "images/new-game.png",
			"quit" : "images/quit.png",
			"new" : "images/new.png",
			"game-over" : "images/game-over.png",
			"developing" : "images/developing.png",
			"score" : "images/score.png"
		};
		var count = 0;
		var picAmount = Object.keys(this.R).length;
		for(var k in this.R){
			(function(self,src){
				self.R[k] = new Image();
				self.R[k].src = src;
				self.R[k].onload = function(){
					count++;
					self.clear();
					self.ctx.font = "30px 黑体";
					self.ctx.textAlign = "center";
					self.ctx.fillText("正在加载资源" + count + "/" + picAmount,self.canvas.width / 2,200);
					
					if(count == picAmount){
						callback();
					}
				}
			})(this,this.R[k]);
		}
	}
	Game.prototype.clear = function(){
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
	}
	Game.prototype.start = function(){
		// this.arr = [];
		// this.score = 0;

		this.sm = new SceneManage();
		this.sm.change(this.scene);
		
		this.frame = 0;
		var self = this;
		this.timer = setInterval(function(){
			self.clear();
			self.frame++;
			self.ctx.drawImage(self.R["bg"],0,0,self.canvas.width,self.canvas.height);

			// if(self.frame % 160 == 0){
			// 	new Fruit();
			// }
			// for(var i = 0 ; i < self.arr.length ; i ++){
			// 	self.arr[i].update();
			// 	self.arr[i].render();
			// }
			self.sm.updateAndRender();

			// self.ctx.fillStyle = "#000";
			// self.ctx.textAlign = "left";
			// self.ctx.font = "16px consolas";
			// self.ctx.fillText("帧编号：" + self.frame , 10 , 20);
			// self.ctx.fillText("场景号：" + self.scene , 10 , 40);
		},20);
	}
})();