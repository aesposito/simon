function Storage()
{
	var _self = this;

	this.getBestScore = function(){
		var score = localStorage.getItem('best');
		if (score == null)
		{
			score = 0;
		}
		return score;
	}

	this.saveBestScore = function(score){
		if (score > _self.getBestScore())
		{
			localStorage.setItem('best', score);
			return true;
		}
		return false;
	}

}