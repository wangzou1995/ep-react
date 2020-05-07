export interface CN35DataItem {
    id: number;
    batchCode: string;
    bigPackCode:string;
    printCount: number;
    remark: string;
    cn35Number: string;
    companyCode: string;
    bagCode: string;
    grossWeight: number;
    pics: number;
    destinationPort: string;
    supplierBatchCode: string;

}
export interface CN35Params {
    batchCode: string;
}