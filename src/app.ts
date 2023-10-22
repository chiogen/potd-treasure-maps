
import { Application } from 'pixi.js';
import { ViewControl } from './classes/view-control';
import { loadMap } from './maps/map';
import { selectSet, sets } from './maps/sets';
import { createTabButton } from './components/tab-button';

// Get first html elements
const tabsContainer = document.getElementById('tabs')!;

const app = new Application({
    resizeTo: window
});

new ViewControl(app).attach();
(app.view as HTMLCanvasElement).oncontextmenu = () => false;

document.body.insertBefore(app.view as HTMLCanvasElement, document.body.firstChild);
window.addEventListener('resize', udpateSize);

loadMap(app, sets.A, 'A');
loadMap(app, sets.B, 'B');

app.stage.addChild(sets.A);
app.stage.addChild(sets.B);
selectSet('B');

createTabButton('A').setup(tabsContainer)
createTabButton('B').setup(tabsContainer);


function udpateSize() {
    app.resize();
}
