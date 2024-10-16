/** @format */

export type TcreateProgramEntry = {
    title: string;
    description: string;
    edition: string;
    thumbnail: string;
    price?: number;
    date_from: Date;
    date_to: Date;
};

export type TprogramType = {
    title: string;
    description: string;
    edition: string; // Unique constraint
    images?: string[]; // Optional, defaults to an empty array
    thumbnail: string;
    price?: number; // Optional, defaults to 0
    date_from: Date;
    date_to: Date;
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
