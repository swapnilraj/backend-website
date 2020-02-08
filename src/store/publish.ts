export interface IPublishState {
  message: string;
  messageType: string;
  messageLocation: string;
}

export const initialPublish: IPublishState = {
  message: "",
  messageType: "option1",
  messageLocation: "option2"
};
