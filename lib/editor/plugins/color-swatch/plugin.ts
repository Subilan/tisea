import {Extension} from '@tiptap/core'
import {Plugin} from '@tiptap/pm/state'

import colorSwatch from './decoration'

export const ColorHighlighter = Extension.create({
    name: 'colorHighlighter',

    addProseMirrorPlugins() {
        return [
            new Plugin({
                state: {
                    init(_, {doc}) {
                        return colorSwatch(doc)
                    },
                    apply(transaction, oldState) {
                        return transaction.docChanged ? colorSwatch(transaction.doc) : oldState
                    }
                },
                props: {
                    decorations(state) {
                        return this.getState(state)
                    },
                }
            }),
        ]
    },
});