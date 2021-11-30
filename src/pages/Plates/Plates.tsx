import Layout from '../../components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { PlatesActions } from '../../store/actions/plates';
import { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';

import UpdatePlateModal from '../../components/Plates/UpdatePlateModal';
import {
    getPlatesListInProgressSelector,
    plateListSelector,
} from '../../store/selectors/plates';
import CustomList from '../../components/CustomList';
import PlateListItem from '../../components/Plates/PlateListItem';
import { Plate } from '../../types/Plate';
import DeletePlateModal from '../../components/Plates/DeletePlateModal';
import LoadingState from '../../components/LoadingState';
import EmptyState from '../../components/EmptyState';

const Plates = () => {
    const dispatch = useDispatch();
    const plateList = useSelector(plateListSelector);
    const fetchPlateListInProgress = useSelector(
        getPlatesListInProgressSelector
    );
    const [updatePlate, setUpdatePlate] = useState<Plate>();
    const [showCreateDialog, toggleCreateDialog] = useState(false);
    const [showDeleteDialog, toggleDeleteDialog] = useState(false);

    const handleOnUpdate = (item: Plate) => {
        setUpdatePlate(item);
        toggleCreateDialog(true);
    };

    const handleOnDelete = (item: Plate) => {
        setUpdatePlate(item);
        toggleDeleteDialog(true);
    };

    const onUpdateModalDismiss = () => {
        toggleCreateDialog(false);
        setUpdatePlate(undefined);
    };

    const onDeleteModalDismiss = () => {
        toggleDeleteDialog(false);
        setUpdatePlate(undefined);
    };

    useEffect(() => {
        dispatch(PlatesActions.getPlates());
    }, [dispatch]);

    return (
        <Layout>
            {fetchPlateListInProgress && (
                <LoadingState message="Loading plates..." />
            )}

            {!fetchPlateListInProgress && (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h1>Plates</h1>
                        <Button
                            onClick={() => toggleCreateDialog(true)}
                            variant="contained"
                        >
                            Add new plate
                        </Button>
                    </Grid>

                    {plateList && plateList.length ? (
                        <Grid item xs={9}>
                            {plateList && (
                                <CustomList<Plate>
                                    renderAs={PlateListItem}
                                    collection={plateList}
                                    onDelete={handleOnDelete}
                                    onUpdate={handleOnUpdate}
                                />
                            )}
                        </Grid>
                    ) : (
                        <EmptyState message="No plates Available" />
                    )}
                </Grid>
            )}

            <UpdatePlateModal
                open={showCreateDialog}
                plate={updatePlate}
                onClose={onUpdateModalDismiss}
            />

            <DeletePlateModal
                open={showDeleteDialog}
                plate={updatePlate as Plate}
                onClose={onDeleteModalDismiss}
            />
        </Layout>
    );
};

export default Plates;
