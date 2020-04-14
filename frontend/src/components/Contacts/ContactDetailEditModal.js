import React from "react";
import { useModal } from "../../utils/useModal";

import { useQuery } from "@apollo/react-hooks";
import { CONTACT_QUERY } from "../../gql";

import { FlexWrapper } from "../../styled/containers";
import { ContactDetailModal } from "./ContactDetailModal";
import { EditContactModal } from "./EditContactModal";
import { BlackButton } from "../../styled/buttons";
import { Loading, Error } from "../global";

import { Modal, ModalArea, ModalCloseIcon } from "../utilities/Modal";

import { Button } from "@material-ui/core";

export const ContactDetailEditModal = ({
  toggleOverlay,
  isShowingOverlay,
  contactId
}) => {
  const { isShowing: isShowingDetail, toggle: toggleDetail } = useModal(true);
  const { isShowing: isShowingEdit, toggle: toggleEdit } = useModal();

  const { data, loading, error } = useQuery(CONTACT_QUERY, {
    variables: { id: contactId }
  });

  const toggleDetailEdit = () => {
    toggleDetail();
    toggleEdit();
  };

  return (
    <Modal isShowing={isShowingOverlay}>
      {isShowingDetail && (
        <ModalArea>
          <ModalCloseIcon toggle={toggleOverlay} />
          {loading && <Loading />}
          {error && <Error>{error.message}</Error>}
          {data && (
            <>
              <ContactDetailModal
                contact={data.contact}
                toggleOverlay={toggleOverlay}
              />
              <FlexWrapper padding="0">
                <Button
                  size="large"
                  color="secondary"
                  variant="contained"
                  onClick={e => toggleDetailEdit(toggleDetail, toggleEdit)}
                >
                  Edit
                </Button>
              </FlexWrapper>
            </>
          )}
        </ModalArea>
      )}
      {isShowingEdit && (
        <ModalArea>
          <ModalCloseIcon
            toggle={() => toggleDetailEdit(toggleDetail, toggleEdit)}
          />
          <EditContactModal
            toggleOverlay={toggleOverlay}
            toggleDetailEdit={toggleDetailEdit}
            contact={data.contact}
            contactId={contactId}
          />
        </ModalArea>
      )}
    </Modal>
  );
};
