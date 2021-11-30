import Layout from '../../components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { ClientsActions } from '../../store/actions/clients';
import { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';

import UpdateClientModal from '../../components/Clients/UpdateClientModal';
import {
    getClientsListInProgressSelector,
    clientListSelector,
} from '../../store/selectors/clients';
import CustomList from '../../components/CustomList';
import ClientListItem from '../../components/Clients/ClientListItem';
import { Client } from '../../types/Client';
import DeleteClientModal from '../../components/Clients/DeleteClientModal';
import LoadingState from '../../components/LoadingState';
import EmptyState from '../../components/EmptyState';

const Clients = () => {
    const dispatch = useDispatch();
    const clientList = useSelector(clientListSelector);
    const fetchClientListInProgress = useSelector(
        getClientsListInProgressSelector
    );
    const [updateClient, setUpdateClient] = useState<Client>();
    const [showCreateDialog, toggleCreateDialog] = useState(false);
    const [showDeleteDialog, toggleDeleteDialog] = useState(false);

    const handleOnUpdate = (item: Client) => {
        setUpdateClient(item);
        toggleCreateDialog(true);
    };

    const handleOnDelete = (item: Client) => {
        setUpdateClient(item);
        toggleDeleteDialog(true);
    };

    const onUpdateModalDismiss = () => {
        toggleCreateDialog(false);
        setUpdateClient(undefined);
    };

    const onDeleteModalDismiss = () => {
        toggleDeleteDialog(false);
        setUpdateClient(undefined);
    };

    useEffect(() => {
        dispatch(ClientsActions.getClients());
    }, [dispatch]);

    return (
        <Layout>
            {fetchClientListInProgress && (
                <LoadingState message="Loading clients..." />
            )}

            {!fetchClientListInProgress && (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h1>Clients</h1>
                        <Button
                            onClick={() => toggleCreateDialog(true)}
                            variant="contained"
                        >
                            Add new client
                        </Button>
                    </Grid>

                    {clientList && clientList.length ? (
                        <Grid item xs={9}>
                            {clientList && (
                                <CustomList<Client>
                                    renderAs={ClientListItem}
                                    collection={clientList}
                                    onDelete={handleOnDelete}
                                    onUpdate={handleOnUpdate}
                                />
                            )}
                        </Grid>
                    ) : (
                        <EmptyState message="No clients Available" />
                    )}
                </Grid>
            )}

            <UpdateClientModal
                open={showCreateDialog}
                client={updateClient}
                onClose={onUpdateModalDismiss}
            />

            <DeleteClientModal
                open={showDeleteDialog}
                client={updateClient as Client}
                onClose={onDeleteModalDismiss}
            />
        </Layout>
    );
};

export default Clients;
