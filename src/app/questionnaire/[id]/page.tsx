"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PROJECT_TYPES, PROJECT_TYPE_LABELS, type ProjectType } from "@/types";
import { questionnaireByProjectType, type QuestionConfig, type QuestionSection } from "@/lib/questionnaire-config";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, CheckCircle, ClipboardList } from "lucide-react";
import Link from "next/link";

function QuestionField({ q, value, onChange }: {
  q: QuestionConfig;
  value: string | string[] | number | boolean;
  onChange: (val: string | string[] | number | boolean) => void;
}) {
  switch (q.type) {
    case "text":
      return (
        <input
          className="input-field"
          placeholder={q.placeholder}
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
          required={q.required}
        />
      );
    case "textarea":
      return (
        <textarea
          className="input-field"
          rows={3}
          placeholder={q.placeholder}
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
          required={q.required}
        />
      );
    case "number":
      return (
        <input
          type="number"
          className="input-field"
          value={(value as number) || ""}
          onChange={(e) => onChange(Number(e.target.value))}
          required={q.required}
        />
      );
    case "select":
      return (
        <select
          className="select-field"
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
          required={q.required}
        >
          <option value="">Select...</option>
          {q.options?.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      );
    case "multiselect": {
      const selected = Array.isArray(value) ? value : [];
      return (
        <div className="grid grid-cols-2 gap-2">
          {q.options?.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                const next = selected.includes(opt)
                  ? selected.filter((s) => s !== opt)
                  : [...selected, opt];
                onChange(next);
              }}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium border transition-all text-left",
                selected.includes(opt)
                  ? "bg-gold-100 border-gold-300 text-gold-800"
                  : "bg-white border-cream-200 text-charcoal-500 hover:border-gold-200"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      );
    }
    case "boolean":
      return (
        <div className="flex gap-3">
          {["Yes", "No"].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt === "Yes")}
              className={cn(
                "px-5 py-2.5 rounded-lg text-sm font-medium border transition-all",
                (opt === "Yes" && value === true) || (opt === "No" && value === false)
                  ? "bg-gold-100 border-gold-300 text-gold-800"
                  : "bg-white border-cream-200 text-charcoal-500 hover:border-gold-200"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      );
    default:
      return null;
  }
}

export default function QuestionnairePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const isNew = id === "new";

  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [responses, setResponses] = useState<Record<string, string | string[] | number | boolean>>({});
  const [completed, setCompleted] = useState(false);

  const sections: QuestionSection[] = projectType ? questionnaireByProjectType[projectType] : [];

  const setResponse = (questionId: string, value: string | string[] | number | boolean) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleComplete = () => {
    setCompleted(true);
  };

  if (completed) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-charcoal-800">Thank You!</h1>
        <p className="text-charcoal-500 mt-2 max-w-md mx-auto">
          Your questionnaire has been submitted successfully. Adina will review your responses and prepare a personalized design approach.
        </p>
        <Link href="/" className="btn-primary mt-6">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  if (!projectType) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal-800">Design Questionnaire</h1>
          <p className="text-charcoal-400 mt-1">
            Let&apos;s start by understanding your project. This adaptive questionnaire will help us create the perfect design approach.
          </p>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-serif font-semibold text-charcoal-700 mb-4">What type of project is this?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PROJECT_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setProjectType(type)}
                className="p-4 rounded-xl border-2 border-cream-200 bg-white text-left hover:border-gold-300 hover:bg-gold-50/30 transition-all group"
              >
                <h3 className="font-semibold text-charcoal-700 group-hover:text-gold-700">
                  {PROJECT_TYPE_LABELS[type]}
                </h3>
                <p className="text-xs text-charcoal-400 mt-1">
                  {type === "full_renovation" && "Complete transformation from foundation to furnishing"}
                  {type === "contractor_apartment" && "Customize and elevate a new-build apartment"}
                  {type === "home_styling" && "Refresh and style your existing space"}
                  {type === "single_space" && "Focus on one room or area"}
                  {type === "kitchen_design" && "Create your dream kitchen"}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const section = sections[currentSection];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link href="/" className="btn-ghost inline-flex -ml-3">
        <ArrowLeft className="w-4 h-4" />
        Dashboard
      </Link>

      {/* Progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-serif font-bold text-charcoal-800">
            <ClipboardList className="w-5 h-5 inline mr-2 text-gold-500" />
            {PROJECT_TYPE_LABELS[projectType]} Questionnaire
          </h1>
          <span className="text-sm text-charcoal-400">
            Section {currentSection + 1} of {sections.length}
          </span>
        </div>
        <div className="flex gap-1">
          {sections.map((_, idx) => (
            <div
              key={idx}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-all",
                idx <= currentSection ? "bg-gold-500" : "bg-cream-200"
              )}
            />
          ))}
        </div>
      </div>

      {/* Section */}
      <div className="card p-6">
        <h2 className="text-lg font-serif font-semibold text-charcoal-800">{section.title}</h2>
        {section.description && (
          <p className="text-sm text-charcoal-400 mt-1">{section.description}</p>
        )}

        <div className="mt-6 space-y-5">
          {section.questions.map((q) => (
            <div key={q.id}>
              <label className="label">
                {q.label} {q.required && <span className="text-red-400">*</span>}
              </label>
              {q.helpText && <p className="text-xs text-charcoal-400 mb-1.5">{q.helpText}</p>}
              <QuestionField q={q} value={responses[q.id]} onChange={(val) => setResponse(q.id, val)} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            if (currentSection > 0) setCurrentSection(currentSection - 1);
            else setProjectType(null);
          }}
          className="btn-secondary"
        >
          <ArrowLeft className="w-4 h-4" />
          {currentSection > 0 ? "Previous" : "Change Type"}
        </button>

        {currentSection < sections.length - 1 ? (
          <button onClick={() => setCurrentSection(currentSection + 1)} className="btn-primary">
            Next Section
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button onClick={handleComplete} className="btn-gold">
            <CheckCircle className="w-4 h-4" />
            Submit Questionnaire
          </button>
        )}
      </div>
    </div>
  );
}
