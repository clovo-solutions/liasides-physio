"use client";

import { useRef } from "react";
import { clsx } from "clsx";
import { useI18n } from "@/lib/i18n";
import { useInView } from "@/lib/useInView";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpecialistCard } from "@/components/ui/SpecialistCard";
import { Icon } from "@/components/ui/Icon";
import type { TeamMember } from "@/lib/types";

interface TeamProps {
  data: TeamMember[];
}

export function Team({ data }: TeamProps) {
  const { t } = useI18n();
  const trackRef = useRef<HTMLDivElement>(null);
  const { ref, isInView } = useInView();

  if (!data || data.length === 0) {
    return null;
  }

  const scrollByPage = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.8, 300);
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <SectionWrapper id="team">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
        <SectionHeading
          eyebrow={t.team.sectionLabel}
          title={t.team.headline}
          subtitle={t.team.subheadline}
          align="left"
        />

        {/* Desktop navigation arrows */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            aria-label={t.team.prev}
            className="w-11 h-11 rounded-full border border-brand-200 bg-white text-brand-700 flex items-center justify-center hover:bg-brand-50 hover:border-brand-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            <Icon name="arrow-left" className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            aria-label={t.team.next}
            className="w-11 h-11 rounded-full border border-brand-200 bg-white text-brand-700 flex items-center justify-center hover:bg-brand-50 hover:border-brand-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            <Icon name="arrow-right" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scroll-snap carousel: native swipe on touch, arrow-driven on desktop */}
      <div ref={ref}>
        <div
          ref={trackRef}
          className={clsx(
            "no-scrollbar snap-track flex gap-5 overflow-x-auto pb-4 -mx-5 px-5 sm:mx-0 sm:px-0 stagger",
            isInView && "in-view"
          )}
          role="region"
          aria-label={t.team.headline}
        >
          {data.map((member) => (
            <div
              key={member.id}
              className={clsx("anim-fade-up", isInView && "in-view")}
            >
              <SpecialistCard member={member} />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
