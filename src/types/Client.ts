import { ListItemInterface } from "../components/CustomList/CustomList";

export interface Client extends ListItemInterface {
    id: number | string;
    nombres: string;
    apellidos: string;
    fechaNac: string;
}
