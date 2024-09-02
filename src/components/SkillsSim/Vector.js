export default class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    subtract(v) {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    getMagnitude() {
        return (this.x ** 2 + this.y ** 2) ** 0.5;
    }

    static dot(v, u) {
        return (v.x * u.x + v.y * u.y);
    }

    scaleByConstant(c) {
        return new Vector(this.x * c, this.y * c)
    }

    normalize() {
        const mag = this.getMagnitude();
        return new Vector(this.x / mag, this.y / mag);
    }
}