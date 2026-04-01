import { questions } from "@/data/questions";
import type { AssessmentAnswer } from "@/lib/types";

export function buildFormattedAnswers(answers: AssessmentAnswer[]) {
  return answers.map((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    const selectedOption = question?.options.find(
      (option) => option.key === answer.selected
    );

    return {
      questionId: answer.questionId,
      question: question?.text ?? "Unknown question",
      selectedKey: answer.selected,
      selectedLabel: selectedOption?.label ?? "Unknown answer",
    };
  });
}