import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clientListSelector } from '../../store/selectors/clients';
import { plateListSelector } from '../../store/selectors/plates';

import { invoicesUrl } from '../../constants/endpoints';

import Layout from '../../components/Layout/Layout';
import { ClientsActions } from '../../store/actions/clients';
import { PlatesActions } from '../../store/actions/plates';
import httpClient from '../../services/httpClient';
import {Button, Grid, IconButton, MenuItem, Paper, Select, TextField} from '@mui/material';
import {
    RemoveCircle as RemoveCircleIcon,
    AddCircle as AddCircleOutlineIcon,
} from '@mui/icons-material';
function InvoiceCreate() {
    const [client, setClient] = useState('');
    const [plate, setPlate] = useState('');
    const [description, setDescription] = useState('');
    const [observation, setObservation] = useState('');
    const [orders, setOrders] = useState<any[]>([]);

    const clientList = useSelector(clientListSelector);
    const plateList = useSelector(plateListSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!clientList) dispatch(ClientsActions.getClients());
        if (!plateList) dispatch(PlatesActions.getPlates());
    }, []);

    const onAddOrder = () => {
        function findPlateName() {
            const objPlato = plateList?.find((p) => p.id === plate);
            return objPlato?.nombre;
        }

        const existInPlate = orders.find((x) => x.id === plate);
        const newOrderArray = [...orders];

        if (existInPlate) {
            const newQty = (existInPlate.qty += 1);
            const index = newOrderArray.findIndex((p) => p.id === plate);

            newOrderArray[index]['qty'] = newQty;
        } else {
            const order = {
                id: plate,
                nombre: findPlateName(),
                qty: 1,
            };
            newOrderArray.push(order);
        }

        setOrders(newOrderArray);
    };

    const onNewInvoice = async () => {
        function transformOrders() {
            return orders.map((p) => {
                return {
                    kay: p.id,
                    cantidad: p.qty,
                    plato: {
                        id: p.id,
                    },
                };
            });
        }
        try {
            const payload = {
                descripcion: description,
                observacion: observation,
                cliente: {
                    id: client,
                },
                items: transformOrders(),
            };
            await httpClient.post(invoicesUrl, payload);
            setClient('');
            setPlate('');
            setDescription('');
            setObservation('');
            setOrders([]);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSelectClient = (event: any) => {
        setClient(event.target.value);
        setPlate('');
        setOrders([]);
    };

    const handleSelectPlate = (event: any) => {
        setPlate(event.target.value);
    };

    const onChangeDescription = (event: any) => {
        setDescription(event.target.value);
    };

    const onChangeObservation = (event: any) => {
        setObservation(event.target.value);
    };

    const onSubtract = (order: any) => {
        const newOrderArray = [...orders];
        const orderDuplicate = { ...order };

        const newQty = (orderDuplicate.qty -= 1);

        const index = newOrderArray.findIndex(
            (p) => p.id === orderDuplicate.id
        );

        if (newQty === 0) {
            newOrderArray.splice(index, 1);
        } else {
            newOrderArray[index]['qty'] = newQty;
        }

        setOrders(newOrderArray);
    };

    const renderOrders = () => {
        return (
            <div className="tablePedidos">
                <div className="tableOrders__head">
                    <div className="tableOrders__head--item">Plate</div>
                    <div className="tableOrders__head--item">Quantity</div>
                    <div className="tableOrders__head--item">action</div>
                </div>
                <div className="tableOrders__body">
                    {orders.map((order) => (
                        <div className="tableOrders__body--row" key={order.id}>
                            <div className="tableOrders__body--col">
                                {order.nombre}
                            </div>
                            <div className="tableOrders__body--col">
                                {order.qty}
                            </div>
                            <div className="tableOrders__body--col">
                                <IconButton
                                    color="inherit"
                                    onClick={() => onSubtract(order)}
                                >
                                    <RemoveCircleIcon />
                                </IconButton>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <Layout>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <TextField
                        id="description"
                        label="Description"
                        multiline
                        fullWidth
                        rows={1}
                        margin="normal"
                        value={description}
                        onChange={onChangeDescription}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <TextField
                        id="observation"
                        label="Observation"
                        multiline
                        margin="normal"
                        fullWidth
                        rows={1}
                        value={observation}
                        onChange={onChangeObservation}
                    />
                </Grid>
            </Grid>
            <br />
            <br />
            <br />
            <br />

            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <Select
                        id="client"
                        style={{ width: '100%' }}
                        value={client}
                        onChange={handleSelectClient}
                    >
                        {clientList &&
                            clientList.map((client) => (
                                <MenuItem value={client.id} key={client.id}>
                                    {client.nombres} {client.apellidos}
                                </MenuItem>
                            ))}
                    </Select>
                </Grid>
                <Grid item xs={4}>
                    <Select
                        id="plate"
                        style={{ width: '100%' }}
                        value={plate}
                        onChange={handleSelectPlate}
                    >
                        {plateList &&
                            plateList.map((plate) => (
                                <MenuItem key={plate.id} value={plate.id}>
                                    {plate.nombre}
                                </MenuItem>
                            ))}
                    </Select>
                </Grid>
                <Grid item xs={4}>
                    <IconButton color="inherit" onClick={onAddOrder}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <br />
            <br />
            <br />
            <br />
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Paper elevation={3}>
                        <div style={{ padding: '15px' }}>
                            {orders.length === 0 && (
                                <div>
                                    You haven't add any plate to your order yet
                                </div>
                            )}
                            {orders.length > 0 && renderOrders()}
                        </div>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <br />
                    <br />
                    <Button
                        fullWidth
                        onClick={onNewInvoice}
                        variant="contained"
                        color="primary"
                    >
                        Create Invoice
                    </Button>
                </Grid>
            </Grid>
        </Layout>
    );
}

export default InvoiceCreate;
