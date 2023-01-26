export type head = {
    id: keyof Data,
    label: string,
}

export const tableHeads: head[] = [
    {
        id: 'id',
        label: 'ID',
    },
    {
        id: 'firstName',
        label: 'Vorname',
    },
    {
        id: 'lastName',
        label: 'Nachname',
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

export interface Data {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    street: string,
    houseNo: number,
    city: string,
    postalCode: number,
    linkToDSGVO: string,
    createdBy: string,
}

export const data: Data[] = [
    {
        id: "1",
        firstName: "Max",
        lastName: "Mustermann",
        email: "mäxchentest@gmail.com",
        phone: "+401627364738",
        street: "Kielstr",
        houseNo: 3,
        city: "Lüneburg",
        postalCode: 21337,
        linkToDSGVO: "url2",
        createdBy: "Raphaela",
    },
    {
        id: "2",
        firstName: "Karl",
        lastName: "Schreiber",
        email: "karl@gmail.com",
        phone: "+40162dsf7338",
        street: "Streetname",
        houseNo: 9,
        city: "Hamburg",
        postalCode: 23476,
        linkToDSGVO: "url3",
        createdBy: "Raphaela",
    },
]