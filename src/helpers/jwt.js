/**
 * Декодировать JWT и вернуть payload
 * @param {string} token - JWT токен
 * @returns {object|null} - Возвращает payload или null, если токен невалидный
 */
export function getJwtPayload(token) {
    if (!token) return null;

    // Разбиваем токен на части (header, payload, signature)
    const parts = token.split(".");

    // Проверяем, что токен состоит из 3 частей
    if (parts.length !== 3) {
        console.error("Неверный JWT токен");
        return null;
    }

    try {
        // Декодируем payload, который находится в средней части
        let payload = parts[1]
            .replace(/-/g, "+") // Заменить '-' на '+'
            .replace(/_/g, "/") // Заменить '_' на '/'
            .replace(/=/g, ""); // Удалить символы '=' (если есть);

        // Декодируем base64 строку в JSON
        const decodedPayload = atob(payload);

        // Преобразуем строку JSON в объект
        return JSON.parse(decodedPayload);
    } catch (error) {
        console.error("Ошибка при декодировании JWT:", error);
        return null;
    }
}
