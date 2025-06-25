/** @format */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LanguageType } from '@_types/language.type';
import { TranslationService } from '@services/translation.service';

interface TranslationState {
    language: LanguageType;
    translation: any;
}

const initialLanguage = TranslationService.language;
const initialTranslation = TranslationService.translation;

const initialState: TranslationState = {
    language: initialLanguage,
    translation: initialTranslation,
};

const translationSlice = createSlice({
    name: 'translation',
    initialState,
    reducers: {
        setLanguage(state, action: PayloadAction<LanguageType>) {
            TranslationService.language = action.payload;
            state.language = action.payload;
            state.translation = TranslationService.translation;
        },
    },
});

export const { setLanguage } = translationSlice.actions;
export default translationSlice.reducer;
