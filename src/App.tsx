import React from "react";

import "./normalize.css";
import "./App.css";

import { IPublishState, initialPublish } from "./store/publish";

import { Header } from "./Header";
import { Popup } from "./Popup";
import { AnnouncementForm } from "./AnnouncementForm";
import { LoadingDialog } from "./LoadingDialog";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { useDBRef } from "./store/firebase";
import { Toast } from "./Toast";

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

  const [messagesRef, loading, error] = useDBRef("messages");

  if (error) console.error(error);

  const onClose = React.useCallback(() => setPopupVisible(false), [
    setPopupVisible
  ]);

  const [promptValue, setPrompt] = React.useState<string | null>(null);

  const onConfirm = React.useCallback(
    async (values: IPublishState) => {
      setPublishing(true);
      try {
        const message = { ...values, timestamp: new Date().toString() };
        await messagesRef?.ref.push(message);
        setPrompt("Announcement successfully published");
      } catch (err) {
        console.error("Could not record message!", err);
        setPrompt("Announcement failed to publish");
      } finally {
        setPublishing(false);
        onClose();
      }
    },
    [setPublishing, messagesRef, onClose, setPrompt]
  );

  return (
    <>
      <Header></Header>
      <main>
        {error && <div>Error</div>}
        {loading && <div>Loading....</div>}
        {!loading && !error && (
          <AnnouncementForm
            showConfirmationPopup={showConfirmationPopup}
            initialValues={initialPublish}
          />
        )}
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
        <Toast prompt={promptValue}></Toast>
      </main>
    </>
    // </FirebaseContext.Provider>
  );
};

export default App;
