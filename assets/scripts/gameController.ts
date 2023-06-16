import { _decorator,Vec3, tween, Component, Node, input, Input, EventKeyboard, KeyCode, find, Label } from 'cc';
import { player } from './player';
import { audio } from './audio';
const { ccclass, property } = _decorator;

@ccclass('gameController')
export class gameController extends Component {

    @property({
        type:Node
    })
    public homeScreen: Node;

    @property({
        type:Node
    })
    public playScreen: Node;

    @property({
        type:Node
    })
    public gameOverScreen: Node;

    @property({
        type:player
    })
    public player: player;

    @property({
        type:Number
    })
    public score: number;

    @property({
        type:Number
    })
    public maxScore: number = 0;

    @property({
        type:Label
    })
    public scoreLabelInGame: Label;

    @property({
        type:Label
    })
    public scoreLabelGameOver: Label;

    @property({
        type:Label
    })
    public maxScoreLabelGameOver: Label;

    @property({
        type: Node
    })
    public audioManager: Node;

    public static isPause:boolean = false;

    public static isPlaying:boolean = false;

    public tranSpeed: number = 1;

    initListioner(){
        input.on(Input.EventType.TOUCH_START, ()=>{
            console.log('TOUCH_START');
            this.player.changeDirection();
            let audio;
            audio = this.audioManager.getComponent('audio');
            audio.onAudioQueue(1);
        });
    }

    onLoad() {
        this.score = 0;
        this.maxScore = 0;
        this.initListioner();
    }

    public addScore(){
        this.score += 1;
        this.scoreLabelInGame.string = "" + this.score;
        this.scoreLabelGameOver.string = "" + this.score;
        if(this.score > this.maxScore){
            this.maxScore = this.score;
            this.maxScoreLabelGameOver.string = "BEST " + this.score;
        }
    }

    

    playGame(){
        console.log(this.audioManager)
        let audio;
        audio = this.audioManager.getComponent('audio');
        audio.onAudioQueue(0);
        tween(this.homeScreen.position)
            .to(this.tranSpeed, new Vec3(0, 1000, 0), {easing: "sineIn", 
            onUpdate: (target: Vec3, ratio: number) => {
                this.homeScreen.position = target;
            }
        }).start()
        tween(this.playScreen.position)
            .to(this.tranSpeed, new Vec3(0, 0, 0), {easing: "sineIn", 
            onUpdate: (target: Vec3, ratio: number) => {
                this.playScreen.position = target;
            }
        }).start()
        gameController.isPlaying = true;
    }

    gameOver(){
        tween(this.playScreen.position)
            .to(this.tranSpeed *2, new Vec3(0, 1000, 0), {easing: "sineIn", 
            onUpdate: (target: Vec3, ratio: number) => {
                this.playScreen.position = target;
            }
        }).start()
        tween(this.gameOverScreen.position)
            .to(this.tranSpeed *2, new Vec3(0, 0, 0), {easing: "sineIn", 
            onUpdate: (target: Vec3, ratio: number) => {
                this.gameOverScreen.position = target;
            }
        }).start()
        gameController.isPlaying = false;
    }

    public restartGame(){
        let audio;
        audio = this.audioManager.getComponent('audio');
        audio.onAudioQueue(0);
        this.score = 0;
        this.scoreLabelInGame.string = "" + this.score;
        tween(this.gameOverScreen.position)
        .to(this.tranSpeed, new Vec3(0, -1000, 0), {easing: "sineIn", 
        onUpdate: (target: Vec3, ratio: number) => {
            this.gameOverScreen.position = target;
        }
        }).start()
        tween(this.playScreen.position)
            .to(this.tranSpeed, new Vec3(0, 0, 0), {easing: "sineIn", 
            onUpdate: (target: Vec3, ratio: number) => {
                this.playScreen.position = target;
            }
        }).start()
        this.scoreLabelGameOver.string = "" + this.score;
        gameController.isPlaying = true;
        gameController.isPause = false;
    }

}


