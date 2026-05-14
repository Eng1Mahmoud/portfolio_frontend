import { describe, expect, test } from "vitest";
import { contactUsSchema } from "@/zod/contactUsSchema";

const validPayload = {
  userName: "Alex",
  email: "alex@example.com",
  phone: "+1 234 567 8900",
  message: "Hello there",
};

describe("contactUsSchema", () => {
  test("accepts a valid payload", () => {
    const result = contactUsSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validPayload);
    }
  });

  test.each([
    ["userName", { ...validPayload, userName: "" }, "Name is required"],
    ["email (empty)", { ...validPayload, email: "" }, "Email is required"],
    ["phone", { ...validPayload, phone: "" }, "Phone is required"],
    ["message", { ...validPayload, message: "" }, "Message is required"],
  ] as const)(
    "rejects when %s is empty",
    (_label, payload, expectedMessage) => {
      const result = contactUsSchema.safeParse(payload);
      expect(result.success).toBe(false);
      if (!result.success) {
        const messages = result.error.issues.map((i) => i.message);
        expect(messages).toContain(expectedMessage);
      }
    },
  );

  test('rejects invalid email with "Invalid email"', () => {
    const result = contactUsSchema.safeParse({
      ...validPayload,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = result.error.issues.map((i) => i.message);
      expect(messages).toContain("Invalid email");
    }
  });
});
