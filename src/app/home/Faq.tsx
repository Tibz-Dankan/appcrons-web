import React, { useState } from "react";
import { ChevronUpIcon } from "@/app/shared/Icons/ChevronUpIcon";
import { ChevronDownIcon } from "@/app/shared/Icons/ChevronDownIcon";

// Frequently asked questions
export const FAQ: React.FC = () => {
  const [showAnswer, setShowAnswer] = useState({ show: false, index: -1 });

  const showAnswerHandler = (index: number) => {
    if (showAnswer.show) {
      setShowAnswer({
        show: true,
        index: index,
      });
    } else {
      setShowAnswer({
        show: false,
        index: index,
      });
    }
  };

  const showAns = (index: number) =>
    showAnswer.show === true && showAnswer.index === index;

  const faqs = [
    {
      question: "What is Appcrons?",
      answer:
        "Appcrons is a tool designed to keep your backend servers on Render awake by sending automated HTTP requests at regular intervals. This prevents servers from entering an idle state, ensuring they remain responsive.",
    },
    {
      question: "How does Appcrons help with Render's free tier limits?",
      answer:
        "Appcrons allows you to set specific time frames for sending requests, helping you manage your 750-hour monthly allowance effectively. This ensures your servers stay within Render's free tier limits while remaining active.",
    },
    {
      question: "Can I customize the intervals at which requests are sent?",
      answer:
        "Yes, Appcrons lets you customize the frequency of requests, allowing you to choose intervals of 5, 10, or 15 minutes. You can also define active hours during which these requests should be sent.",
    },
    {
      question: "Does Appcrons support different time zones?",
      answer:
        "Yes, Appcrons supports multiple time zones. You can manage requests based on your local time zone, ensuring your applications remain active and responsive at the right times.",
    },
    {
      question: "Can I enable or disable monitoring for specific applications?",
      answer:
        "Absolutely. Appcrons allows you to easily enable or disable monitoring for individual applications, giving you full control over which servers receive automated requests.",
    },
    {
      question: "Is there a cost to use Appcrons?",
      answer:
        "Appcrons offers a free plan to help you get started. Additional features and advanced functionalities may be available in premium plans.",
    },
    {
      question: "How do I get started with Appcrons?",
      answer:
        "To get started, sign up for an account on the Appcrons website, register your backend instance hosted on Render, and configure your request intervals and active hours. Appcrons will take care of the rest.",
    },
    {
      question: "What if I need help using Appcrons?",
      answer:
        "If you need assistance, you can contact our support team via email at support@appcrons.com or visit our help center on the Appcrons website for guides and tutorials.",
    },
  ];

  return (
    <div className="w-full mt-16 space-y-16">
      <div className="w-full text-center space-y-2">
        <p className="text-3xl font-semibold">Frequently Asked Questions</p>
        <p className="text-color-text-secondary text-base">
          Find answers to common questions about Appcrons
        </p>
      </div>
      <div
        className="w-full grid grid-cols-2 gap-8 border-[1px]
         border-color-border-primary p-8 rounded-2xl"
      >
        {faqs.map((faq, index) => (
          <div key={index} className="space-y-1">
            <div
              className="text-base text-color-text-primary text-start
              flex items-center justify-between"
              onClick={() => showAnswerHandler(index)}
            >
              <span>{faq.question}</span>
              <div className="p-2 rounded-[50%] bg-color-bg-secondary">
                {showAns(index) ? (
                  <ChevronUpIcon className="w-8 h-8" />
                ) : (
                  <ChevronDownIcon className="w-8 h-8" />
                )}
              </div>
            </div>
            {showAns(index) && (
              <p
                className="text-start text-base text-color-text-secondary
                bg-color-bg-secondary rounded-2xl p-4"
              >
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
