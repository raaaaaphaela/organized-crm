export type Information = {
    content: string,
    dateTime: string,
    username: string,
}

export type FormCustomer = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    street: string,
    houseNo: number,
    city: string,
    postalCode: number,
    linkToDSGVO: string,
    information: Information[],
    createdBy: string,
}