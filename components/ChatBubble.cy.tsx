import React from "react";
import ChatBubble from "./ChatBubble";

describe("<ChatBubble />", () => {
  it("renders the incoming message correctly, ", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <ChatBubble
        msg={"Incoming message"}
        time={"22:15"}
        fromOthers={true}
        dataCyValue="bubble"
      />
    );
    const bubble = cy.getDataCy("bubble");
    bubble.should("have.css", "background-color", "rgb(211, 211, 211)");
    bubble.should("have.css", "align-self", "flex-start");
    cy.getDataCy("msg").should("have.text", "Incoming message");
    cy.getDataCy("time").should("have.text", "22:15");
  });
  it("renders the outgoing message correctly", () => {
    cy.mount(
      <ChatBubble
        msg={"Outgoing message"}
        time={"22:15"}
        fromOthers={false}
        dataCyValue="bubble"
      />
    );
    const bubble = cy.getDataCy("bubble");
    bubble.should("have.css", "background-color", "rgb(58, 118, 240)");
    bubble.should("have.css", "align-self", "flex-end");
    cy.getDataCy("msg").should("have.text", "Outgoing message");
    cy.getDataCy("time").should("have.text", "22:15");
  });
  it("renders time correctly when the hour starts with 0", () => {
    cy.mount(<ChatBubble msg={"Testing"} time={"02:15"} fromOthers={true} />);
    cy.getDataCy("time").should("have.text", "02:15");
  });
  it("renders time correctly when the minute starts with 0", () => {
    cy.mount(<ChatBubble msg={"Testing"} time={"12:05"} fromOthers={true} />);
    cy.getDataCy("time").should("have.text", "12:05");
  });
  it("renders time correctly when it is at midnight", () => {
    cy.mount(<ChatBubble msg={"Testing"} time={"00:00"} fromOthers={true} />);
    cy.getDataCy("time").should("have.text", "00:00");
  });
});
