import { Application, Sprite } from "pixi.js";

export type Set = 'A' | 'B';

export function loadMap(app: Application, set: Set) {
    const map = getTextureUrls(set);

    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {

            const tile = map[row][col];
            if (!tile)
                continue;

            createTile(app, tile, col, row);

        }
    }
}

function getTextureUrls(set: Set) {
    return [
        [
            null,
            `textures/${set}-2-1.png`,
            `textures/${set}-3-1.png`,
            `textures/${set}-4-1.png`,
            null
        ],
        [
            `textures/${set}-1-2.png`,
            `textures/${set}-2-2.png`,
            `textures/${set}-3-2.png`,
            `textures/${set}-4-2.png`,
            `textures/${set}-5-2.png`
        ],
        [
            `textures/${set}-1-3.png`,
            `textures/${set}-2-3.png`,
            `textures/${set}-3-3.png`,
            `textures/${set}-4-3.png`,
            `textures/${set}-5-3.png`
        ],
        [
            `textures/${set}-1-4.png`,
            `textures/${set}-2-4.png`,
            `textures/${set}-3-4.png`,
            `textures/${set}-4-4.png`,
            `textures/${set}-5-4.png`
        ],
        [
            null,
            `textures/${set}-2-5.png`,
            `textures/${set}-3-5.png`,
            `textures/${set}-4-5.png`,
            null
        ]
    ]
}


function createTile(app: Application, url: string, col: number, row: number) {
    const tile = Sprite.from(url);
    app.stage.addChild(tile);

    const size = Math.min(app.view.height, app.view.width) / 5;

    tile.x = size * col;
    tile.y = size * row;

    tile.width = size;
    tile.height = size;
}