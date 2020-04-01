const arr =  [8, 2.5, 13, 4, 9, 11]

const filtered = arr.filter(x => x > 5);
console.log("filtered", filtered)

const mapped = arr.map( x => ({'num': x}))
console.log("mapped", mapped)

const reduced = arr.reduce((a,b) => a * b, 1)
console.log("reduced", reduced)

const maxed = Math.max(...arr)
console.log("maxed", maxed)

const minMaxed = [Math.min(...arr), Math.max(...arr)]
console.log("minMaxed", [min, max] = minMaxed)

const noDupe = new Set (['love', 'grudge', 13, true, 'special']);
noDupe.add('doodooo');
noDupe.add(false);
noDupe.add('love');
console.log("noDupe", noDupe)