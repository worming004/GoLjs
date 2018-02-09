import { GPosition } from './position.type';
import { Cell } from './cell.class';
import { resolve } from 'url';

export class Grid {
    private isRunning: boolean = false;
    public cells: Cell[][] = [];
    private flatCells: Cell[] = [];

    constructor(numberOfRows: number, numberOfColumns: number, positions?: GPosition[]) {
        for (let i = 0; i < numberOfRows; i++) {
            this.cells.push([])
            for (let j = 0; j < numberOfColumns; j++) {
                const cell = new Cell;
                this.cells[i].push(cell);
                this.flatCells.push(cell);
            }
        }
        if (positions) {
            this.initialise(positions);
        }
        this.setNeighborsForEachCells();
    }

    initialise(positions: GPosition[]) {
        positions.forEach(position => {
            this.getCellByPosition(position.x, position.y).isAlive = true;
        });
    }

    setNextTurn(): void {
        if (!this.isRunning) {
            // const time = new Date();
            this.isRunning = true;

            const cellsToCheck: Cell[] = this.getCellsOnlyToCheckForNextTurn();
            const allSetProm = [];
            cellsToCheck.forEach(cell => {
                allSetProm.push(new Promise((res) => {
                    cell.setStateForNextTurn();
                    res();
                }));
            });
            Promise.all(allSetProm).then(() => {
                const allNewSetProm = [];
                this.flatCells.forEach(cell => {
                    allNewSetProm.push(new Promise((res) => {
                        cell.setStateFromPreviousComputing();
                        res();
                    }));
                });
                Promise.all(allNewSetProm).then(() => {
                    this.isRunning = false;
                    // console.log(new Date().valueOf() - time.valueOf());
                });
            });
        } else {
            console.log('miss turn!');
        }
    }

    private setNeighborsForEachCells() {
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                new Promise(() => { this.setNeighborsForCell({ x: i, y: j }, this.cells[i][j]); });
            }
        }
    }

    private getCellsOnlyToCheckForNextTurn() {
        // only alive celkls and it's neighbors are to check.
        // dead cell with only dead neighbors will nevet get a state change
        let result = [];
        const allProcess = [];
        this.flatCells
            .filter(cell => cell.isAlive)
            .forEach(element => {
                const cellsFound = [element, ...element.neighborsCells];
                result = result.concat(
                    cellsFound.filter(cell =>
                        !result.includes(cell)
                    )
                );
            }
            );
        return result;
    }

    private setNeighborsForCell(position: { x: number, y: number }, cell) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const cellFound = this.getCellByPosition(i + position.x, j + position.y);
                if (cellFound && !(i === 0 && j === 0)) {
                    cell.neighborsCells.push(cellFound);
                }
            }
        }
    }

    private getCellByPosition(x: number, y: number): Cell {
        try {
            if (x >= 0 && x < this.cells.length && y >= 0 && y < this.cells[x].length) {
                return this.cells[x][y];
            }
            throw new Error('cell not found');
        } catch (error) {
            console.log('error at x:${x} y:${y}');
        }
    }
}