import { JSONLocalStorage } from "./JSONLocalStorage";

describe("JSONLocalStorage", () => {
  it("should throw null on non-existing key", () => {
    const thrower = () => JSONLocalStorage.get("new Date()");

    expect(thrower).toThrow(Error);
  });

  it("should not throw on existing key", () => {
    const expected = "1,2";
    const key = "__key__";
    JSONLocalStorage.set(key, [1, 2]);

    const actual = JSONLocalStorage.get<number[]>(key).toString();

    expect(actual).toBe(expected);
  });

  it("doesExist should return true for __key__", () => {
    const expected = true;
    const key = "__key__";
    JSONLocalStorage.set(key, [1, 2]);

    const actual = JSONLocalStorage.doesExist(key);

    expect(actual).toBe(expected);
  });

  it("set does not throw", () => {
    JSONLocalStorage.set(new Date().toString(), [1, 2]);
    JSONLocalStorage.set(new Date().toString(), [1, 2]);
    JSONLocalStorage.set(new Date().toString(), [1, 2]);
    JSONLocalStorage.set(new Date().toString(), [1, 2]);

    expect(true).toBe(true);
  });

  it("returns 1,2,3 after pushing 1,2,3 to array", () => {
    const expected = "1,2,3";
    const key = "__key__";
    JSONLocalStorage.set(key, []);

    JSONLocalStorage.pushToArray(key, 1);
    JSONLocalStorage.pushToArray(key, 2);
    JSONLocalStorage.pushToArray(key, 3);
    const actual = JSONLocalStorage.get<number[]>(key).toString();

    expect(actual).toBe(expected);
  });

  it("returns 1,2 after pushing 1,2,3 to array and removing 3", () => {
    const expected = "1,2";
    const key = "__key__";
    JSONLocalStorage.set(key, []);

    JSONLocalStorage.pushToArray(key, 1);
    JSONLocalStorage.pushToArray(key, 2);
    JSONLocalStorage.pushToArray(key, 3);
    JSONLocalStorage.removeFromArray(key, 3);
    const actual = JSONLocalStorage.get<number[]>(key).toString();

    expect(actual).toBe(expected);
  });
});
