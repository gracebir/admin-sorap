/** @format */

export type TcreateProgramEntry = {
    title: string;
    description: string;
    edition: string;
    programCategory: string;
    location: string;
    thumbnail: File | null;
    price?: number;
    date_from: string;
    date_to: string;
};

export type TprogramType = {
    id?: number;
    title: string;
    description: string;
    edition: string; // Unique constraint
    images?: string[]; // Optional, defaults to an empty array
    thumbnail: string;
    price?: number; // Optional, defaults to 0
    date_from: string;
    isLaunched: boolean;
    date_to: string;
};

export type TprogramState = {
    programs: Array<TprogramType> | null;
};

export type TprogramReponse = {
    status: string;
    message: string;
    data: Array<TprogramType>;
};

export type TsponsorInput = {
    sponsorId: number;
    userId: number;
};

export type TsponsorState = {
    sponsor: any;
};

export type TtutorInput = {
    programId: number;
    instructorId: number;
};

export type TtutorResponse = {
    status: string;
    message: string;
    data: Array<{
        programId: number;
        instructor: {
            firstname: string;
            lastname: string;
        };
        program: {
            title: string;
            description: string;
            id: number;
            thumbnail: string;
        };
    }>;
};
