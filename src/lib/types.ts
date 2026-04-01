export type AssessmentAnswer = {
  questionId: string;
  selected: string;
};

export type CoreProfileResult = {
  cognitiveProfile: string;
  howTheyOperate: string[];
  strengths: string[];
  limitations: string[];
  bestEnvironments: string[];
  misalignmentRisks: string[];
  economicValue: string[];
  recommendedPaths: string[];
  nextSteps: string[];
  summary: string;
};

export type CapabilityResult = {
  coreSkills: string[];
  problemSolvingStyle: string[];
  workEnvironmentPreference: string[];
  toolsSystemsUsed: string[];
  responsibilityLevel: string[];
  learningStyle: string[];
  leadershipOwnership: string[];
};

export type DirectInsightResult = {
  whatYoureActuallyGoodAt: string[];
  whereYoureUnderrated: string[];
  whereYouWillStruggle: string[];
  bestNextStep: string[];
};

export type ActionPlanResult = {
  actions: {
    action: string;
    why: string;
  }[];
};

export type LifeAlignedFullResult = {
  coreProfile: CoreProfileResult;
  capability: CapabilityResult;
  directInsight: DirectInsightResult;
  actionPlan: ActionPlanResult;
};