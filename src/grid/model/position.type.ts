export class GPosition {
    static Array2DToPosition(array: any[]): GPosition[] {
        const result: GPosition[] = [];
        array.forEach(pair => {
            result.push(new GPosition(pair[0], pair[1]));
        });
        return result;
    }
    constructor(public x: number, public y: number) { }
}
