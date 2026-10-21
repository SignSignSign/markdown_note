const PREFIX = 'md-notes:'

/** 从 LocalStorage 读取 JSON 数据，异常时返回兜底值 */
export function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch (err) {
    console.error(`[storage] 读取 ${key} 失败`, err)
    return fallback
  }
}

/** 将数据以 JSON 形式写入 LocalStorage，异常时静默捕获 */
export function saveJSON<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch (err) {
    console.error(`[storage] 写入 ${key} 失败`, err)
  }
}
