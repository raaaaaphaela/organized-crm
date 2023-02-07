import {useState} from "react";
import {FormCustomer} from "../customer-form";

export default function useCsvUpload() {

    const [csvFile, setCsvFile] = useState();
    const [csvCustomerData, setCsvCustomerData] = useState<FormCustomer>();
    const fileReader = new FileReader();

    const handleOnChange = (e: any) => {
        setCsvFile(e.target.files[0]);
    };

    const csvFileToCustomer = async (input: string) => {
        const csvHeader: string[] = input.slice(0, input.indexOf("\n")).split(";");
        const csvRow: string[] = input.slice(input.indexOf("\n") + 1).split(";");

        const hashMap = new Map<string, string>();

        for (let i = 0; i < csvHeader.length; i++) {
            hashMap.set(csvHeader[i], csvRow[i]);
        }

        const customer: FormCustomer = {
            firstName: hashMap.get("firstName") || "",
            lastName: hashMap.get("lastName") || "",
            email: hashMap.get("email") || "",
            birthday: hashMap.get("birthday") || "",
            phone: hashMap.get("phone") || "",
            street: hashMap.get("street") || "",
            houseNo: hashMap.get("houseNo") || "",
            city: hashMap.get("city") || "",
            postalCode: hashMap.get("postalCode") || "",
            information: [],
            createdBy: ""
        };
        setCsvCustomerData(customer)
    }

    const handleOnSubmit = (e: any) => {
        e.preventDefault();

        if (csvFile) {
            fileReader.onload = function (event) {
                if (!event.target) return;

                const csvOutput: any = event.target.result;
                csvFileToCustomer(csvOutput);

            };

            fileReader.readAsText(csvFile);
        }
    };

    return {
        csvCustomerData,
        handleOnChange,
        handleOnSubmit
    }
}