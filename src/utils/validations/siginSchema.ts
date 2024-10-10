/** @format */

import * as yup from "yup";

export const signinSchema = yup.object().shape({
    email: yup
        .string()
        .email("Dois etre un addresse email")
        .required("Entrer addresse email"),
    password: yup.string().required("Entrer le mot de passe"),
});
