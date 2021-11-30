import React from 'react';
import {
    Breakpoint,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    confirmIcon?: ReactJSXElement;
    title: string;
    updateInProgress?: boolean;
    cancelLabel?: string;
    confirmLabel?: string;
    size?: Breakpoint;
}
const Modal: React.FC<ModalProps> = ({
    isOpen,
    onConfirm,
    onClose,
    title,
    cancelLabel = 'Cancel',
    confirmLabel = 'Accept',
    children,
    updateInProgress = false,
    confirmIcon,
    size = 'sm',
}) => {
    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth={size}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button color="error" variant="outlined" onClick={onClose}>
                    {cancelLabel}
                </Button>
                <LoadingButton
                    loading={updateInProgress}
                    loadingPosition="start"
                    variant="contained"
                    startIcon={confirmIcon}
                    onClick={onConfirm}
                >
                    {confirmLabel}
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default Modal;
