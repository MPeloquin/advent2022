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

type Prediction = {
    shapeAgainst: (shape: Shape) => Shape;
};

const Win: Prediction = {
    shapeAgainst(shape) {
        if (shape === Rock) {
            return Paper;
        }
        if (shape === Paper) {
            return Scissors;
        }
        return Rock;
    },
};

const Draw: Prediction = {
    shapeAgainst(shape) {
        if (shape === Rock) {
            return Rock;
        }
        if (shape === Paper) {
            return Paper;
        }
        return Scissors;
    },
};

const Lose: Prediction = {
    shapeAgainst(shape) {
        if (shape === Rock) {
            return Scissors;
        }
        if (shape === Paper) {
            return Rock;
        }
        return Paper;
    },
};

const letterToShape: Record<string, Shape | Prediction> = {
    A: Rock,
    B: Paper,
    C: Scissors,
    X: Lose,
    Y: Draw,
    Z: Win,
};

const parsedData = data
    .split('\r\n')
    .filter((x) => x)
    .map((x) =>
        x.split(' ').map((letter) => {
            return letterToShape[letter];
        }),
    ) as unknown as [Shape, Prediction][];

let totalPoints = 0;

parsedData.forEach(([shape, prediction]) => {
    const shapeToPlay = prediction.shapeAgainst(shape);
    totalPoints += shapeToPlay.points;
    totalPoints += shapeToPlay.pointsAgainst(shape);
});

console.log(totalPoints);
