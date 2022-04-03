let LivingCreature = require("./LivingCreature")
module.exports = class Predator extends LivingCreature {

    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]


        if (newCell) {

            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 3;

            let predator = new Predator(x, y);
            predatorArr.push(predator);

            this.energy = 120;
        }
    }
    eat() {
        let emptyCells = this.chooseCell(2);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]


        if (newCell) {
            this.energy++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            for (let i in grassEaterArr) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1)
                }
            }

            this.x = x;
            this.y = y;

            if (this.energy >= 7) {
                this.mul();
            }
        } else {
            this.move()
        }
    }
    move() {
        this.energy--;

        let emptyCells1 = this.chooseCell(0)
        let emptyCells2 = this.chooseCell(1)
        let concatsEmptyCells = emptyCells1.concat(emptyCells2)
        let newCell = concatsEmptyCells[Math.floor(Math.random() * concatsEmptyCells.length)];



        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            for (let i in grassArr) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }

            this.y = y;
            this.x = x;
        }
        if (this.energy < 0) {
            this.die();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in predatorArr) {
            if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
                predatorArr.splice(i, 1)
            }
        }
    }
}