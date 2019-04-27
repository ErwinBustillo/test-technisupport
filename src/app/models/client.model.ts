export interface Client{
    id?: string,
    name: string,
    last_name: string,
    doc_type: string,
    doc_number: number,
    birth_date: Date,
    observation?: string
}