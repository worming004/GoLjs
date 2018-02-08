export class Cell {
    public neighborsCells: Cell[] = [];
    public isAlive: boolean = false;
    public wasAlive1Time: boolean = false;
    private isAliveNextTurn: boolean = null;

    async setStateForNextTurn() {
        if (this.isAliveNextTurn == null) {
            this.isAliveNextTurn = this.willBeAliveNextTurn();
            if (!this.wasAlive1Time && this.isAliveNextTurn) {
                this.wasAlive1Time = true;
            }
        }
    }

    setStateFromPreviousComputing() {
        if (this.isAliveNextTurn === undefined) {
            throw new Error('is alive next turn not setted');
        }
        this.isAlive = this.isAliveNextTurn;
        this.isAliveNextTurn = null;
    }

    private willBeAliveNextTurn(): boolean {
        const activeNeighborsCount = this.neighborsCells.filter(element => element.isAlive).length;
        if ((this.isAlive && activeNeighborsCount === 2) || activeNeighborsCount === 3) {
            return true;
        }
        return false;
    }
}