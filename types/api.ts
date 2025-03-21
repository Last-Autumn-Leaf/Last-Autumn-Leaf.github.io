interface LanguageProblemCount {
  languageName: string;
  problemsSolved: number;
}

interface LanguageStats {
  languageProblemCount: LanguageProblemCount[];
}

interface NumQuestions {
  count: number;
  difficulty: string;
}

interface UserProfileUserQuestionProgressV2 {
  numAcceptedQuestions: NumQuestions[];
  numFailedQuestions: NumQuestions[];
  numUntouchedQuestions: NumQuestions[];
  userSessionBeatsPercentage: {
    difficulty: string;
    percentage: number;
  }[];
}

interface SubmitStats {
  acSubmissionNum: {
    difficulty: string;
    count: number;
    submissions: number;
  }[];
  totalSubmissionNum: {
    difficulty: string;
    count: number;
    submissions: number;
  }[];
}

interface InterviewScoreProgress {
  allQuestionsCount: {
    difficulty: string;
    count: number;
  }[];
  matchedUser: {
    submitStats: SubmitStats;
  };
}

export interface LeetCodeData {
  languageStats: LanguageStats;
  userProfileUserQuestionProgressV2: UserProfileUserQuestionProgressV2;
}
