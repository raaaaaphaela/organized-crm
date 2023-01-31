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
    phone: string,
    street: string,
    houseNo: number,
    city: string,
    postalCode: number,
    information: Information[],
    createdBy: string,
}