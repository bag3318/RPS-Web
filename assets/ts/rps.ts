const info: Array<any> = ["RPS", "bag3318", 1.0, true];

class rps {

    public gameName: string;
    private author: string;
    public version: number;
    public status: boolean;
    constructor(GameName: string, Author: string, Version: number, Status: boolean) {
      this.gameName = GameName;
      this.author = Author;
      this.version = Version;
      this.status = Status;
      console.log(`Game Name: ${GameName}, Author: ${Author}, Version: ${this.version}, Status Working: ${this.status}.`);
    }

    private playerScore: number = 0;
    get PlayerScore(): number {
        return this.playerScore;
    }
    set PlayerScore(pScore: number) {
        this.playerScore = pScore;
    }

    private computerScore: number = 0;
    get ComputerScore(): number {
        return this.computerScore;
    }
    set ComputerScore(cScore: number) {
        this.computerScore = cScore;
    }

    private ties: number = 0;
    get Ties(): number {
        return this.ties;
    }
    set Ties(tie: number) {
        this.ties = tie;
    }

    private welcomeMsg: string = `
    Welcome to the \"Rock, Paper, Scissors\" game!

    Remember, the rules are simple:

    Rock Beats Scissors,
    Scissors Beats Paper,
    Paper Beats Rock.

    Click cancel if you don\'t wanna play.
    `;
    get WelcomeMsg(): string {
        return this.welcomeMsg;
    }
    set WelcomeMsg(welcomeMessage: string) {
        this.welcomeMsg = welcomeMessage;
    }

    private gestures: string[] = new Array("rock", "paper", "scissors");
    private rules: object = new Object({
        "rock": "scissors",
        "paper": "rock",
        "scissors": "paper"
    });
    private isPlayerWinner: boolean = false;
    private isComputerWinner: boolean = false;

    private Start(): void {
        var ready: boolean = confirm(this.welcomeMsg);
        var Confirm: any = (ready) ? this.PlayGame(3) : alert("Sorry you don\'t wanna play, maybe next time! :)");
    }

    private DetermineWinner(): void {
        var msgW: string = `
        The player has ${this.playerScore} point(s) compared to the computer\'s ${this.computerScore} point(s) (ties: ${this.ties}).
        So the player wins!
        `;
        var msgL: string = `
        The computer has ${this.computerScore} point(s) compared to the player\'s ${this.playerScore} point(s) (ties: ${this.ties}). So the computer wins!
        `;
        if (this.playerScore >= 2) {
          this.isPlayerWinner = true;
          alert(msgW);
        }
        if (this.computerScore >= 2) {
          this.isComputerWinner = true;
          alert(msgL);
        }
    }

    private PlayGame(numOfRounds: number): void {
        do {
            if (this.isPlayerWinner || this.isComputerWinner) {
                return;
            }
            var player = this.PlayerGuess();
            var computer = this.ComputerGuess();
            var result = this.CompareGuesses(player, computer, 1);
            if (result !== 0) {
                numOfRounds--;
            }
        } while (numOfRounds > 0 && (!this.isPlayerWinner || !this.isComputerWinner));
    }

    private PlayerGuess(): string {
        var playerChoice: string = prompt("Choose rock, paper, or scissors:");
        if (this.gestures.indexOf(playerChoice.toLowerCase()) >= 0) {
            return playerChoice;
        } else {
            alert("You typed something else or did not spell your choice correctly. Please try again!");
            return this.PlayerGuess();
        }
    }



    private ComputerGuess(): string {
        var cpuChoice: number = Math.floor((Math.random() * 3) + 1);
        switch (cpuChoice) {
            case 1: {
                return this.gestures[0];
            }
            case 2: {
                return this.gestures[1];
            }
            case 3: {
                return this.gestures[2];
            }
        }
    }


    private CompareGuesses(guess1: string, guess2: string, points: number): number {
        var output: string = `Player chose: ${guess1.toLowerCase()}, and the computer chose: ${guess2.toLowerCase()}!\n`;

        if (this.rules[guess1.toLowerCase()] === guess2.toLowerCase()) {
            this.playerScore += points;
            var wMsg: string = `
            ${output}
            Player wins the round!

            Player Score: ${this.playerScore}; Computer Score: ${this.computerScore}.
            `;
            alert(wMsg);
            this.DetermineWinner();
            return 1;
        } else if (this.rules[guess2.toLowerCase()] === guess1.toLowerCase()) {
            this.computerScore += points;
            var lMsg: string = `
            ${output}
            Computer wins the round!

            Player Score: ${this.playerScore}; Computer Score: ${this.computerScore}.
            `;
            alert(lMsg);
            this.DetermineWinner();
            return 2;
        } else {
            this.playerScore += 0;
            this.computerScore += 0;
            this.ties += 1;
            var tMsg: string = `
            ${output}
            It's a tie! Go again, no score added!

            Player Score: ${this.playerScore}, Computer Score: ${this.computerScore}
            `;
            alert(tMsg);
            this.DetermineWinner();
            return 0;
        }
    }

    private BTNClick(): void {
        this.Start();
        location.reload(true);
    }

    public Init(): void {
        let rpsScript: rps = new rps(info[0], info[1], info[2], info[3]);
        var element: Element = document.querySelector("#btn");
        element.addEventListener("click", () => {
          rpsScript.BTNClick();
        }, false);
    }
}

function loadScript(): void {
  let script: rps = new rps(info[0], info[1], info[2], info[3]);
  script.Init();
}
loadScript();
