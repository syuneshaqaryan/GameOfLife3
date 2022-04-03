let LivingCreature = require("./LivingCreature")
module.exports = class Doktor extends LivingCreature {

    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]


        if (newCell) {

            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 5;


            let doktor = new Doktor(x, y);
            doktorArr.push(doktor);


            this.puls = 200;
        }
    }
    eat() {
        let emptyCells = this.chooseCell(4);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]


        if (newCell) {
            this.puls++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            for (let i in amenakerArr) {
                if (amenakerArr[i].x == x && amenakerArr[i].y == y) {
                    amenakerArr.splice(i, 1)
                }
            }

            this.x = x;
            this.y = y;

            if (this.puls >= 300) {
                this.mul();
            }
        } else {
            this.move()
        }
    }
    move() {
        this.puls--;

        let emptyCells1 = this.chooseCell(0)
        let emptyCells2 = this.chooseCell(1)
        let emptyCells3 = this.chooseCell(2)
        let emptyCells4 = this.chooseCell(3)
        let concatsEmptyCells = emptyCells1.concat(emptyCells2, emptyCells3, emptyCells4 ) 
        let newCell = concatsEmptyCells[Math.floor(Math.random() * concatsEmptyCells.length)];
        

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            for (let i in grassArr) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }
            for (let i in grassEaterArr) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1)
                }
            }
            for (let i in predatorArr) {
                if (predatorArr[i].x == x && predatorArr[i].y == y) {
                    predatorArr.splice(i, 1)
                }
            }

            this.y = y;
            this.x = x;
        }
        if (this.puls < 0) {
            this.die();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in doktorArr) {
            if (doktorArr[i].x == this.x && doktorArr[i].y == this.y) {
                doktorArr.splice(i, 1)
            }
        }
    }
}
