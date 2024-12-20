const port=process.env.PORT;
import initApp from "./server";

initApp().then((app) => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

});

