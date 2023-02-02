import axios from "axios";
import {FormCustomer, Information} from "../customer-form";

export async function saveCustomer(customer: FormCustomer) {
    return await axios.post("/api/customers", customer);
}

export async function updateCustomer(customer: FormCustomer) {
    return await axios.put("/api/customers", customer);
}

export async function deleteCustomer (id: string) {
    return await axios.delete("/api/customers/" + id);
}

export async function saveInformation(id: string, information: Information) {
    return await axios.post("/api/customers/info/" + id, information);
}

export async function getCustomer(id: string) {
    return await axios.get("/api/customers/" + id);
}

export async function getAllCustomers() {
    return await axios.get("/api/customers");
}