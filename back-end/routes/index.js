import accountRouters from "./account";
import tourGuideRouters from "./tourGuide";
import profileRouter from "./profile";
import matchingRouters from "./matching";
import locationRouters from "./location";
import reviewRoutes from "./review";

export default function routes(app) {
  app.get("/account", (req, res) => {
    res.render("account.hbs", {
      title: "ハノイシーン",
    });
  });

  app.get("/tourGuide", (req, res) => {
    res.render("tourGuide.hbs", {
      title: "ツアーガイド",
    });
  });

  app.get("/location/:locationId", (req, res) => {
    res.render("location.hbs", {
      title: "場所",
    });
  });
  app.get("/profile", (req, res) => {
    res.render("profile.hbs", {
      title: "プロファイル",
    });
  });
  app.get("/home", (req, res) => {
    res.render("homepage.hbs", {
      title: "ハノイシーン",
    });
  });
  app.get("/booking", (req, res) => {
    res.render("bookingTourGuide.hbs", {
      title: "予約"
    })
  })
}


export { accountRouters, tourGuideRouters, locationRouters, matchingRouters, profileRouter, reviewRoutes };
