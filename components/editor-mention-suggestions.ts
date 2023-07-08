import {VueRenderer} from '@tiptap/vue-3'
import tippy, {GetReferenceClientRect, Instance, Props} from 'tippy.js'

import EditorMentionList from "~/components/editor-mention-list.vue";
import {SuggestionOptions} from "@tiptap/suggestion";

export default {
    items: ({query}) => {
        return [
            'Lea Thompson', 'Cyndi Lauper', 'Tom Cruise', 'Madonna', 'Jerry Hall', 'Joan Collins', 'Winona Ryder', 'Christina Applegate', 'Alyssa Milano', 'Molly Ringwald', 'Ally Sheedy', 'Debbie Harry', 'Olivia Newton-John', 'Elton John', 'Michael J. Fox', 'Axl Rose', 'Emilio Estevez', 'Ralph Macchio', 'Rob Lowe', 'Jennifer Grey', 'Mickey Rourke', 'John Cusack', 'Matthew Broderick', 'Justine Bateman', 'Lisa Bonet',
        ].filter(item => item.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5)
    },

    render: () => {
        let component: VueRenderer;
        let popup: Instance<Props>;

        return {
            onStart: props => {
                component = new VueRenderer(EditorMentionList, {
                    // using vue 2:
                    // parent: this,
                    // propsData: props,
                    props,
                    editor: props.editor,
                })

                if (!props.clientRect) {
                    return;
                }

                popup = tippy(document.body, {
                    getReferenceClientRect: props.clientRect as GetReferenceClientRect,
                    appendTo: () => document.body,
                    content: component.element,
                    showOnCreate: true,
                    interactive: true,
                    trigger: 'manual',
                    placement: 'bottom-start',
                })
            },

            onUpdate(props) {
                component.updateProps(props)

                if (!props.clientRect) {
                    return
                }

                popup.setProps({
                    getReferenceClientRect: props.clientRect as GetReferenceClientRect,
                })
            },

            onKeyDown(props) {
                if (props.event.key === 'Escape') {
                    popup.hide()

                    return true
                }

                return component.ref?.onKeyDown(props)
            },

            onExit() {
                popup.destroy()
                component.destroy()
            },
        }
    },
} as Omit<SuggestionOptions<any>, "editor">;