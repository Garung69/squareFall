import { _decorator, Component, Node, js, UITransform, Vec3 , Contact2DType, Collider2D, IPhysics2DContact } from 'cc';
import { gameController } from './gameController';
import { audio } from './audio';
const { ccclass, property } = _decorator;

const { array } = js; 
const { contains } = array;


@ccclass('player')
export class player extends Component {
    

    @property({
        type: Node,
        tooltip: 'Ball'
    })
    public ball:Node;

    @property({
        type: Node,
    })
    public gameControl:Node;

    private direction:number = 1;

    @property({
        type: Vec3
    })
    private tempPosition: Vec3 = new Vec3();

    @property({
        type: Node
    })
    public audioManager: Node;

    public ballSpeed:number = 450;

    private listHit: string[] =[];

    onLoad(){
        let collider = this.ball.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    update(deltaTime: number) {
        this.move(deltaTime);
    }

    move(deltaTime: number){
        if(!gameController.isPause && gameController.isPlaying){
        this.tempPosition.x = this.ball.getPosition().x;
        if(this.tempPosition.x > 200){
            this.changeDirectionFixed(true);
            let audio;
            audio = this.audioManager.getComponent('audio');
            audio.onAudioQueue(3);
        }
        if(this.tempPosition.x < -200){
            this.changeDirectionFixed(false);
            let audio;
            audio = this.audioManager.getComponent('audio');
            audio.onAudioQueue(3);
        }
        this.tempPosition.x -= deltaTime * this.ballSpeed * this.direction;
        this.ball.setPosition(this.tempPosition);
        }
    }

    startUp(){
        
    }

    public changeDirection(){
        this.direction = this.direction * -1;
    }

    public changeDirectionFixed(direction: boolean){
        if(direction){
            this.direction = 1;
        }else{
            this.direction = -1;
        }
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        console.log(otherCollider._id);
        if(gameController.isPlaying == true && !contains(this.listHit, otherCollider._id)){
            this.listHit.push(otherCollider._id)
            if(otherCollider.tag == 2){
                let gameManager;
                gameManager = this.gameControl.getComponent('gameController');
                gameManager.addScore();
                let audio;
                audio = this.audioManager.getComponent('audio');
                audio.onAudioQueue(2);
            }
            if(otherCollider.tag == 0){
                let gameManager;
                gameManager = this.gameControl.getComponent('gameController');
                gameManager.gameOver();
                let audio;
                audio = this.audioManager.getComponent('audio');
                audio.onAudioQueue(4);
            }
        } 
    }
}


