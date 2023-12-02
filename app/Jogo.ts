export interface Jogo {
    id?: number,
    nome: string,
    link: string,
    classificacao: string,
    descricao: string,
    empresa_id: number,
    created_at?: string,
    updated_at?: string;
}