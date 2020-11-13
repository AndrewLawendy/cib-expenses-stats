import React, { useState, useContext, useEffect } from "react";
import { Button, Modal, Form } from "semantic-ui-react";

import { AppContext } from "../appContext/AppContext.jsx";

const UserModal = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useContext(AppContext);
  const [userState, setUserState] = useState(user);

  useEffect(() => {
    if (!user) setOpen(true);
  }, []);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      centered={false}
      closeOnEscape={!!user}
      closeOnDimmerClick={!!user}
      trigger={<Button>Update User</Button>}
    >
      <Modal.Header>Update User</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Field>
              <label>User</label>
              <input
                value={userState}
                onChange={(e) => setUserState(e.target.value)}
                placeholder="First Name"
              />
            </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Update"
          onClick={() => {
            setUser(userState);
            setOpen(false);
          }}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default UserModal;
