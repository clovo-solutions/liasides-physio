"use client";

import { useI18n } from "@/lib/i18n";
import { Legal } from "@/components/sections/Legal";

export default function PrivacyPolicy() {
  const { t } = useI18n();

  const sections = [
    { title: t.privacy.s1Title, content: t.privacy.s1Content },
    { title: t.privacy.s2Title, content: t.privacy.s2Content },
    { title: t.privacy.s3Title, content: t.privacy.s3Content },
    { title: t.privacy.s4Title, content: t.privacy.s4Content },
    { title: t.privacy.s5Title, content: t.privacy.s5Content },
    { title: t.privacy.s6Title, content: t.privacy.s6Content },
    { title: t.privacy.s7Title, content: t.privacy.s7Content },
  ];

  return (
    <Legal
      titleKey={t.privacy.title}
      lastUpdatedKey={t.privacy.lastUpdated}
      sections={sections}
    />
  );
}
