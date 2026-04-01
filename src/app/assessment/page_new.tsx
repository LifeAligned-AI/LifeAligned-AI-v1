"use client";

import { useMemo, useState } from "react";
import { questions } from "@/data/questions";
import type { AssessmentAnswer } from "@/lib/types";

export default function AssessmentPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([]);
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const progressPercent = useMemo(() => {
    return Math.round(((currentIndex + 1) / totalQuestions) * 100);
  }, [currentIndex, totalQuestions]);

  function handleSelect(optionKey: string) {
    setSelected(optionKey);
  }

  async function handleNext() {
    if (!selected) return;

    const updatedAnswers = [
      ...answers.filter((a) => a.questionId !== currentQuestion.id),
      {
        questionId: currentQuestion.id,
        selected,
      },
    ];

    setAnswers(updatedAnswers);
    setSelected("");
    setError(null);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers: updatedAnswers,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze assessment");
      }

      setAnalysisResult(data.result);
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  function handleBack() {
    if (currentIndex === 0) return;

    const previousIndex = currentIndex - 1;
    const previousQuestion = questions[previousIndex];
    const previousAnswer = answers.find(
      (a) => a.questionId === previousQuestion.id
    );

    setCurrentIndex(previousIndex);
    setSelected(previousAnswer?.selected ?? "");
    setError(null);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="max-w-xl w-full rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center shadow-xl">
          <h1 className="text-3xl font-bold mb-4">Analyzing Your Responses</h1>
          <p className="text-slate-300">
            LifeAligned AI is building your profile...
          </p>
        </div>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
          <h1 className="text-3xl font-bold mb-4">Your LifeAligned Result</h1>
          <p className="text-slate-300 mb-6">
            This is the raw result from the AI route. Next we’ll turn this into
            a real results page.
          </p>

          <pre className="overflow-auto rounded-xl bg-slate-950 p-4 text-sm text-slate-300 whitespace-pre-wrap">
            {analysisResult}
          </pre>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="mb-2 text-sm uppercase tracking-widest text-slate-400">
            LifeAligned AI Assessment
          </p>
          <h1 className="text-3xl font-bold mb-4">
            Question {currentIndex + 1} of {totalQuestions}
          </h1>

          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-slate-400">{progressPercent}% complete</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
          <h2 className="text-2xl font-semibold mb-6">{currentQuestion.text}</h2>

          <div className="space-y-4">
            {currentQuestion.options.map((option) => {
              const isSelected = selected === option.key;

              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => handleSelect(option.key)}
                  className={`w-full rounded-xl border p-4 text-left transition ${
                    isSelected
                      ? "border-blue-500 bg-blue-500/10 text-white"
                      : "border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  <span className="block font-medium">
                    {option.key}. {option.label}
                  </span>
                </button>
              );
            })}
          </div>

          {error ? (
            <p className="mt-6 text-sm text-red-400">{error}</p>
          ) : null}

          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentIndex === 0}
              className="rounded-xl border border-slate-700 px-5 py-3 text-slate-300 disabled:opacity-40"
            >
              Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!selected}
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-40"
            >
              {currentIndex === totalQuestions - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}