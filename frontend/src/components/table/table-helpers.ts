import {Customer} from "../../pages/HomePage";

export type head = {
    id: keyof Customer,
    label: string,
}

export const tableHeads: head[] = [
    {
        id: 'lastName',
        label: 'Nachname',
    },
    {
        id: 'firstName',
        label: 'Vorname',
    },
    {
        id: 'email',
        label: 'E-Mail',
    },
    {
        id: 'phone',
        label: 'Telefon',
    },
    {
        id: 'street',
        label: 'Straße',
    },
    {
        id: 'houseNo',
        label: 'HausNr.',
    },
    {
        id: 'city',
        label: 'Stadt',
    },
    {
        id: 'postalCode',
        label: 'PLZ',
    },
    {
        id: 'linkToDSGVO',
        label: 'DSGVO',
    },
    {
        id: 'createdBy',
        label: 'Ersteller',
    },
]
