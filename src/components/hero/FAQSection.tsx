
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
      question: "Can I talk to any historical figure?",
      answer: "Yes, there are no limitations. You can talk to any historical figure from any time period, not just the ones featured on our site. The AI is capable of simulating conversations with virtually anyone from history."
    },
    {
      question: "How does Talk to History GPT work?",
      answer: "Talk to History is powered by GPT-4o, OpenAI's most advanced AI model. It simulates conversations with historical figures by drawing on vast amounts of historical knowledge and contextual understanding to create realistic and informative responses that reflect the known views, speech patterns, and knowledge of historical personalities."
    },
    {
      question: "How accurate are the historical conversations?",
      answer: "While powered by GPT-4o with extensive historical knowledge, these are still AI-generated simulations. The responses aim to reflect known historical views and information about each figure, but should be considered interpretations rather than exact historical quotes. For academic research, we recommend verifying information with primary sources."
    },
    {
      question: "Can I use this for educational purposes?",
      answer: "Absolutely! Talk to History is designed to be an engaging educational tool that makes learning about historical figures interactive and accessible. Many educators use it to supplement traditional history lessons and spark student interest in historical topics."
    },
    {
      question: "Is my conversation data private?",
      answer: "Yes, your conversations are entirely private. While using the tool, your interactions are subject to OpenAI's privacy policy, but we do not collect or store your conversation data for our own purposes."
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
