export class Cell {
    public neighborsCells: Cell[] = [];
    public isAlive: boolean = false;
    private isAliveNextTurn: boolean = null;

    setStateForNextTurn() {
        if (this.isAliveNextTurn == null)
            this.isAliveNextTurn = this.willBeAliveNextTurn();
    }

    setStateFromPreviousComputing() {
        if (this.isAliveNextTurn === undefined)
            throw new Error('is alive next turn not setted');
        this.isAlive = this.isAliveNextTurn;
        this.isAliveNextTurn = null;
    }

    private willBeAliveNextTurn(): boolean {
        // debugger;
        const activeNeighborsCount = this.neighborsCells.filter(element => { return element.isAlive }).length;
        if(this.neighborsCells.length > 3){
            debugger;
        }
        if(activeNeighborsCount > 0)
        {
            // debugger;
        }
        if ((this.isAlive && activeNeighborsCount === 2) || activeNeighborsCount === 3) {
            return true;
        }
        return false;
    }
}