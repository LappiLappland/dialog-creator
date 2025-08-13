import DialogActiveText from '../classes/dialogs/DialogActiveText';
import DialogButton from '../classes/dialogs/DialogButton';
import DialogCombo from '../classes/dialogs/DialogCombo';
import DialogEdit from '../classes/dialogs/DialogEdit';
import DialogItem from '../classes/dialogs/DialogItem';
import DialogListBox from '../classes/dialogs/DialogListBox';
import DialogProgress from '../classes/dialogs/DialogProgress';
import DialogSlider from '../classes/dialogs/DialogSlider';
import DialogToolbox from '../classes/dialogs/DialogToolbox';
import { DialogType } from '../types/Dialog';

type c = new (id: string) => DialogItem;

export const typeClassesMap = new Map<DialogType, c>([
    [DialogType.STATIC, DialogItem],
    [DialogType.BUTTON, DialogButton],
    [DialogType.EDIT, DialogEdit],
    [DialogType.SLIDER, DialogSlider],
    [DialogType.COMBO, DialogCombo],
    [DialogType.LISTBOX, DialogListBox],
    [DialogType.TOOLBOX, DialogToolbox],
    [DialogType.PROGRESS, DialogProgress],
    [DialogType.ACTIVETEXT, DialogActiveText],
]);
