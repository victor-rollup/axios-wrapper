"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createAxiosClient;
// ------------------------------------------------------------------------------------------------
const axios_1 = require("axios");
// ------------------------------------------------------------------------------------------------
function handleSuccess({ data }) {
    return data;
}
// ------------------------------------------------------------------------------------------------
function handleError(error) {
    var _a, _b, _c, _d;
    if (error.code === 'ERR_NETWORK') {
        throw new Error('Parece que no hay conexión con el servidor');
    }
    const status = (_a = error.response) === null || _a === void 0 ? void 0 : _a.status;
    const statusMessages = {
        401: 'No autorizado, inicia sesión nuevamente',
        403: 'Acceso denegado',
        404: 'Recurso no encontrado',
        429: 'Ha expirado la sesión',
    };
    if (status && statusMessages[status]) {
        throw new Error(statusMessages[status]);
    }
    if (status && status >= 500) {
        throw new Error('Error interno del servidor');
    }
    const apiMessage = (_d = (_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) !== null && _d !== void 0 ? _d : 'Error desconocido';
    throw new Error(apiMessage);
}
// ------------------------------------------------------------------------------------------------
function createAxiosClient(baseURL, token, options) {
    const instance = axios_1.default.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        timeout: 3000,
        ...options,
    });
    instance.interceptors.response.use(handleSuccess, handleError);
    return instance;
}
// ------------------------------------------------------------------------------------------------
