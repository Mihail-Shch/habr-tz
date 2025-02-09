export interface SuggestionDTO {
  alias: string;
  avatar: string | null;
  name: string;
  type: SuggestionType;
}

export const enum SuggestionType {
  COMPANY = "company",
  USER = "user",
}
