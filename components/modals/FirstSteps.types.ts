export interface StepElement {
  required: boolean;
  elem: string;
  name: string;
  title: string;
}

export interface Step {
  title: string;
  lead?: string;
  elements: Array<StepElement>;
}

type LinkType = 'custom' | 'social';

export interface UserProfileLinks {
  type: LinkType;
  url: string;
  title: string;
}

export interface StepData {
  ignore: boolean;
  verified: boolean;
  title: string;
  description: string;
  country: string;
  town: string;
  links: Array<UserProfileLinks>;
}

export interface IFieldHandler {
  state: string;
  field: string;
  subfield?: string;
  value: string;
}
