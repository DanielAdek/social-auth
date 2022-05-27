/* eslint-disable require-jsdoc */
import express from "express";
import { Setup } from "./app.setup";
import PSMC from "./config/psm.config";

class App extends Setup {
  constructor() {
    super(express());

    this.buildConfigurations();
  }

  buildConfigurations() {
    this.useApplicationMiddlewares();

    this.useCorsSecurityconfig();

    this.setGlobalRoutesPrefix("/api/v1");

    PSMC.getPassportSocialMConfig();

    this.setTestApplicationRoutes();

    this.catchUnknownRoutes();
    admin.initializeApp({
      credential: admin.credential.cert(FIREBASE_KEY),
    });
  }

  run() {
    this.start();
  }
}
new App().run();
