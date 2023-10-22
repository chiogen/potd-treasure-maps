import { Application, Point, Sprite, Texture } from "pixi.js";

export type Set = 'A' | 'B';

export async function loadMap(app: Application, set: Set) {


    const tileSize = Math.min(app.view.height, app.view.width) / 5;

    const map = getTextureUrls(set);
    const tiles: Sprite[] = [];

    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {

            const textureUrl = map[row][col];
            if (!textureUrl)
                continue;

            const tileCenter = new Point(
                (tileSize * col) + (tileSize / 2),
                (tileSize * row) + (tileSize / 2)
            );

            const tile = await createTile(app, textureUrl, tileCenter, tileSize);
            tiles.push(tile);
        }
    }

    return tiles;
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

async function createTile(app: Application, url: string, tileCenter: Point, tileSize: number) {

    const texture = await Texture.fromURL(url)

    const tile = Sprite.from(texture);
    app.stage.addChild(tile);

    const aspectRatio = texture.width / texture.height;

    // Place top/left corner at center first
    tile.x = tileCenter.x;
    tile.y = tileCenter.y;

    if (aspectRatio > 1) {
        tile.width = tileSize;
        tile.height = tileSize / aspectRatio;
    } else {
        tile.width = tileSize * aspectRatio;
        tile.height = tileSize;
    }

    tile.x -= tile.width / 2;
    tile.y -= tile.height / 2;

    return tile;
}