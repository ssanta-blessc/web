export default localStorageHelper = {
    /**
     * Получить значение по ключу из localStorage.
     * @param {string} key - Ключ для получения значения.
     * @returns {any|null} - Значение, связанное с ключом, или null, если ключ отсутствует.
     */
    get(key) {
        const value = localStorage.getItem(key);
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    },

    /**
     * Проверить, существует ли ключ в localStorage.
     * @param {string} key - Ключ для проверки.
     * @returns {boolean} - true, если ключ существует, иначе false.
     */
    has(key) {
        return localStorage.getItem(key) !== null;
    },

    /**
     * Удалить значение по ключу из localStorage.
     * @param {string} key - Ключ для удаления значения.
     */
    remove(key) {
        localStorage.removeItem(key);
    },

    /**
     * Добавить ключ и значение в localStorage.
     * @param {string} key - Ключ для сохранения.
     * @param {any} value - Значение для сохранения.
     */
    add(key, value) {
        const valueToStore = typeof value === "string" ? value : JSON.stringify(value);
        localStorage.setItem(key, valueToStore);
    },
};
