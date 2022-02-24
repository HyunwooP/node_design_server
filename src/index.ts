import App from "./App";

(async () => {
  try {
    await App.onCreateRoute();

    await App.onCreateServer();

    await App.onConnectDB();

    await App.onConnectRepository();

    await App.onCreateTestSample();
  } catch (error: unknown) {
    console.log(error);
  }
})();
