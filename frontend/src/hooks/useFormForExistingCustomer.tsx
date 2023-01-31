import React, {FormEvent, useCallback, useState} from "react";
import {FormCustomer} from "../customer-form";
import {saveCustomer} from "../api-service/customer-service";

export default function useFormForExistingCustomer(existingCustomer: FormCustomer) {

    const [customer, setCustomer] = useState<FormCustomer>(existingCustomer);
    const [errors, setErrors] = useState<string[]>([]);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = e.target;
            setCustomer({...customer, [name]: value});
        },
        [customer, setCustomer]
    );

    const save = (async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setErrors([]);

        // save the customer
        try {
            await saveCustomer(customer);
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
        handleChange,
        save
    }
}