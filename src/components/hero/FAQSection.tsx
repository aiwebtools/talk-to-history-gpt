
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={toggleOpen}
        className="flex items-center justify-between w-full py-4 text-left transition-colors hover:text-accent"
      >
        <h3 className="text-lg font-medium">{question}</h3>
        <span className="flex-shrink-0 ml-2">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
        )}
      >
        <p className="text-white/70">{answer}</p>
      </div>
    </div>
  );
};

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const faqs = [
    {
      question: "How accurate are the historical conversations?",
      answer: "The conversations are based on historical records, writings, and knowledge about each figure, but they are AI-generated simulations. While we strive for accuracy, the responses should be considered interpretations rather than exact quotations."
    },
    {
      question: "Can I talk to any historical figure?",
      answer: "We offer a curated selection of significant historical figures from various time periods and fields. We regularly add new personalities based on user interest and available historical information."
    },
    {
      question: "How does Talk to History GPT work?",
      answer: "Talk to History uses advanced AI language models trained on historical data to simulate conversations with historical figures. The AI analyzes your questions and generates responses that aim to reflect the known views, speech patterns, and knowledge of each historical personality."
    },
    {
      question: "Can I use this for educational purposes?",
      answer: "Absolutely! Talk to History is designed to be an educational tool that makes learning about historical figures more engaging and interactive. Many educators use it as a supplement to traditional history lessons."
    },
    {
      question: "Is my conversation data private?",
      answer: "We respect your privacy. While anonymized conversation data may be collected to improve the AI models, we don't store personal information with your conversations, and your interactions are not publicly shared."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-20 mb-12 smooth-fade-in animation-delay-600">
      <h3 className="text-2xl font-serif font-medium mb-8">Frequently Asked Questions</h3>
      
      <div className="bg-secondary/30 rounded-xl p-4 md:p-6 backdrop-blur-sm border border-white/10">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            toggleOpen={() => toggleFAQ(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
