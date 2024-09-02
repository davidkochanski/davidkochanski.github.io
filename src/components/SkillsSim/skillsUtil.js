export const toMass = (size) => {
    return 4 / 3 * Math.PI * (size / 2)**3; // this is slightly not realistic
}                                           // but it "feels" better when I change it a bit

export const uniformRandom = (min, max) => {
    return Math.random() * (max - min) + min;
}

export const clamp = (low, x, high) => {
    return Math.max(low, Math.min(x, high))
}
