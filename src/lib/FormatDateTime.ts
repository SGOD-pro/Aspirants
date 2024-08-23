export function dateTime(date: Date | string): string | null {
	if (!date) return null;
    const dateObj = new Date(date);
	const day = String(dateObj.getDate()).padStart(2, "0");
	const month = String(dateObj.getMonth() + 1).padStart(2, "0");
	const year = String(dateObj.getFullYear()).slice(-2);
	const hours = String(dateObj.getHours()).padStart(2, "0");
	const minutes = String(dateObj.getMinutes()).padStart(2, "0");

	return`${day}/${month}/${year} ${hours}:${minutes}`;
}
