import { _decorator, Component, instantiate, Node, Prefab, director } from 'cc';
import { enemy } from './enemy';
const { ccclass, property } = _decorator;

@ccclass('spawnEnemy')
export class spawnEnemy extends Component {

    @property({
        type: Prefab,
    })
    public square:Prefab;

    @property({
        type: Node,
    })
    public spawnPoint:Node;

    public timeNextSpawn: number = 1.5;

    public static spawnedEnemy: number = 0;


    onLoad(){
        this.spawn();
    }

    update(deltaTime: number) {
        this.timeNextSpawn = 1.5 - spawnEnemy.spawnedEnemy * 0.2;
    }
    spawn(){
        let parent = this.spawnPoint;
        this.schedule(function() {
            let enemy = instantiate(this.square)
            enemy.setPosition(Math.random() * (250 + 250) -250, 800, 0);
            parent.addChild(enemy);
            spawnEnemy.spawnedEnemy += 1;
        }, this.timeNextSpawn , 10000, 0);
    }


}


