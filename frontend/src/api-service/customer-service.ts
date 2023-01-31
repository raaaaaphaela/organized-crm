import axios from "axios";
import {FormCustomer, Information} from "../customer-form";

export async function saveCustomer(customer: FormCustomer) {
    return axios.post("/api/customers", customer);
}

export async function deleteCustomer(id: string, information: Information) {
    return axios.post("/api/customers/info/" + id, information);
}

export async function savePDF(formData: FormData, customerId: string) {
    return axios({
        method: "post",
        url: "/api/files/upload",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
            "customerId": customerId
        },
    });
}

export async function downloadPDF(customer: FormCustomer) {
    await axios.get(
        "/api/files/download/" + customer.id,
        {
            responseType: "blob"
        }).then(response => {
        const file = new Blob(
            [response.data], {type: 'application/pdf'});

        const fileUrl = URL.createObjectURL(file);
        window.open(fileUrl);
    });
}