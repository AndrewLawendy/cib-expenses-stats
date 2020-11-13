import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "semantic-ui-react";

import { useUser } from "../../utils/localStorageHooks.js";

const UserModal = () => {
  const [open, setOpen] = useState(false);
  const [user, setLocalStorageUser] = useUser();
  const [userState, setUserState] = useState(user);

  useEffect(() => {
    if (!user) setOpen(true);
  }, []);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      dimmer="blurring"
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
          disabled={!userState}
          content="Update"
          onClick={() => {
            setLocalStorageUser(userState);
            setOpen(false);
          }}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default UserModal;
