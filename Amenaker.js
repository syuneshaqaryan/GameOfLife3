let LivingCreature = require("./LivingCreature")
module.exports = class Amenaker extends LivingCreature {

    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

        if (newCell) {

            let x = newCell[0];
            let y = newCell[1];

            // matrixi mej gru mem MEK -> 
            matrix[y][x] = 4;

            let amenaker = new Amenaker(x, y);
            amenakerArr.push(amenaker);

            this.hzor = 20;
        }
    }
    eat() {
        let emptyCells1 = this.chooseCell(1)
        let emptyCells2 = this.chooseCell(2)
        let emptyCells3 = this.chooseCell(3)
        let concatsEmptyCells = emptyCells1.concat(emptyCells2, emptyCells3 ) 
        let newCell = concatsEmptyCells[Math.floor(Math.random() * concatsEmptyCells.length)];


        if (newCell) {
            this.hzor++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            if (newCell == 1) {
                for (let i in grassArr) {
                    if (grassArr[i].x == x && grassArr[i].y == y) {
                        grassArr.splice(i, 1)
                    }
                }
            }
            else if (newCell == 2) {
                for (let i in grassEaterArr) {
                    if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                        grassEaterArr.splice(i, 1)
                    }
                }
            }
            else if (newCell == 3) {
                for (let i in predatorArr) {
                    if (predatorArr[i].x == x && predatorArr[i].y == y) {
                        predatorArr.splice(i, 1)
                    }
                }
            }

            this.x = x;
            this.y = y;

            if (this.hzor >= 300) {
                this.mul();
            }
        } else {
            this.move()
        }
    }
    move() {
        this.hzor--;

        let emptyCells = this.chooseCell(0)
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]


        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;
        }
        if (this.hzor < 0) {
            this.die();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in amenakerArr) {
            if (amenakerArr[i].x == this.x && amenakerArr[i].y == this.y) {
                amenakerArr.splice(i, 1)
            }
        }
    }
}