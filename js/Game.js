function Game ()
{
	var _sound;
	var _self = this;
	var _circle_width = 100;
	var _movements = [];
	var _last_movement = 0;
	var _last_movement_count = 0;
	var _count_circles = 0;
	var _mobile = false;
	var _storage = new Storage();

	this.showPoints = function(points)
	{
		$('.points').html(_movements.length);
		$('.points').css({
			'margin-left': $(document).width()/2 - $('.points').width()/2,
			'margin-top': $(document).height()/2 - $('.points').height()/2
		});
		if (_storage.saveBestScore(_movements.length))
		{
			$('.best_points').html("Best: " + _storage.getBestScore());
		}
	}

	this.getNext = function()
	{
		return Math.floor((Math.random() * _count_circles) + 1);
	}

	this.play = function()
	{
		$('.circle').unbind('click');
		if (_last_movement < _movements.length)
		{
			var position = _movements[_last_movement];
			var item = $('.item_' + position);
			_self.animation_click(item, function(){
				_last_movement++;
				_self.play();
			});	
		}
		else
		{
			_last_movement = 0;
			_self.events();
		}
		
	}

	this.start = function(count_circles)
	{
		_count_circles = count_circles;
		$('.play').unbind('click');
		$('.play').click(function(){
			$('.play').fadeOut(200);
			$('.gameOver').fadeOut(200);
			_movements = [];
			_last_movement = 0;
			_last_movement_count = 0;
			_self.showPoints();
			_self.startGame();
		});

		window.onresize = function(event) {
			_self.resizeWindow();
		};

		_self.startGame();
	}


	this.startGame = function()
	{
		_sound = new Sound()
		$('.game').html('');
		var timer = 100;
		var show_item = 1;
		for(var i = 1; i <= _count_circles; i++)
		{
			$('.game').append('<div class="circle color' + i + ' item_' + i + '" data-position="' + i + '"><span class="fill color' + i + '"></span></div>');	
			$('.item_' + i).fadeOut(0);
			setTimeout(function(){
				$('.item_' + show_item).fadeIn(200);
				show_item++;
			}, timer);
			timer += 100;
		}

		$('.circle').css({'width': _circle_width, 'height': _circle_width});
		$('.fill').css({'width': _circle_width, 'height': _circle_width});

		$('.fill').transition({
			scale: 0,
			duration: 0
		});

		_self.events();
		_self.resizeWindow();
		$('.circle').unbind('click');
		_movements.push(_self.getNext());
		setTimeout(_self.play, 2000);
		
	}

	this.resizeWindow = function()
	{
		var height = $(document).height() - _circle_width*2;
		var top = _circle_width;
		var diff = height - top;

		var positions = [];

		if (_count_circles == 4)
		{
			positions = [
			{"top": top, "left": 0},
			{"top": top + (diff/2), "left": -_circle_width*2 + 20},
			{"top": height, "left": 0},
			{"top": top + (diff/2), "left": _circle_width*2 - 30}
			];

			if (_mobile)
			{
				top -= 60;
				height = $(document).height() - _circle_width*2 + 60;
				positions = [
				{"top": top, "left": 0},
				{"top": top + (diff/2) + 60, "left": -_circle_width*2 + 93},
				{"top": height, "left": 0},
				{"top": top + (diff/2) + 60, "left": _circle_width*2 - 108}
				];
			}
		}
		else if (_count_circles == 6)
		{
			positions = [
			{"top": top, "left": 0},
			{"top": top + (diff/2) - (diff/4) + _circle_width/4, "left": -_circle_width*2},
			{"top": top + (diff/2) + (diff/4) - _circle_width/4, "left": -_circle_width*2},
			{"top": height, "left": 0},
			{"top": top + (diff/2) + (diff/4) - _circle_width/4, "left": _circle_width*2},
			{"top": top + (diff/2) - (diff/4) + _circle_width/4, "left": _circle_width*2}
			];
		}
		
		var i = 0;
		$('.circle').each(function(){
			$(this).css({
				'margin-top': positions[i].top,
				'margin-left': ($('body').width()/2) + positions[i].left - ($(this).width()/2)
			});
			i++;
		});

		$('.points').css({
			'margin-left': $(document).width()/2 - $('.points').width()/2,
			'margin-top': $(document).height()/2 - $('.points').height()/2
		});

		$('.best_points').html("Best: " + _storage.getBestScore());
		$('.best_points').css({
			'margin-left': $(document).width()/2 - $('.best_points').width()/2,
			'margin-top': $(document).height()/2 - $('.best_points').height()/2 + 30
		});

		$('.gameOver').css({
			'margin-left': $(document).width()/2 - $('.gameOver').width()/2,
			'margin-top': $(document).height()/2 - $('.gameOver').height()/2 - 60
		});

		$('.play').css({
			'margin-left': $(document).width()/2 - $('.play').width()/2,
			'margin-top': $(document).height()/2 - $('.play').height()/2 + 150
		});
	}

	this.gameOver = function()
	{
		_sound.playWrong();
		var timer = 100;
		var show_item = $('.circle').length;
		$('.circle').each(function(e){
			setTimeout(function(){
				$('.item_' + show_item).fadeOut(200);
				show_item--;

				if (show_item == 0)
				{
					$('.gameOver').fadeIn(300);
					$('.gameOver').css({
						'margin-left': $(document).width()/2 - $('.gameOver').width()/2,
						'margin-top': $(document).height()/2 - $('.gameOver').height()/2 - 60
					});

					$('.play').fadeIn(300);
					$('.play').css({
						'margin-left': $(document).width()/2 - $('.play').width()/2,
						'margin-top': $(document).height()/2 - $('.play').height()/2 + 150
					});
				}

			}, timer);
			timer += 100;
		});
	}

	this.events = function()
	{
		$('.circle').unbind('click');
		$('.circle').click(function(e){
			var movement = $(this).attr('data-position');;
			if (movement != _movements[_last_movement_count])
			{
				_self.gameOver();
				return;
			}
			
			var finish = false;
			if (_last_movement_count + 1 == _movements.length)
			{
				_last_movement_count = 0;
				finish = true;
			}
			else
			{
				_last_movement_count++;
			}

			_self.animation_click($(this), function(){
				if (finish)
				{
					_self.showPoints();
					_movements.push(_self.getNext());
					_last_movement_count = 0;
					setTimeout(_self.play, 500);	
				}
			});
		});
	}

	this.animation_click = function(circle, callback)
	{
		var position = circle.attr('data-position');
		_sound.play(parseInt(position));

		var fill = circle.children('.fill');

		fill.transition({
			scale: 0,
			duration: 0
		});

		fill.transition({ 
			scale: 1.1 , 
			duration: 200,
			complete: function(){
				setTimeout(function(){
					fill.transition({ 
						scale: 0 , 
						duration: 200, 
						complete: function(){
							callback();
						}
					});
				}, 150);	
			}
		});
	}
}