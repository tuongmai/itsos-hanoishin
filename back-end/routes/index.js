import accountRouters from "./account";
import tourGuideRouters from "./tourGuide";
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

  app.get("/location/:locationId", (req, res) => {
    res.render("location.hbs", {
      title: "Location",
    });
  });

  app.get("/home", (req, res) => {
    res.render("homepage.hbs", {
      title: "Home",
    });
  });
}

export { accountRouters, tourGuideRouters, locationRouters };
