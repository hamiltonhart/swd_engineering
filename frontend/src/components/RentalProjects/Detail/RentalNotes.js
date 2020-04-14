import React from "react";

import { SectionHeading } from "../../../styled/typography";

import { SimpleDiv, PositionWrapper } from "../../../styled/containers";
import { EditNotesModal } from "./ButtonModals";

export const RentalNotes = ({ notes, projectId }) => {
  return (
    <SimpleDiv
      gridColumn="1 / 2"
      justifySelf="start"
      padding="15px 21px 50px 21px"
      position="relative"
    >
      <SectionHeading gridColumn>Notes</SectionHeading>
      <SimpleDiv
        padding="19px 30px"
        dangerouslySetInnerHTML={{
          __html: notes ? notes.replace(/\r?\n/g, "<br />") : null
        }}
      >
        {/* {notes
          ? notes.split("\n").map((i, key) => <div key={key}>{i}</div>)
          : "No notes"} */}
      </SimpleDiv>
      <PositionWrapper position="absolute" bottom="5%" right="10%">
        <EditNotesModal currentNotes={notes} projectId={projectId} />
      </PositionWrapper>
    </SimpleDiv>
  );
};
