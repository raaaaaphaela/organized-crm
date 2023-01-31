import axios from "axios";
import {FormCustomer, Information} from "../customer-form";

export async function saveCustomer(customer: FormCustomer) {
    return axios.post("/api/customers", customer);
}

export async function deleteCustomer(id: string, information: Information) {
    return axios.post("/api/customers/info/" + id, information);
}

export async function getCustomer(id: string) {
    return await axios.get("/api/customers/" + id);
}

export async function getAllCustomers() {
    return await axios.get("/api/customers");
}