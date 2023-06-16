import { _decorator, Component, Node, Vec3, tween, Animation, find, Collider,Contact2DType, Collider2D, BoxCollider2D, director, IPhysics2DContact } from 'cc';
import { spawnEnemy } from './spawnEnemy';
import { gameController } from './gameController';
const { ccclass, property } = _decorator;


@ccclass('friend')
export class friend extends Component {
    @property({type:Node})


    @property({
        type: Vec3
    })
    private tempPosition: Vec3 = new Vec3();

    @property({
        type: Number
    })
    public MoveSpeed:number = 5;

    private animation: Animation;

    private isDead: boolean = false;

    private moving: boolean = true;

    public start () {
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onLoad(){
        this.move();
    }


    update(dt: number){
        this.animation = this.getComponent(Animation);
        if(this.node.getPosition().y <= -820 && this.isDead == false){
            this.pass();
            this.dead();
        }
        if(this.isDead && this.animation.getState('enemyDead').isPlaying == false){
            this.animation.play('enemyMove');
            this.resetpositions();
        }
        if(this.node.getPosition().y <= 100 && this.isDead == false && gameController.isPlaying == false){
            this.dead();
        }
        if(this.moving == false && gameController.isPause == false){
            this.move();
        }
    }

    move(){
        this.tempPosition.x = this.node.position.x;
        let moveDirectionX = 0;
        if(this.tempPosition.x >= 0){
            moveDirectionX = Math.random()  * (this.node.position.x + 200) -200;
        }else{
            moveDirectionX = Math.random()  * (this.node.position.x - 200) + 200;
        }
        let t = tween(this.node.position)
            .to(this.MoveSpeed, new Vec3(moveDirectionX, -900, 0), {easing: "sineIn", 
            onUpdate: (target: Vec3, ratio: number) => {
                if(this.isDead == true){
                    t.stop();
                }
                this.node.position = target;
                if(gameController.isPause){
                    t.stop();
                    this.dead();
                }
            }
        }).start()
    }

    destroyEnemy(){
        this.node.destroy();
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if(otherCollider.tag == 1 && gameController.isPlaying == true){
            if(this.isDead == false){
                this.dead();
            }
        }
    }

    pass(){
        let gameManager = find("Canvas/GameS").getComponents("gameController");
        console.log(gameManager)
    }

    dead(){
        this.animation = this.getComponent(Animation);
        this.animation.stop();
        this.animation.play('enemyDead');
        this.animation.resume();
        this.isDead = true;
    }

    public resetpositions(){
        this.node.setPosition(Math.random() * (250 + 250) -250, 540, 0);
    }

}


