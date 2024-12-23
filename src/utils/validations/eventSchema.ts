/** @format */

import * as yup from "yup";

export const moderatorSchema = yup.object({
    firstname: yup
        .string()
        .required("Le nom est requis")
        .min(2, "Le nom doit comporter au moins 2 caractères")
        .max(50, "Le nom ne doit pas dépasser 50 caractères"),

    lastname: yup
        .string()
        .required("Le nom de famille est requis")
        .min(2, "Le nom de famille doit comporter au moins 2 caractères")
        .max(50, "Le nom de famille ne doit pas dépasser 50 caractères"),

    bio: yup
        .string()
        .required("La biographie est requise")
        .min(10, "La biographie doit comporter au moins 10 caractères")
        .max(500, "La biographie ne doit pas dépasser 500 caractères"),

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

export const EventSponsorSchema = yup.object().shape({
    amount: yup.number().optional(),
    note: yup.string().optional(),
});
