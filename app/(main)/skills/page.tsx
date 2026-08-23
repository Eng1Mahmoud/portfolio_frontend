import { Title } from "@/components/general/Title";
import { getAllSkills } from "@/actions/getAllSkills";
import { SkillCard } from "@/components/skills/SkillCard";
import { SKILL_CATEGORIES } from "@/zod/skillsSchema";
import { ISkill } from "@/types/general";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills",
  description: "Skills Mahmoud Mohamed",
};

const UNGROUPED = "Other";

export default async function SkillsPage() {
  const skills = (await getAllSkills()) || [];

  // Group in the order SKILL_CATEGORIES declares, so Frontend always leads and
  // the page does not reshuffle when a skill is added. Anything without a
  // category — every skill predates the field — falls into "Other".
  const groups = new Map<string, ISkill[]>();
  for (const skill of skills) {
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

  return (
    <div>
      <Title title="Skills" eyebrow="What I work with" count={skills.length} />

      <div className="space-y-12">
        {ordered.map(([category, items]) => (
          <section key={category}>
            <div className="mb-5 flex items-center gap-4">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-300">
                {category}
              </h2>
              <span className="font-mono text-[11px] text-ink-muted">
                {items.length}
              </span>
              {/* Rule fills the remaining width, tying the heading to the row
                  of cards beneath it. */}
              <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
            </div>

            <div className="grid grid-cols-2 items-center justify-center gap-4 md:grid-cols-5 md:gap-6">
              {items.map((skill, index) => (
                <SkillCard key={skill._id} skill={skill} index={index} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
