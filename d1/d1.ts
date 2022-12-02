const data = Deno.readTextFileSync('.\\d1\\data.txt');

const elves = data.split('\r\n\r').map((elf) => elf.replaceAll('\n', '').split('\r').map(Number));

const total = elves.map((elf) => elf.reduce((a, b) => a + b));

const top = total.sort((a, b) => b - a);

console.log(top[0]);
console.log(top[0] + top[1] + top[2]);
