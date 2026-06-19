"use client";

import Image from "next/image";
import type { TeamMember } from "@/lib/types";

interface SpecialistCardProps {
  member: TeamMember;
}

export function SpecialistCard({ member }: SpecialistCardProps) {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <article className="snap-item shrink-0 w-[270px] sm:w-[300px] group">
      <div className="card-surface overflow-hidden h-full flex flex-col group-hover:-translate-y-1">
        {/* Photo / initials avatar */}
        <div className="relative aspect-[4/5] overflow-hidden bg-brand-100">
          {member.image ? (
            <Image
              src={member.image}
              alt={`${member.name} — ${member.role}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 270px, 300px"
            />
          ) : (
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-100 via-brand-200 to-brand-300"
            >
              <span className="font-display text-5xl font-semibold text-brand-600/80">
                {initials}
              </span>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-brand-950/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Details */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-display text-lg font-semibold text-brand-900 leading-tight">
            {member.name}
          </h3>
          <p className="text-sm font-medium text-accent-700 mt-0.5 mb-3">
            {member.role}
          </p>
          <p className="text-sm text-ink-secondary leading-relaxed flex-1">
            {member.bio}
          </p>

          {member.specialties && member.specialties.length > 0 && (
            <ul className="flex flex-wrap gap-1.5 mt-4">
              {member.specialties.map((s) => (
                <li
                  key={s}
                  className="text-xs font-medium text-brand-700 bg-brand-50 border border-brand-100 rounded-full px-2.5 py-1"
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
}
