import accountRouters from "./account";
import tourGuideRouters from "./tourGuide";
import locationRouters from "./location"
import profileRouter from "./profile";

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

  app.get("/profile", (req, res) => {
    res.render("profile.hbs", {
      title: "Profile Detail",
    });
  });
}

export { accountRouters, tourGuideRouters, locationRouters, profileRouter };
