import type { InjectionKey } from 'vue';

type SetPreventGlobalHotkeysType = (value: boolean) => void;

export const setPreventGlobalHotkeysKey = Symbol() as InjectionKey<SetPreventGlobalHotkeysType>;
