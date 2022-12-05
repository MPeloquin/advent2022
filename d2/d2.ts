const data = Deno.readTextFileSync('.\\d2\\data.txt');

type Shape = {
    points: number;
    pointsAgainst: (shape: Shape) => number;
};

const Paper: Shape = {
    points: 2,
    pointsAgainst(shape) {
        if (shape === Rock) {
            return 6;
        }
        if (shape === Paper) {
            return 3;
        }
        return 0;
    },
};
const Scissors: Shape = {
    points: 3,
    pointsAgainst(shape) {
        if (shape === Paper) {
            return 6;
        }
        if (shape === Scissors) {
            return 3;
        }
        return 0;
    },
};

const Rock: Shape = {
    points: 1,
    pointsAgainst(shape) {
        if (shape === Scissors) {
            return 6;
        }
        if (shape === Rock) {
            return 3;
        }
        return 0;
    },
};

const letterToShape: Record<string, Shape> = {
    A: Rock,
    B: Paper,
    C: Scissors,
    X: Rock,
    Y: Paper,
    Z: Scissors,
};

const parsedData = data
    .split('\r\n')
    .filter((x) => x)
    .map((x) =>
        x.split(' ').map((letter): Shape => {
            return letterToShape[letter] as Shape;
        }),
    );

let totalPoints = 0;

parsedData.forEach((round) => {
    totalPoints += round[1].points;
    totalPoints += round[1].pointsAgainst(round[0]);
});

console.log(totalPoints);
