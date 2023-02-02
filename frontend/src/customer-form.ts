export type Information = {
    content: string,
    dateTime: string,
    username: string,
}

export type FormCustomer = {
    id?: string,
    firstName: string,
    lastName: string,
    email: string,
    birthday: string,
    phone: string,
    street: string,
    houseNo: number | string,
    city: string,
    postalCode: number | string,
    information: Information[],
    createdBy: string,
}