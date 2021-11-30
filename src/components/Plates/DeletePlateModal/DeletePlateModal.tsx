import Modal from '../../Modal/Modal';
import { Plate } from '../../../types/Plate';
import { useDispatch, useSelector } from 'react-redux';
import { PlatesActions } from '../../../store/actions/plates';
import { Delete } from '@mui/icons-material';
import { deletePlateInProgress } from '../../../store/selectors/plates';
import { useEffect, useState } from 'react';

interface DeletePlateModalProps {
    plate: Plate;
    open: boolean;
    onClose: () => void;
}

const DeletePlateModal: React.FC<DeletePlateModalProps> = ({
    open,
    plate,
    onClose,
}) => {
    const dispatch = useDispatch();
    const [commited, setCommited] = useState(false);
    const deleteInProgress = useSelector(deletePlateInProgress);

    useEffect(() => {
        if (!commited) return;

        if (!deleteInProgress) {
            onClose();
            setCommited(false)
        }
    }, [commited, deleteInProgress, onClose]);
    const dismiss = () => {
        onClose();
    };

    const handleOnClose = () => {
        dismiss();
    };
    const handleOnConfirm = () => {
        dispatch(PlatesActions.deletePlate(plate.id));
        setCommited(true);
    };
    return (
        <Modal
            onClose={handleOnClose}
            isOpen={open}
            title="Delete plate"
            onConfirm={handleOnConfirm}
            updateInProgress={deleteInProgress}
            confirmLabel="Delete"
            confirmIcon={<Delete />}
        >
            <span>Are you sure you want to delete {plate?.nombre}?</span>
        </Modal>
    );
};

export default DeletePlateModal;
