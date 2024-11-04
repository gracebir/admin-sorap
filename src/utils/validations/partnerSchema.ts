/** @format */
import * as yup from "yup";

export const partnerSchema = yup.object().shape({
    firstname: yup
        .string()
        .optional()
        .min(2, "Le nom doit comporter au moins 2 caractères")
        .max(50, "Le nom ne doit pas dépasser 50 caractères"),

    lastname: yup
        .string()
        .optional()
        .min(2, "Le nom de famille doit comporter au moins 2 caractères")
        .max(50, "Le nom de famille ne doit pas dépasser 50 caractères"),
    company: yup
        .string()
        .required("Nom de la companie")
        .min(2, "Le Nom de la companie doit comporter au moins 2 caractères")
        .max(50, "Le Nom de la companie ne doit pas dépasser 50 caractères"),
    phone: yup
        .string()
        .required("Le numéro de téléphone est requis")
        .matches(
            /^[0-9]+$/,
            "Le numéro de téléphone doit contenir uniquement des chiffres"
        )
        .min(10, "Le numéro de téléphone doit comporter au moins 10 chiffres")
        .max(15, "Le numéro de téléphone ne doit pas dépasser 15 chiffres"),

    email: yup
        .string()
        .required("L'adresse email est requise")
        .email("L'adresse email doit être valide"),
});
