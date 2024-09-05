import React, { useState } from "react";
import { ChevronUpIcon } from "@/app/shared/Icons/ChevronUpIcon";
import { ChevronDownIcon } from "@/app/shared/Icons/ChevronDownIcon";

const faqs = [
  {
    question: "What is Appcrons?",
    answer:
      "Appcrons is a tool designed to keep your backend servers on Render awake by sending automated HTTP requests at regular intervals. This prevents servers from entering an idle state, ensuring they remain responsive.",
    show: false,
  },
  {
    question: "How does Appcrons help with Render's free tier limits?",
    answer:
      "Appcrons allows you to set specific time frames for sending requests, helping you manage your 750-hour monthly allowance effectively. This ensures your servers stay within Render's free tier limits while remaining active.",
    show: false,
  },
  {
    question: "Can I customize the intervals at which requests are sent?",
    answer:
      "Yes, Appcrons lets you customize the frequency of requests, allowing you to choose intervals of 5, 10, or 15 minutes. You can also define active hours during which these requests should be sent.",
    show: false,
  },
  {
    question: "Does Appcrons support different time zones?",
    answer:
      "Yes, Appcrons supports multiple time zones. You can manage requests based on your local time zone, ensuring your applications remain active and responsive at the right times.",
    show: false,
  },
  {
    question: "Can I enable or disable requests for specific applications?",
    answer:
      "Absolutely. Appcrons allows you to easily enable or disable requests for individual applications, giving you full control over which servers receive automated requests.",
    show: false,
  },
  {
    question: "Is there a cost to use Appcrons?",
    answer: "Well, Appcrons is free to use and will remain free forever.",
    show: false,
  },
  {
    question: "How do I get started with Appcrons?",
    answer:
      "To get started, sign up for an account on the Appcrons website, register your backend instance hosted on Render, and configure your request intervals and active hours. Appcrons will take care of the rest.",
    show: false,
  },
  {
    question: "What if I need help using Appcrons?",
    answer:
      "If you need assistance, feel free to reach out to the creator via his socials, which can be found in the creator's section above.",
    show: false,
  },
];

type TQtnAns = {
  question: string;
  answer: string;
  show: boolean;
};

// Frequently asked questions
export const FAQ: React.FC = () => {
  const [qtnAnsList, setQtnAnsList] = useState<TQtnAns[]>(faqs);

  const showAnswerHandler = (index: number) => {
    const list: TQtnAns[] = JSON.parse(JSON.stringify(qtnAnsList));
    const qtnAns: TQtnAns = qtnAnsList[index];

    if (!qtnAns.show) {
      qtnAns.show = true;
      list[index] = qtnAns;
      setQtnAnsList(() => list);
      return;
    }

    qtnAns.show = false;
    list[index] = qtnAns;
    setQtnAnsList(() => list);
  };

  const showAns = (qAns: TQtnAns): boolean => qAns.show === true;

  return (
    <div className="w-full mt-16 space-y-16">
      <div className="w-full text-center space-y-2">
        <p className="text-3xl font-semibold">Frequently Asked Questions</p>
        <p className="text-color-text-secondary text-base">
          Find answers to common questions about Appcrons
        </p>
      </div>
      <div
        className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8 border-[1px]
         border-color-border-primary p-8 rounded-2xl transition-all"
      >
        {qtnAnsList.map((qtnAns, index) => (
          <div key={index} className="space-y-1">
            <div
              className="text-base text-color-text-primary text-start
              flex items-center justify-between"
            >
              <span>{qtnAns.question}</span>
              <div
                className="p-2 rounded-[50%] bg-color-bg-secondary
                cursor-pointer"
                onClick={() => showAnswerHandler(index)}
              >
                {showAns(qtnAns) ? (
                  <ChevronUpIcon
                    className="w-8 h-8 hover:text-primary 
                    animate-opacityZeroToFull"
                  />
                ) : (
                  <ChevronDownIcon
                    className="w-8 h-8 hover:text-primary 
                    animate-opacityZeroToFull"
                  />
                )}
              </div>
            </div>
            {showAns(qtnAns) && (
              <div
                className="w-full bg-color-bg-secondary rounded-xl relative
                before:absolute before:top-0 before:left-0 before:w-2
                before:h-full before:rounded-l-2xl before:bg-secondary
                before:animate-heightZeroToFull shadow"
              >
                <p
                  className="text-start text-base text-color-text-secondary
                  bg-color-bg-secondary rounded-2xl p-4 pl-6"
                >
                  {qtnAns.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
