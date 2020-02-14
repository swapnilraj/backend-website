export interface IPublishState {
  message: string;
  type: string;
  location: string;
}

export const initialPublish: IPublishState = {
  message: "",
  type: "option1",
  location: "option2"
};
