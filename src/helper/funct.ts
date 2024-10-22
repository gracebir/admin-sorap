/** @format */

import { TCreateEventInput } from "@/types/event";

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
    formData.append("start_date", input.start_date.toISOString()); // Convert Date to string
    formData.append("end_date", input.end_date.toISOString()); // Convert Date to string
    formData.append("location", input.location);
    formData.append("price", input.price.toString()); // Convert number to string
    formData.append("thumbnail", input.thumbnail!); // Blob (File)
    formData.append("eventType", input.eventType);

    return formData;
};
