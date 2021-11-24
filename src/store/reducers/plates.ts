import { createReducer } from '@reduxjs/toolkit';
import { PlatesActions } from '../actions/plates';

export interface PlatesState {
    getPlatesListInProgress: boolean;
    platesList: any[] | null;
    getPlatesListError: { message: string } | null;
}

const getInitialState = () => {
    return {
        getPlatesListError: null,
        getPlatesListInProgress: false,
        platesList: null,
    };
};

const onGetPlateListSuccess = (
    state: PlatesState,
    { payload }: ReturnType<typeof PlatesActions.onGetPlateListSuccess>
) => {
    return {
        ...state,
        platesList: payload,
    };
};

const onGetPlateListError = (
    state: PlatesState,
    { payload }: ReturnType<typeof PlatesActions.onGetPlateListError>
) => {
    return {
        ...state,
        getPlatesListError: { message: payload.message },
    };
};

const toggleGetPlateListLoadingState = (
    state: PlatesState,
    { payload }: ReturnType<typeof PlatesActions.toggleGetPlateListLoadingState>
) => {
    return {
        ...state,
        getPlatesListInProgress: payload,
    };
};

const resetPlateState = (state: PlatesState) => getInitialState();

const platesReducerBuilder = (builder: any) => {
    builder.addCase(PlatesActions.onGetPlateListSuccess, onGetPlateListSuccess);
    builder.addCase(PlatesActions.onGetPlateListError, onGetPlateListError);
    builder.addCase(
        PlatesActions.toggleGetPlateListLoadingState,
        toggleGetPlateListLoadingState
    );
    builder.addCase(PlatesActions.resetPlateState, resetPlateState);
};

export const platesReducer = createReducer(
    getInitialState(),
    platesReducerBuilder
);
