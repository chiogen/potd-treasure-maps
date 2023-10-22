
import { Application } from 'pixi.js';
import { ViewControl } from './classes/view-control';
import { loadMap } from './maps/map';

const app = new Application({
    resizeTo: window
});

new ViewControl(app).attach();

(app.view as HTMLCanvasElement).oncontextmenu = () => false;

document.body.appendChild(app.view as HTMLCanvasElement);
window.addEventListener('resize', udpateSize);

// loadMap(app, 'A');
loadMap(app, 'B');

function udpateSize() {
    app.resize();
}
