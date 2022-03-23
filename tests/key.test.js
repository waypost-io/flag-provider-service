const { keyManager } = require("../lib/key.js");
const axios = require("axios");

jest.mock("axios");

const testKey = "12345";

beforeEach(() => {
  keyManager._key = "1111";
});

test("Mock testing the fetch key method", async () => {
  axios.get.mockResolvedValue({ data: "abc123" });

  await keyManager.fetchKey();
  expect(keyManager._key).toEqual("abc123");
});

test("Testing whether the setKey method sets the key correctly", () => {
  // reset key
  keyManager._key = "";

  // set key
  keyManager.setKey(testKey);
  const key = keyManager._key;

  expect(key).toEqual(testKey);
});

test("Testing that the getKey method returns the correct value", () => {
  const key = keyManager.getKey();
  expect(key).toEqual("1111");
});
