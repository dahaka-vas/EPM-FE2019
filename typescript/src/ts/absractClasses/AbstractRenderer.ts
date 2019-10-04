import Renderable from '../interfaces/Renderable';
export default abstract class AbstractRenderer implements Renderable {
    render(selector: string, RENDER_COL: number): void {
        throw new Error("Method not implemented.");
    }
}