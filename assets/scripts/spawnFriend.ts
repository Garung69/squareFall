import { _decorator, Component, instantiate, Node, Prefab, director } from 'cc';
import { enemy } from './enemy';
const { ccclass, property } = _decorator;

@ccclass('spawnFriend')
export class spawnFriend extends Component {
    @property({
        type: Prefab,
    })
    public square:Prefab;

    @property({
        type: Node,
    })
    public spawnPoint:Node;

    public timeNextSpawn: number = 5;

    public spawnedEnemy: number;

    public numberTringgerEnemy: number = 7;

    onLoad(){
        this.spawnedEnemy = 0;
        this.spawn();
    }

    update(deltaTime: number) {
    }
    spawn(){
        let parent = this.spawnPoint;
        this.schedule(function() {
            let enemy = instantiate(this.square)
            enemy.setPosition(Math.random() * (250 + 250) -250, 540, 0);
            parent.addChild(enemy);
        }, this.timeNextSpawn, 10000, 0);
    }

}


