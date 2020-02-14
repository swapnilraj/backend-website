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

  const onClose = React.useCallback(() => setPopupVisible(false), [
    setPopupVisible
  ]);

  const onConfirm = React.useCallback(
    async (values: IPublishState) => {
      setPublishing(true);
      try {
        await messagesRef?.ref.push(values);
      } catch (err) {
        console.error("Could not record message!", err);
      } finally {
        setPublishing(false);
        onClose();
      }
    },
    [setPublishing, messagesRef, onClose]
  );

  if (error) console.error(error);

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
      </main>
    </>
    // </FirebaseContext.Provider>
  );
};

export default App;
