import Player from "./Player";

export default class extends Player {
  constructor(scene, x, y) {
    super(scene, x, y, "player", 0);
    this.actionableDistance = 700000000;
    this.speed = 1500;
  }

  showActionableArea() {
    return;
  }


  startMoving() {
    return;
  }

  stopMoving({i,j}) {
    console.log(`[DEBUG] Player: arrived at: I : ${i} , J : ${j}`)
    return;
  }

}
