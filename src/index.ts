// ------------------------------------------------------------------------------------------------
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  CreateAxiosDefaults,
} from 'axios';
// ------------------------------------------------------------------------------------------------
interface IErrorResponse {
  message?: string;
}
// ------------------------------------------------------------------------------------------------
function handleSuccess<T>({ data }: AxiosResponse<T>): T {
  return data;
}
// ------------------------------------------------------------------------------------------------
function handleError(error: AxiosError<IErrorResponse>): never {
  if (error.code === 'ERR_NETWORK') {
    throw new Error('Parece que no hay conexión con el servidor');
  }

  const status = error.response?.status;
  const statusMessages: Record<number, string> = {
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

  throw new Error(error.response?.data?.message ?? 'Error desconocido');
}
// ------------------------------------------------------------------------------------------------
export default function createAxiosInstance(
  baseURL: string,
  token?: string,
  options?: CreateAxiosDefaults
): AxiosInstance {
  const instance = axios.create({
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
