import { Container } from "pixi.js";

export const sets = {
    A: new Container(),
    B: new Container()
} as const;

export function selectSet(set: keyof typeof sets) {
    for (const _k in sets) {

        // Cast to the real 
        const k = _k as keyof typeof sets;

        const container = sets[k];
        container.visible = k === set;
    }
}