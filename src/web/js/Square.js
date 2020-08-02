class Square {
    constructor(x, y, width, rgb) {
        this.x = x;
        this.y = y;
        this.width = CELL_SIZE;
        this.rgb = rgb;

        this.phase = 0;
        // this.draw();
    }

    draw(x, y) {
        fill(this.rgb[0], this.rgb[1], this.rgb[2]);
        strokeWeight(1.5);
        stroke(0, 0, 0);
        square((x + this.x * this.width), (y + this.y * this.width), this.width);
    }

    changePhase(reverse = false) {
        if (reverse) {
            this.phase -= 1;
        } else {
            this.phase += 1;
        }
    }

    goTo(x, y) {
        this.x = x;
        this.y = y;
    }


    rotate() {
        this.goTo(this.x, this.y - 1);
    }

    down() {
        this.goTo(this.x, this.y + 1);
    }

    left() {
        this.goTo(this.x - 1, this.y);
    }

    right() {
        this.goTo(this.x + 1, this.y);
    }

    clone() {
        const clone = new Square(this.x, this.y, this.width, this.rgb);
        clone.phase = this.phase;
        return clone;
    }
}