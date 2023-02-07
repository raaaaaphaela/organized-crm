import React, {FormEvent, useCallback, useState} from "react";
import {FormCustomer} from "../customer-form";
import {updateCustomer} from "../api-service/customer-service";
import {toast} from "react-toastify";

export default function useFormForExistingCustomer(existingCustomer: FormCustomer) {

    const [customer, setCustomer] = useState<FormCustomer>(existingCustomer);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = e.target;
            setCustomer({...customer, [name]: value});
        },
        [customer, setCustomer]
    );

    const save = (async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // save the customer
        try {
            await updateCustomer(customer);
            toast.success("Erfolgreich geändert!")
        } catch (e) {
            toast.error("Ungültige Eingaben...")
        }
    });

    return {
        customer,
        handleChange,
        save
    }
}