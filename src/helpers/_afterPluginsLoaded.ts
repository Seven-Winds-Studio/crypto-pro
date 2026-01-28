import { _extractMeaningfulErrorMessage } from './_extractMeaningfulErrorMessage';
// Импортируем встроенный плагин вместо npm пакета
import './cadesplugin_api.js';

type Unpromisify<T> = T extends Promise<infer R> ? R : T;

let isSetLogLevel = false;
let isPluginLoaded = false;

export const _afterPluginsLoaded = <T extends (...args: any[]) => any>(
  fn: T,
): ((...args: Parameters<T>) => Promise<Unpromisify<ReturnType<T>>>) => {
  const canPromise = Boolean(window.Promise);

  return async function (...args: Parameters<T>): Promise<Unpromisify<ReturnType<T>>> {
    if (!isPluginLoaded) {
      // Плагин уже загружен через import в начале файла
      // Проверяем, что он доступен
      if (!window.cadesplugin) {
        throw new Error('Не подключен модуль для работы с Cades plugin');
      }

      isPluginLoaded = true;
    }

    const { cadesplugin } = window;

    if (!canPromise) {
      throw new Error('Необходим полифилл для Promise');
    }

    if (!cadesplugin) {
      throw new Error('Не подключен модуль для работы с Cades plugin');
    }

    if (!isSetLogLevel) {
      cadesplugin.set_log_level(cadesplugin.LOG_LEVEL_ERROR);

      isSetLogLevel = true;
    }

    try {
      await cadesplugin;
    } catch (error) {
      console.error(error);

      throw new Error(
        _extractMeaningfulErrorMessage(error) || 'Ошибка при инициализации модуля для работы с Cades plugin',
      );
    }

    return await fn.apply(this, args);
  };
};
