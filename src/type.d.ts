/** @format */

type AuthState = {
    user: {
        id: number;
        firstname: string;
        lastname: string;
        avatar: string;
        role: string;
        isVerified: boolean;
    } | null;

    role: string | null;
};

type SigninType = {
    email: string;
    password: string;
};

type InputType = {
    label: string;
    placeholder: string;
    error: string;
    touched: boolean;
    name: string;
    value: string | number;
    type: React.HTMLInputTypeAttribute;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
};

type PasswordInputType = {
    label: string;
    placeholder: string;
    error: string;
    touched: boolean;
    name: string;
    value: string | number;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
};
