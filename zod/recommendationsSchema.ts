import { z } from "zod";

/**
 * How the recommender knows me. Not everyone on the page is a colleague —
 * some are university friends, some came from freelance contracts — so the
 * public page groups by this instead of by company.
 *
 * Spelled out rather than shortened: "Team Member" and "College Friend" say
 * what the tab means on their own, where "Colleague" and "Classmate" leave a
 * visitor guessing whether the two overlap.
 * Keep in sync with the enum on the backend model.
 */
export const RECOMMENDATION_RELATIONS = [
  "Manager",
  "Team Member",
  "Freelance",
  "College Friend",
] as const;

export type RecommendationRelation = (typeof RECOMMENDATION_RELATIONS)[number];

export const recommendationsSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  /** Empty for college friends and most freelance clients. */
  company: z.string().optional(),
  avatar: z.string().url("Invalid URL").optional().or(z.literal("")),
  text: z.string().min(1, "Recommendation text is required"),
  // The dashboard select starts empty, and the default enum message for "" is
  // the whole list of options — say what is actually wrong instead.
  relation: z.enum(RECOMMENDATION_RELATIONS, {
    errorMap: () => ({ message: "Relationship is required" }),
  }),
  /** ISO date the recommendation was written, e.g. "2026-01-26". */
  date: z.string().optional(),
  linkedinUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  /** Pins the entry to the top of its group and onto the home page. */
  featured: z.boolean().optional(),
  /**
   * Manual position, lowest first. Left blank the backend stores
   * DEFAULT_RECOMMENDATION_ORDER, so an untouched entry sits behind everything
   * given an explicit number and keeps falling back to featured-then-newest.
   *
   * `z.literal("")` has to come first: `z.coerce.number()` happily turns an
   * empty input into 0, which would silently mean "show this first".
   */
  order: z
    .union([
      z.literal(""),
      z.coerce.number().int("Order must be a whole number").min(0),
    ])
    .optional(),
});

export type TrecommendationsSchema = z.infer<typeof recommendationsSchema>;
