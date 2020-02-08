import React from "react";

import "./normalize.css";
import "./App.css";

import { IPublishState, initialPublish } from "./store/publish";

import { Header } from "./Header";
import { Popup } from "./Popup";
import { AnnouncementForm } from "./AnnouncementForm";
import { LoadingDialog } from "./LoadingDialog";
import { ConfirmationDialog } from "./ConfirmationDialog";

const App = () => {
  const [showPopup, setPopupVisible] = React.useState(false);
  const [values, setValues] = React.useState(initialPublish);

  const showConfirmationPopup = React.useCallback(
    async (values: IPublishState) => {
      setValues(values);
      setPopupVisible(true);
      return true;
    },
    [setPopupVisible, setValues]
  );

  const [publishing, setPublishing] = React.useState(false);

  const onConfirm = React.useCallback(
    async (values: IPublishState) => {
      setPublishing(true);
      await sleep(1000, null);
      setPublishing(false);
      return Promise.resolve();
    },
    [setPublishing]
  );

  const onClose = React.useCallback(() => setPopupVisible(false), [
    setPopupVisible
  ]);

  return (
    <>
      <Header></Header>
      <main>
        <AnnouncementForm
          showConfirmationPopup={showConfirmationPopup}
          initialValues={initialPublish}
        />
        <Popup open={showPopup}>
          {publishing ? (
            <LoadingDialog />
          ) : (
            <ConfirmationDialog
              values={values}
              onConfirm={onConfirm}
              onClose={onClose}
            />
          )}
        </Popup>
      </main>
    </>
  );
};

const sleep = (time: number, value: any) =>
  new Promise(resolve => setTimeout(resolve, time, value));

export default App;
