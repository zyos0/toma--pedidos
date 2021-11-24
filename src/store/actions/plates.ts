import { createAction, Dispatch } from '@reduxjs/toolkit';
import httpClient from '../../services/httpClient';
import { platesUrl } from '../../constants/endpoints';

export enum PlateActionType {
    GET_PLATE_LIST_ON_SUCCESS = 'GET_PLATE_LIST_ON_SUCCESS',
    GET_PLATE_LIST_ON_ERROR = 'GET_PLATE_LIST_ON_ERROR',
    TOGGLE_GET_PLATE_LIST_LOADING_STATE = 'TOGGLE_GET_PLATE_LIST_LOADING_STATE',
    RESET_PLATE_STATE = 'RESET_PLATE_STATE',
}

const onGetPlateListSuccess = createAction<any[]>(
    PlateActionType.GET_PLATE_LIST_ON_SUCCESS
);

const onGetPlateListError = createAction<Error>(
    PlateActionType.GET_PLATE_LIST_ON_ERROR
);

const toggleGetPlateListLoadingState = createAction<boolean>(
    PlateActionType.TOGGLE_GET_PLATE_LIST_LOADING_STATE
);

const resetPlateState = createAction<undefined>(
    PlateActionType.RESET_PLATE_STATE
);

const getPlates = () => async (dispatch: Dispatch) => {
    dispatch(toggleGetPlateListLoadingState(true));
    try {
        const { data: plateList } = await httpClient.get(platesUrl);
        dispatch(onGetPlateListSuccess(plateList));
    } catch (error) {
        dispatch(onGetPlateListError(error as Error));
    }
    dispatch(toggleGetPlateListLoadingState(false));
};

export const PlatesActions = {
    onGetPlateListSuccess,
    onGetPlateListError,
    toggleGetPlateListLoadingState,
    resetPlateState,
    getPlates,
};
