import React, {FormEvent, useCallback, useEffect, useState} from "react";
import {FormCustomer, Information} from "../customer-form";
import {saveCustomer, savePDF} from "../api-service/customer-service";

const defaultCustomer: FormCustomer = {
    "firstName": "",
    "lastName": "",
    "email": "",
    "phone": "",
    "street": "",
    "houseNo": 0,
    "city": "",
    "postalCode": 0,
    "information": [],
    "createdBy": "",
}

export default function useFormForNewCustomer() {

    const [customer, setCustomer] = useState<FormCustomer>(defaultCustomer);
    const [errors, setErrors] = useState<string[]>([]);
    const [file, setFile] = useState<File>();
    const [information, setInformation] = useState<Information>(
        {
            content: "",
            dateTime: new Date()
                .toISOString()
                .substring(0, (new Date()
                    .toISOString()
                    .indexOf("T") | 0) + 6 | 0),
            username: ""
        }
    );

    useEffect(() => {
        setCustomer({
            ...customer,
            information: new Array(information)
        })
    }, [information])

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = e.target;
            setCustomer({...customer, [name]: value});
        },
        [customer, setCustomer]
    );

    const handleInformationChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {

            const value = e.target.value;
            setInformation({
                ...information,
                content: value
            });
        },
        [information, setInformation]
    );

    const save = (async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setErrors([]);

        // save the customer
        try {
            const response = await saveCustomer(customer);

            if (response.status === 200) {

                // save the file
                const customerId = response.data.id;

                const formData: any = new FormData();
                formData.append("file", file);

                try {
                    await savePDF(formData, customerId);
                } catch (error) {
                    console.log(error)
                }
            }
        } catch (e) {
            setErrors((errors) => [
                ...errors,
                "Invalid user data"
            ]);
            console.log(errors)
        }
    });

    return {
        customer,
        information,
        handleChange,
        handleInformationChange,
        setFile,
        save
    }
}