import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { Plate } from '../../../types/Plate';
import Modal from '../../Modal';
import { PlatesActions } from '../../../store/actions/plates';
import { useDispatch, useSelector } from 'react-redux';
import SaveIcon from '@mui/icons-material/Save';

import {
    createPlateInProgressSelector,
    updatePlateInProgressSelector,
} from '../../../store/selectors/plates';

export interface UpdateModalProps {
    plate?: Plate;
    open: boolean;
    onClose: () => void;
}

const UpdatePlateModal: React.FC<UpdateModalProps> = ({
    open,
    onClose,
    plate,
}) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [dirty, setDirty] = useState(false);
    const plateUpdateInProgress = useSelector(updatePlateInProgressSelector);
    const plateCreateInProgress = useSelector(createPlateInProgressSelector);
    const create = !plate;
    const confirmLabel = create ? 'Create' : 'Update';
    const title = `${confirmLabel} plate`;
    const dispatch = useDispatch();

    useEffect(() => {
        if (!dirty) return;

        if (!(plateUpdateInProgress || plateCreateInProgress)) {
            onClose();
            setName('');
            setPrice('');
            setDirty(false);
        }
    }, [onClose, dirty, plateUpdateInProgress, plateCreateInProgress]);



    useEffect(() => {
        if (!plate) {
            setName('');
            setPrice('');
            return;
        }
        setName(plate.nombre);
        setPrice(plate.precio.toString());
    }, [plate]);

    const handleOnConfirm = (
        payload: Partial<Plate>,
        currentPlate: Plate | undefined
    ) => {
        const payloadCandidate = !create
            ? { ...currentPlate, ...payload }
            : { ...payload, estado: true };

        const dispatchAction = !create
            ? PlatesActions.updatePlate
            : PlatesActions.createPlate;

        dispatch(dispatchAction(payloadCandidate as Plate));
        setDirty(true);
    };

    return (
        <Modal
            title={title}
            isOpen={open}
            onClose={onClose}
            confirmLabel={confirmLabel}
            confirmIcon={<SaveIcon />}
            updateInProgress={plateUpdateInProgress || plateCreateInProgress}
            onConfirm={() => {
                handleOnConfirm({ nombre: name, precio: Number(price) }, plate);
            }}
        >
            <TextField
                type="text"
                label="Plate name"
                margin="dense"
                fullWidth
                autoFocus
                value={name}
                onChange={(evt) => setName(evt.target.value)}
            />
            <br />
            <TextField
                type="text"
                label="price"
                margin="dense"
                fullWidth
                value={price}
                onChange={(evt) => setPrice(evt.target.value)}
            />
        </Modal>
    );
};

export default UpdatePlateModal;
