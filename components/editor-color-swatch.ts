import {Node} from '@tiptap/pm/model'
import {Decoration, DecorationSet} from '@tiptap/pm/view'
import {getRandomString} from "~/server/utils/common";

function handleMatch(match: RegExpMatchArray, decorations: Decoration[], position: number) {
    const color = match[0]
    const index = match.index || 0
    const from = position + index
    const to = from + color.length
    const decoration = Decoration.inline(from, to, {
        class: 'color',
        style: `--color: ${color}`,
    })

    decorations.push(decoration)
}

function copyColorHandler(e: Event) {
    const el = e.target as HTMLElement;
    navigator.clipboard.writeText(el.innerText).catch(e => {
        console.warn(`Error when copying color text ${el.innerText}.`);
    });
}

function createBubbleFor(element: Element) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.innerText = '单击复制色号';
    element.parentElement?.appendChild(bubble);
}

function hoverColorHandler(e: Event) {
    const el = e.target as HTMLElement;
    el.classList.add('active');
}

export default function (doc: Node): DecorationSet {
    const hexColor = /(#[0-9a-f]{3,6})\b/gi
    const rgbColor = /(rgb\(\d+\s?,\s?\d+\s?,\s?\d+\s?\))/gi
    const rgbaColor = /(rgba\(\d+\s?,\s?\d+\s?,\s?\d+\s?,\s?(0|1|\.\d|0\.\d)\))/gi
    const decorations: Decoration[] = []


    doc.descendants((node, position) => {
        if (!node.text) {
            return
        }

        Array.from(node.text.matchAll(hexColor)).forEach(match => handleMatch(match, decorations, position));
        Array.from(node.text.matchAll(rgbColor)).forEach(match => handleMatch(match, decorations, position));
        Array.from(node.text.matchAll(rgbaColor)).forEach(match => handleMatch(match, decorations, position));
    })

    return DecorationSet.create(doc, decorations)
}