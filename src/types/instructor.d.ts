/** @format */

export type TinstructorType = {
    id?: number;
    firstname: string;
    lastname: string;
    avatar: string;
    phone: string;
    email: string;
    bio: string;
};

export type TcreateInstructorType = {
    firstname: string;
    lastname: string;
    avatar: File | null;
    phone: string;
    email: string;
    bio: string;
};

export type TResponseInstructorType = {
    statusCode: number;
    status: string;
    message: string;
    data: Array<TinstructorType>;
};

export type TInitialStateType = {
    instructor: Array<TinstructorType> | null;
};
