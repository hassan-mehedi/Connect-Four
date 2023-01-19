export type CircleType = {
    row: number;
    column: number;
    firstPerson: boolean;
    secondPerson: boolean;
    active: boolean;
};

export const circleArray: CircleType[][] = [];

for (let row: number = 0; row < 6; ++row) {
    const rowArray: CircleType[] = [];

    for (let column: number = 0; column < 7; ++column) {
        rowArray.push({
            row: row,
            column: column,
            firstPerson: false,
            secondPerson: false,
            active: false,
        });
    }

    circleArray.push(rowArray);
}
