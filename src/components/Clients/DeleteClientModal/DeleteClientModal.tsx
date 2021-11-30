import Modal from '../../Modal/Modal';
import { Client } from '../../../types/Client';
import { useDispatch, useSelector } from 'react-redux';
import { ClientsActions } from '../../../store/actions/clients';
import { Delete } from '@mui/icons-material';
import { deleteClientInProgress } from '../../../store/selectors/clients';
import { useEffect, useState } from 'react';

interface DeleteClientModalProps {
    client: Client;
    open: boolean;
    onClose: () => void;
}

const DeleteClientModal: React.FC<DeleteClientModalProps> = ({
    open,
    client,
    onClose,
}) => {
    const dispatch = useDispatch();
    const [commited, setCommited] = useState(false);
    const deleteInProgress = useSelector(deleteClientInProgress);

    useEffect(() => {
        if (!commited) return;

        if (!deleteInProgress) {
            onClose();
            setCommited(false);
        }
    }, [commited, deleteInProgress, onClose]);
    const dismiss = () => {
        onClose();
    };

    const handleOnClose = () => {
        dismiss();
    };
    const handleOnConfirm = () => {
        dispatch(ClientsActions.deleteClient(client.id));
        setCommited(true);
    };
    return (
        <Modal
            onClose={handleOnClose}
            isOpen={open}
            title="Delete client"
            onConfirm={handleOnConfirm}
            updateInProgress={deleteInProgress}
            confirmLabel="Delete"
            confirmIcon={<Delete />}
        >
            <span>
                Are you sure you want to delete{' '}
                {`${client?.nombres} ${client?.apellidos}`}?
            </span>
        </Modal>
    );
};

export default DeleteClientModal;
