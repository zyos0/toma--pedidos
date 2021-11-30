import { ClientsState } from '../reducers/clients';
import { createSelector } from '@reduxjs/toolkit';

export const clientsStateSelector = (state: any): ClientsState => state.clients;

export const clientListSelector = createSelector(
    clientsStateSelector,
    (clientState) => {
        return clientState.clientsList;
    }
);

export const getClientsListInProgressSelector = createSelector(
    clientsStateSelector,
    (clientState) => {
        return clientState.getClientsListInProgress;
    }
);

export const getClientsListErrorSelector = createSelector(
    clientsStateSelector,
    (clientState) => {
        return clientState.getClientsListError;
    }
);

export const updateClientInProgressSelector = createSelector(
    clientsStateSelector,
    (clientState) => {
        return clientState.updateClientInProgress;
    }
);

export const updateClientErrorSelector = createSelector(
    clientsStateSelector,
    (clientState) => {
        return clientState.updateClientError;
    }
);

export const deleteClientInProgress = createSelector(
    clientsStateSelector,
    (clientState) => {
        return clientState.deleteClientInProgress;
    }
);

export const createClientInProgressSelector = createSelector(
    clientsStateSelector,
    (clientState) => {
        return clientState.createClientInProgress;
    }
);

export const createClientErrorSelector = createSelector(
    clientsStateSelector,
    (clientState) => {
        return clientState.createClientError;
    }
);

export const deleteClientError = createSelector(
    clientsStateSelector,
    (clientState) => {
        return clientState.deleteClientError;
    }
);
