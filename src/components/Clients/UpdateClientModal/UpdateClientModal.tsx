import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { Client } from '../../../types/Client';
import Modal from '../../Modal';
import { ClientsActions } from '../../../store/actions/clients';
import { useDispatch, useSelector } from 'react-redux';
import SaveIcon from '@mui/icons-material/Save';

import {
    createClientInProgressSelector,
    updateClientInProgressSelector,
} from '../../../store/selectors/clients';

export interface UpdateModalProps {
    client?: Client;
    open: boolean;
    onClose: () => void;
}

const UpdateClientModal: React.FC<UpdateModalProps> = ({
    open,
    onClose,
    client,
}) => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [dirty, setDirty] = useState(false);
    const clientUpdateInProgress = useSelector(updateClientInProgressSelector);
    const clientCreateInProgress = useSelector(createClientInProgressSelector);
    const create = !client;
    const confirmLabel = create ? 'Create' : 'Update';
    const title = `${confirmLabel} client`;
    const dispatch = useDispatch();

    useEffect(() => {
        if (!dirty) return;

        if (!(clientUpdateInProgress || clientCreateInProgress)) {
            onClose();
            setName('');
            setLastName('');
            setBirthDate('');
            setDirty(false);
        }
    }, [onClose, dirty, clientUpdateInProgress, clientCreateInProgress]);

    useEffect(() => {
        if (!client) {
            setName('');
            setLastName('');
            setBirthDate('');
            return;
        }
        setName(client.nombres);
        setLastName(client.apellidos);
        setBirthDate(client.fechaNac);
    }, [client]);

    const handleOnConfirm = (
        payload: Partial<Client>,
        currentClient: Client | undefined
    ) => {
        const payloadCandidate = !create
            ? { ...currentClient, ...payload }
            : { ...payload};

        const dispatchAction = !create
            ? ClientsActions.updateClient
            : ClientsActions.createClient;

        dispatch(dispatchAction(payloadCandidate as Client));
        setDirty(true);
    };

    return (
        <Modal
            title={title}
            isOpen={open}
            onClose={onClose}
            confirmLabel={confirmLabel}
            confirmIcon={<SaveIcon />}
            updateInProgress={clientUpdateInProgress || clientCreateInProgress}
            onConfirm={() => {
                handleOnConfirm(
                    { nombres: name, apellidos: lastName, fechaNac: birthDate },
                    client
                );
            }}
        >
            <TextField
                type="text"
                label="Client name"
                margin="dense"
                fullWidth
                autoFocus
                value={name}
                onChange={(evt) => setName(evt.target.value)}
            />
            <br />
            <TextField
                type="text"
                label="Last Name"
                margin="dense"
                fullWidth
                value={lastName}
                onChange={(evt) => setLastName(evt.target.value)}
            />

            <br />
            <TextField
                autoFocus
                margin="dense"
                label="Birthdate"
                type="text"
                fullWidth
                onChange={(e) => setBirthDate(e.target.value)}
                value={birthDate}
            />
        </Modal>
    );
};

export default UpdateClientModal;
