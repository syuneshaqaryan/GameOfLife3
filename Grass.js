let LivingCreature = require("./LivingCreature")
module.exports = class Grass extends LivingCreature {

    mul() {
        this.multiply++;

        let emptyCells = this.chooseCell(0);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]


        if (newCell && this.multiply >= 8) {

            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 1;

            let grass = new Grass(x, y);
            grassArr.push(grass);

            this.multiply = 0;
        }
    }
}