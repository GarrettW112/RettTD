// export class Core {
//     constructor(x, y){
//         this.x = x;
//         this.y = y;
//         this.active = true;
//     }

//     refresh(player, towers) {
//         if (this.active) {
//             if (towers[3][3].hp <= 0) {
//                 this.active = false
//             }

//             for (const x of towers) {
//                 for (const y of x) {
//                     y.hp += 100;
//                 }
//             }

//             player.mana += 100
//     }

//     update(player)
// }