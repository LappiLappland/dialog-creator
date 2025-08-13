import type { Component } from 'vue';
import { DialogType, StylePosition, type DialogBox } from '../../types/Dialog';
import DialogEnabled from './DialogEnabled';
import ComponentSlider from '../../components/dialogs/ComponentSlider.vue';

export default class DialogSlider extends DialogEnabled {
    // public style: SliderType;

    constructor(id: string, box?: DialogBox) {
        super(id, box);

        this.style.position = StylePosition.HORIZONTAL;
        this.type = DialogType.SLIDER;
    }

    public getComponent(): Component {
        return ComponentSlider;
    }
}
