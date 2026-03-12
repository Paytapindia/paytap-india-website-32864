
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ } from "@/data/faqData";
import React from "react";

interface FAQCategoryProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  faqs: FAQ[];
  sectionId: string;
}

const renderAnswer = (answer: string) => {
  const paragraphs = answer.split("\n\n");
  return paragraphs.map((block, i) => {
    const lines = block.split("\n");

    // Check if all lines are bullet points
    if (lines.every((l) => l.startsWith("• "))) {
      return (
        <ul key={i} className="list-disc list-inside space-y-1 my-2 text-muted-foreground">
          {lines.map((l, j) => (
            <li key={j}>{l.replace("• ", "")}</li>
          ))}
        </ul>
      );
    }

    // Check if all lines are numbered steps
    if (lines.every((l) => /^\d+\.\s/.test(l))) {
      return (
        <ol key={i} className="list-decimal list-inside space-y-1 my-2 text-muted-foreground">
          {lines.map((l, j) => (
            <li key={j}>{l.replace(/^\d+\.\s/, "")}</li>
          ))}
        </ol>
      );
    }

    return (
      <p key={i} className="text-muted-foreground my-2">
        {block}
      </p>
    );
  });
};

const FAQCategory = ({ title, description, icon, faqs, sectionId }: FAQCategoryProps) => {
  return (
    <div id={sectionId} className="scroll-mt-28">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="px-6">
              <AccordionTrigger className="text-left font-medium text-foreground">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                {renderAnswer(faq.answer)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQCategory;
