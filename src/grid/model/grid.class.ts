import { Cell } from './cell.class';
import { GPosition } from 'grid/model/position.type';

export class Grid {
    private isRunning: boolean = false;
    public cells: Cell[][] = [];
    private flatCells: Cell[] = [];

    constructor(numberOfRows: number, numberOfColumns: number) {
        for (let i = 0; i < numberOfRows; i++) {
            this.cells.push([])
            for (let j = 0; j < numberOfColumns; j++) {
                const cell = new Cell;
                this.cells[i].push(cell);
                this.flatCells.push(cell);
            }
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
            this.isRunning = true;

            let cellsToCheck: Cell[] = this.getCellsOnlyToCheckForNextTurn();

            cellsToCheck = cellsToCheck.filter((value, index, self) => {
                return self.indexOf(value) === index;
            });

            cellsToCheck.forEach(cell => {
                cell.setStateForNextTurn();
            });
            this.flatCells.forEach(cell => {
                cell.setStateFromPreviousComputing();
            })
            this.isRunning = false;
        } else {
            console.log('miss turn!');
        }
    }

    private setNeighborsForEachCells() {
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                this.setNeighborsForCell({ x: i, y: j }, this.cells[i][j]);
            }
        }
    }

    private getCellsOnlyToCheckForNextTurn() {
        // only alive cells and it's neighbors are to check.
        // dead cell with only dead neighbors will nevet get a state change
        let result = [];
        this.flatCells
            .filter(cell => { return cell.isAlive })
            .forEach(element => {
                const cellsFound = [element, ...element.neighborsCells]
                cellsFound.forEach(cell => {
                    if (result.indexOf(cell) === -1) {
                        result.push(cell);
                    }
                });
            }
            );
        return result;
    }

    private setNeighborsForCell(position: { x: number, y: number }, cell) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const cellFound = this.getCellByPosition(i + position.x, j + position.y);
                if (cellFound && !(i === 0 && j === 0))
                    cell.neighborsCells.push(cellFound);
            }
        }
    }

    private getCellByPosition(x: number, y: number): Cell {
        try {
            if (x >= 0 && x < this.cells.length && y >= 0 && y < this.cells[x].length)
                return this.cells[x][y];
            return null;
        } catch (error) {
            console.log('error at x:${x} y:${y}');
        }
    }
}