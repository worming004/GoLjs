import { Cell } from './cell.class';

export class Grid {
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

    initialise(positions: { x: number, y: number }[]) {
        positions.forEach(position => {
            this.getCellByPosition(position.x, position.y).isAlive = true;
        });
    }

    setNextTurn(): void {
        let cellsToCheck: Cell[] = this.getCellsOnlyToCheck();

        const onlyUnique = function (value, index, self) {
            return self.indexOf(value) === index;
        }
        cellsToCheck = cellsToCheck.filter(onlyUnique);

        cellsToCheck.forEach(cell => {
            cell.setStateForNextTurn();
        });
        this.flatCells.forEach(cell => {
            cell.setStateFromPreviousComputing();
        })
    }

    private getCellsOnlyToCheck() {
        let result = [];
        this.flatCells.filter(cell => { return cell.isAlive }).forEach(element => {
            result.push(element);
            result = result.concat(element.neighborsCells);
        });
        return result;
    }

    private setNeighborsForEachCells() {
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                this.setNeighborsForCell({ x: i, y: j }, this.cells[i][j]);
            }
        }
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