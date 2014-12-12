function Sound()
{
	var self = this;

	this.playWrong = function()
	{
		var sine1 = T("sin", {freq:500, mul:0.5});
		var sine2 = T("sin", {freq:500, mul:0.5});

		var sine3 = T("sin", {freq:400, mul:0.4});
		var sine4 = T("sin", {freq:400, mul:0.4});

		var sine5 = T("sin", {freq:300, mul:0.3});
		var sine6 = T("sin", {freq:300, mul:0.3});

		T("perc", {r:800}, sine1, sine2).on("ended", function() {
			
		}).bang().play();

		setTimeout(function(){
			T("perc", {r:800}, sine3, sine4).on("ended", function() {
				
			}).bang().play();
		}, 300);

		setTimeout(function(){
			T("perc", {r:800}, sine5, sine6).on("ended", function() {
				
			}).bang().play();
		}, 600);
	}

	this.play = function(item)
	{
		var freq1 = 0;
		var freq2 = 0;

		switch (item) { 
			case 1: 
			freq1 = 100;
			freq2 = 600;
			break 
			case 2: 
			freq1 = 140;
			freq2 = 560;
			break 
			case 3: 
			freq1 = 120;
			freq2 = 760;
			break 
			case 4: 
			freq1 = 90;
			freq2 = 500;
			break 
			case 5: 
			freq1 = 120;
			freq2 = 460;
			break 
			case 6: 
			freq1 = 120;
			freq2 = 620;
			break 
		}

		var sine1 = T("sin", {freq:freq1, mul:0.5});
		var sine2 = T("sin", {freq:freq2, mul:0.5});

		T("perc", {r:500}, sine2).on("ended", function() {
			//this.pause();
		}).bang().play();

	}
}