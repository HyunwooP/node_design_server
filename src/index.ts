import "module-alias/register";
import App from "./App";
import config from "./config";

(async () => {
  try {
    console.log(`NODE_ENV =======> ${config.NODE_ENV} Start`);

    if (config.NODE_ENV === "production") {
      await App.onCreateProductionApp();
    } else {
      await App.onCreateDevelopmentApp();
    }
  } catch (error: unknown) {
    console.log(error);
  }
})();
