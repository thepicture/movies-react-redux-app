export class JSONLocalStorage {
  static set<T>(key: string, json: T) {
    localStorage.setItem(key, JSON.stringify(json));
  }

  static doesExist(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  static pushToArray<T>(key: string, item: T): void {
    const array: T[] = JSON.parse(localStorage.getItem(key)!);

    array.push(item);

    this.set(key, array);
  }

  static removeFromArray<T>(key: string, item: T): void {
    const array: T[] = JSON.parse(localStorage.getItem(key)!);

    this.set(
      key,
      array.filter((array) => array !== item)
    );
  }

  static get<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key)!);
  }
}
