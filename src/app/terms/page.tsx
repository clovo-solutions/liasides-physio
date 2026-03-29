"use client";

import { useI18n } from "@/lib/i18n";
import { Legal } from "@/components/sections/Legal";

export default function TermsOfService() {
  const { t } = useI18n();

  const sections = [
    { title: t.terms.s1Title, content: t.terms.s1Content },
    { title: t.terms.s2Title, content: t.terms.s2Content },
    { title: t.terms.s3Title, content: t.terms.s3Content },
    { title: t.terms.s4Title, content: t.terms.s4Content },
    { title: t.terms.s5Title, content: t.terms.s5Content },
    { title: t.terms.s6Title, content: t.terms.s6Content },
    { title: t.terms.s7Title, content: t.terms.s7Content },
  ];

  return (
    <Legal
      titleKey={t.terms.title}
      lastUpdatedKey={t.terms.lastUpdated}
      sections={sections}
    />
  );
}
