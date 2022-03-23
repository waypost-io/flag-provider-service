const { flagManager } = require("../lib/flags.js");
const axios = require("axios");

jest.mock("axios");

let testFlags = [
  {
    name: "Test Flag 1",
    status: true,
    percentage_split: 50,
    hash_offset: 6,
    is_experiment: false,
    custom_assignment: { user123: true, user234: false },
  },
  {
    name: "Test Flag 2",
    status: true,
    percentage_split: 0,
    hash_offset: 12,
    is_experiment: true,
    custom_assignment: { user1234: false, user234: false },
  },
];

let mockFlag = [
  {
    name: "mock api flag",
    status: true,
    percentage_split: 20,
    hash_offset: 1,
    is_experiment: false,
    custom_assignment: { user123: true, user2345: false },
  },
];

beforeEach(() => {
  flagManager._flags = testFlags;
});

afterEach(() => {
  flagManager._flags = [];
});

test("Mock testing the fetch flags method", async () => {
  axios.get.mockResolvedValue({
    data: mockFlag,
  });

  await flagManager.fetchFlags();
  expect(flagManager._flags).toStrictEqual(mockFlag);
});

test("Testing whether the setFlags method sets the flags correctly", () => {
  // reset flags
  flagManager._flags = [];

  // set flags
  flagManager.setFlags(testFlags);
  const flags = [...flagManager._flags];

  expect(flags).toStrictEqual(testFlags);
});

test("Testing that the getFlags method returns the correct value", () => {
  const flags = flagManager.getFlags();

  expect(flags).toStrictEqual(testFlags);
});
