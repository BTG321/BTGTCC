export interface Empresa {
    id?: number,
    nome: string,
    senha: string,
    email: string,
    numero_de_contato: string,
    cpf: string,
    cnpj: string,
    empresa_id: number,
    created_at?: string,
    updated_at?: string;
}