/** @format */

import { TCreateEventInput, TModerator } from "@/types/event";

export function formatNumber(num: number) {
    if (num >= 1000) {
        return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + "k";
    }
    return num.toString();
}

export function formatRate(rate: number) {
    return (rate * 100).toFixed(0) + "%";
}

export const createEventFormData = (input: TCreateEventInput): FormData => {
    const formData = new FormData();

    // Append each field from TCreateEventInput to the FormData
    formData.append("theme", input.theme);
    formData.append("description", input.description);
    formData.append("start_date", input.start_date); // Convert Date to string
    formData.append("end_date", input.end_date); // Convert Date to string
    formData.append("location", input.location);
    formData.append("price", input.price.toString()); // Convert number to string
    formData.append("thumbnail", input.thumbnail!); // Blob (File)
    formData.append("eventType", input.eventType);

    return formData;
};

export const createModeratorFormData = (input: TModerator): FormData => {
    const formData = new FormData();

    // Append each field from TCreateEventInput to the FormData
    formData.append("firstname", input.firstname);
    formData.append("lastname", input.lastname);
    formData.append("bio", input.bio); // Convert Date to string
    formData.append("eventId", input.eventId?.toString()!); // Convert Date to string
    formData.append("avatar", input.avatar!);
    formData.append("phone", input.phone); // Convert number to string
    formData.append("email", input.email); // Blob (File)

    return formData;
};

export function formatDateTimeToFrench(dateString: string): string {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
    }

    const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const timeFormatter = new Intl.DateTimeFormat("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
    });

    const formattedDate = dateFormatter.format(date);
    const formattedTime = timeFormatter.format(date);

    return `${formattedDate} - ${formattedTime}`;
}
