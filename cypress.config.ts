import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      testEmailMichael: "test123@test.com",
      testPasswordMichael: "abc123abc123",
      testEmailDavid: "test234@test.com",
      testPasswordDavid: "test234",
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
