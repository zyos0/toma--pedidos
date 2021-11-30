import React from 'react';
import { Client } from '../../../types/Client';
import { ListItemComponent } from '../../CustomList/CustomList';
import {
    Avatar,
    IconButton,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
} from '@mui/material';
import { Delete, Edit, Fastfood } from '@mui/icons-material';

const ClientListItem: React.FC<ListItemComponent<Client>> = ({
    item,
    onUpdate,
    onDelete,
}) => {
    return (
        <ListItem key={item.id}>
            <Avatar>
                <Fastfood />
            </Avatar>
            <ListItemText
                primary={`${item.nombres} ${item.apellidos}`}
                secondary={`Birthdate: ${item.fechaNac}`}
            />

            <ListItemSecondaryAction>
                <IconButton onClick={() => onUpdate(item)}>
                    <Edit />
                </IconButton>

                <IconButton onClick={() => onDelete(item)}>
                    <Delete />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default ClientListItem;
