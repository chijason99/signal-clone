import React from 'react'
import ChatInterfaceHeader from './ChatInterfaceHeader'
import ConversationContextProvider from '@/context/ConversationContext'


describe('<ChatInterfaceHeader />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ChatInterfaceHeader />)
  })
  it('renders the image correctly',() => {
    cy.readFile('public/puppy.jpg', null).then((img) => {
      // Intercept requests to Next.js backend image endpoint
      cy.intercept('_next/image*', {
        statusCode: 200,
        headers: { 'Content-Type': 'image/png' },
        body: img.buffer,
      })
      cy.mount(<ChatInterfaceHeader />)
      cy.getDataCy('profile-pic').should('be.visible')
    })
  })
  // it('renders the username correctly',() => {
  //     cy.mount(
  //       <ConversationContextProvider currentConversationReceiverName={{currentConversationReceiverName:"David"}}>
  //         <ChatInterfaceHeader />
  //       </ConversationContextProvider>
  //     )
  // })
})