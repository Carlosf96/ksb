require("dotenv").config();
import { setupDB } from "./db";
import { log } from "./libraries/Log";
import { User } from "./models/User";
import { Role } from "./models/Role";
import { Candidate } from "./models/Candidate";
import { Feedback } from "./models/Feedback";

setupDB()
  .then(() => {
    return seed();
  })
  .then(() => {
    log.info("SEED DONE");
    process.exit();
  })
  .catch(err => {
    log.error("ERROR EXECUTING SEED:", err);
    process.exit();
  });

function seed(): PromiseLike<any> {
  // Do your seed code here, should return a promise that resolves whenn you are done.

  // Creates first admin user
  return (
    User.count().then((count: number) => {
      if (count === 0)
        return User.create({
          name: "Admin",
          email: "admin@example.com",
          password: "adminadmin",
          role: 1
        });
    }),
    Role.count().then((count: number) => {
      if (count < 5)
        return (
          Role.create({
            name: "Admin",
            level: 1,
            permissions: ["post@/User/create"]
          }),
          Role.create({
            name: "User",
            level: 2,
            permissions: ["get@/User/", "post@/User/", "delete@/User/"]
          })
        );
      return null;
    }),
    Candidate.count().then((count: number) => {
      if (count < 2) {
        return Candidate.create({
          name: "name lastname",
          email: "mail@mail.com",
          phone: 43425123450,
          website: "website.com",
          jobTitle: "tileroo",
          stage: 1,
          status: "open",
          currentRecruiters: [{ name: "alfred" }, { name: "fer" }],
          pastRecruiters: [{ name: "person" }, { name: "person2" }],
          positions: ["position1", "position2"]
        }), Candidate.create({
          name: "name lastname",
          email: "mail@mail.com",
          phone: 43425123450,
          website: "website.com",
          jobTitle: "tileroo",
          stage: 1,
          status: "open",
          currentRecruiters: [{ name: "fer" }, { name: "bob" }],
          pastRecruiters: [{ name: "person" }, { name: "person2" }],
          positions: ["position1", "position2"]
        })
      }
      return null;
    }), Feedback.count().then((count: number) => {
      if (count < 1) {
        return Feedback.create({
          userId: 1,
          candidateId: 1,
          rating: 5,
          description: 'very good guy',
        }),
          Feedback.create({
            userId: 2,
            candidateId: 1,
            rating: 2,
            description: 'very good '
          }),
          Feedback.create({
            userId: 2,
            candidateId: 2,
            rating: 3,
            description: 'super very good '
          })
      }
    })
  );
}
