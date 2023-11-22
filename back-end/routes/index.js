import accountRouters from "./account";
import locationRouters from "./location"

export default function routes(app) {
  app.get("/account", (req, res) => {
    res.render("account.hbs", {
      title: "Hanoi Shin",
    });
  });

  app.get("/tourGuide", (req, res) => {
    res.render("tourGuide.hbs", {
      title: "Tour Guide",
    });
  });

  app.get("/location", (req, res) => {
    res.render("location.hbs", {
      title: "Location",
    });
  });
}

export { accountRouters, locationRouters };
