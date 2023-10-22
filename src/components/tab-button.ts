import { selectSet, sets } from "../maps/sets";

export function createTabButton(set: keyof typeof sets) {
    const button = document.createElement('button');
    button.classList.add('tab', 'map-set-button');

    button.textContent = set;

    button.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();

        selectSet(set);
    });

    return {
        setup(parent: HTMLElement) {
            parent.appendChild(button);
        }
    } as const;
}