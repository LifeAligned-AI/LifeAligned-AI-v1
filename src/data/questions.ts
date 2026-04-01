
export type Question = {
  id: string;
  text: string;
  options: { key: string; label: string }[];
};

export const questions: Question[] = [
  {
    id: "problem_approach",
    text: "When faced with a complex problem, what do you do first?",
    options: [
      { key: "A", label: "Break it down step-by-step" },
      { key: "B", label: "Look for patterns or connections" },
      { key: "C", label: "Ask others for input" },
      { key: "D", label: "Go with instinct and adjust" },
    ],
  },
  {
    id: "mental_drain",
    text: "After a long day, what drains you the most?",
    options: [
      { key: "A", label: "Too many decisions" },
      { key: "B", label: "Social interaction" },
      { key: "C", label: "Repetitive tasks" },
      { key: "D", label: "Lack of progress" },
    ],
  },
  {
    id: "natural_work_style",
    text: "What type of work feels most natural to you?",
    options: [
      { key: "A", label: "Structured and organized" },
      { key: "B", label: "Creative and flexible" },
      { key: "C", label: "People-focused" },
      { key: "D", label: "Strategic and big-picture" },
    ],
  },
  {
    id: "decision_style",
    text: "How do you usually make important decisions?",
    options: [
      { key: "A", label: "Analyze all variables" },
      { key: "B", label: "Follow intuition" },
      { key: "C", label: "Talk it through" },
      { key: "D", label: "Weigh long-term impact" },
    ],
  },
  {
    id: "ideal_environment",
    text: "Which environment do you perform best in?",
    options: [
      { key: "A", label: "Clear structure and expectations" },
      { key: "B", label: "Freedom and flexibility" },
      { key: "C", label: "Collaborative and social" },
      { key: "D", label: "Fast-moving and high challenge" },
    ],
  },
  {
    id: "frustration_trigger",
    text: "What frustrates you the most?",
    options: [
      { key: "A", label: "Disorganization" },
      { key: "B", label: "Lack of creativity" },
      { key: "C", label: "Poor communication" },
      { key: "D", label: "Lack of direction" },
    ],
  },
  {
    id: "motivation_driver",
    text: "What motivates you the most?",
    options: [
      { key: "A", label: "Efficiency and progress" },
      { key: "B", label: "Expression and ideas" },
      { key: "C", label: "Helping others" },
      { key: "D", label: "Building something meaningful" },
    ],
  },
  {
    id: "learning_style",
    text: "How do you learn best?",
    options: [
      { key: "A", label: "Step-by-step instruction" },
      { key: "B", label: "Exploring and experimenting" },
      { key: "C", label: "Discussion and feedback" },
      { key: "D", label: "Seeing the bigger system" },
    ],
  },
  {
    id: "social_energy",
    text: "In social settings, you tend to:",
    options: [
      { key: "A", label: "Observe before engaging" },
      { key: "B", label: "Jump in and adapt" },
      { key: "C", label: "Connect deeply one-on-one" },
      { key: "D", label: "Lead or guide direction" },
    ],
  },
  {
    id: "time_preference",
    text: "You prefer to focus on:",
    options: [
      { key: "A", label: "Immediate tasks" },
      { key: "B", label: "Possibilities and ideas" },
      { key: "C", label: "People and relationships" },
      { key: "D", label: "Long-term outcomes" },
    ],
  },
  {
    id: "risk_style",
    text: "How do you handle risk?",
    options: [
      { key: "A", label: "Minimize it" },
      { key: "B", label: "Explore it" },
      { key: "C", label: "Share it with others" },
      { key: "D", label: "Calculate it" },
    ],
  },
  {
    id: "alignment_check",
    text: "When do you feel most off in life?",
    options: [
      { key: "A", label: "When things feel chaotic" },
      { key: "B", label: "When I feel restricted" },
      { key: "C", label: "When I feel disconnected" },
      { key: "D", label: "When I feel stuck" },
    ],
  },
];