import React from "react";
import { useModal } from "../../utils";
import { ContactDetailEditModal } from "./ContactDetailEditModal";
import { ContactCard } from "./ContactCard";

export const ContactListCard = ({ contact }) => {
  const { isShowing: isShowingModal, toggle: toggleModal } = useModal();
  return (
    <>
      <ContactCard toggleDetail={toggleModal} contact={contact} />
      {isShowingModal && (
        <ContactDetailEditModal
          isShowingOverlay={isShowingModal}
          toggleOverlay={toggleModal}
          contactId={contact.id}
        />
      )}
    </>
  );
};
