import { Title } from "@/components/general/Title";
import { getAllSkills } from "@/actions/getAllSkills";
import { getProfileInfo } from "@/actions/getProfileInfo";
import { SkillCard } from "@/components/skills/SkillCard";
import { SkillGroupHeading } from "@/components/skills/SkillGroupHeading";
import { SKILL_CATEGORIES } from "@/zod/skillsSchema";
import { ISkill } from "@/types/general";
import { Metadata } from "next";
import { buildPublicPageMetadata } from "@/utiles/site";
import { buildSkillsJsonLd } from "@/utiles/seo-schemas";

const description =
  "The frontend stack Mahmoud Mohamed works in day to day — React.js, Next.js, TypeScript, Vue.js, Redux, Zustand, TanStack Query and Tailwind CSS.";

export const metadata: Metadata = buildPublicPageMetadata({
  title: "Skills",
  description,
  path: "/skills",
  ogTitle: "Technical Skills | Mahmoud Mohamed — Frontend Engineer",
});

const UNGROUPED = "Other";

export default async function SkillsPage() {
  const [skills, profileInfo] = await Promise.all([
    getAllSkills(),
    getProfileInfo(),
  ]);
  const skillsData = skills || [];

  // Group in the order SKILL_CATEGORIES declares, so Frontend always leads and
  // the page does not reshuffle when a skill is added. Anything without a
  // category — every skill predates the field — falls into "Other".
  const groups = new Map<string, ISkill[]>();
  for (const skill of skillsData) {
    const key = skill.category?.trim() || UNGROUPED;
    const group = groups.get(key);
    if (group) group.push(skill);
    else groups.set(key, [skill]);
  }

  const ordered = [
    ...SKILL_CATEGORIES.filter((c) => groups.has(c)).map((c) => [
      c,
      groups.get(c)!,
    ]),
    // Any category typed in the dashboard that is not in the known list.
    ...[...groups.entries()].filter(
      ([key]) =>
        !SKILL_CATEGORIES.includes(key as (typeof SKILL_CATEGORIES)[number]),
    ),
  ] as [string, ISkill[]][];

  const jsonld = buildSkillsJsonLd(skillsData, profileInfo?.avatar);

  return (
    <div>
      <Title
        title="Skills"
        eyebrow="What I work with"
        count={skillsData.length}
      />

      <div className="space-y-12">
        {ordered.map(([category, items]) => (
          <section key={category}>
            <SkillGroupHeading category={category} count={items.length} />

            <div className="grid grid-cols-2 items-center justify-center gap-4 md:grid-cols-5 md:gap-6">
              {items.map((skill, index) => (
                <SkillCard key={skill._id} skill={skill} index={index} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonld),
        }}
      />
    </div>
  );
}
