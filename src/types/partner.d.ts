/** @format */

export type TPartner = {
    id?: number;
    firstname: string;
    lastname: string;
    avatar: string;
    phone: string;
    email: string;
    bio: string;
    company: string;
};

export type TcreatePartnerType = {
    firstname?: string;
    lastname?: string;
    avatar: File | null;
    phone: string;
    email: string;
    bio: string;
    company: string;
};

export type TInitialStatePatner = {
    partners: Array<TPartner> | null;
};
