export interface Todo {
    id: number;
    title: string;
    user_id: string;
}

export interface Kakeibo {
    id: number;
    title: string;
    isIncome: boolean;
    date: string;
    amount: number;
    user_id: string;
}