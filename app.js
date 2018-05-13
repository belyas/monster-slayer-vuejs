var vm = new Vue({
	el: '#app',
	data: {
		isGameStarted: false,
		monsterScore: 100,
		humanScore: 100,
		hits: [],
		gameOver: false,
		gameOverMessage: '',
		specialAttacksTries: 3
	},
	methods: {
		startGame: function(){
			this.isGameStarted = true;
			this.hits = [];
			this.monsterScore = 100;
			this.humanScore = 100;
			this.specialAttacksTries = 3;
		},
		giveUpGame: function(){
			this.startGame();
			this.isGameStarted = false;
			this.gameOver = false;
		},
		attack: function() {
			var damage = this.getRandomNumber(1, 10);

			this.humanScore -= damage;
			this.logInfo(true, 'Player hits monster for '+ damage);

			damage = this.getRandomNumber(1, 10);
			this.monsterScore -= damage;
			this.logInfo(false, 'Monster hits player for '+ damage);
		},
		specialAttack: function() {
			if (this.specialAttacksTries <= 0) {
				alert("You can not use special attacks!\n\rYou have achieved the 3 attempts!");
				return;
			}

			this.specialAttacksTries -= 1;
			var damage = this.getRandomNumber(1, 10);

			this.humanScore -= damage;
			this.logInfo(true, 'Player hits monster for '+ damage);

			damage = this.getRandomNumber(5, 20);
			this.monsterScore -= damage;
			this.logInfo(false, 'Monster hits player for '+ damage);
		},
		recovery: function() {
			this.humanScore += this.getRandomNumber(1, 10);

			// recovery should not exceeds 100%
			if (this.humanScore > 100) {
				this.humanScore = 100;
				return;
			}
			this.logInfo(true, 'Player has recovered');
		},
		getRandomNumber: function(min, max) {
    		return Math.round(Math.random() * (max - min) + min);
    	},
    	getHumanScorePercentage: function() {
    		return this.humanScore +'%';
    	},
    	getMonsterScorePercentage: function() {
    		return this.monsterScore +'%';
    	},
    	logInfo: function(is_player, msg) {
			this.hits.push({isPlayer: is_player, message: msg});
    	}
	},
	watch: {
		monsterScore: function() {
			if (this.monsterScore <= 0) {
				this.monsterScore = 0;
				this.gameOver = true;
				this.gameOverMessage = 'You won!';

				this.hits = [];
				this.isGameStarted = false;
			}
		},
		humanScore: function() {
			if (this.humanScore <= 0) {
				this.humanScore = 0;
				this.gameOver = true;
				this.gameOverMessage = 'Monster won!';

				this.hits = [];
				this.isGameStarted = false;
			}
		}
	}
});