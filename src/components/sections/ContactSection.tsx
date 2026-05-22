import { Section } from "@/components/ui/Section";
import { ContactForm } from "./ContactForm";

type ContactSectionProps = {
  title: string;
};

export function ContactSection({ title }: ContactSectionProps) {
  return (
    <Section id="contact">
      <ContactForm
        title={title}
        intro="Interested in Field CTO, AI adoption strategy, or a conversation about how your team can ship faster with Cursor? Send a note."
      />
    </Section>
  );
}
