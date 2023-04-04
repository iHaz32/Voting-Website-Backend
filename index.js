const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const categories_model = require("./models/categories");
const user_model = require("./models/user");
const students_model = require("./models/students");
const teachers_model = require("./models/teachers");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db, find, findOneAndUpdate } = require("./models/categories");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

mongoose.connect(
  "mongodb+srv://admin:u4M4cCF7E2aHaiz@cluster0.tfusjrl.mongodb.net/Voting_Site?retryWrites=true&w=majority"
);

app.post("/passwords", async (req, res) => {
  try {
    let try_again;
    const password = req.body.password;

    if (!password) {
      return res.status(200).json({
        data: {},
        msg: "There is no password",
        code: 3,
      });
    }

    const obj = await user_model.findOne({ code: password });
    if (obj) {
      try_again = true;
      return res.status(200).json({
        data: { try_again },
        msg: "Code already exists",
        code: 2,
      });
    }

    const newUser = new user_model({
      role: "student",
      code: password,
      voteGossiper: false,
      voteSleepyhead: false,
      voteRadio: false,
      voteLightningMcQueen: false,
      voteEinstein: false,
      voteLady: false,
      voteAWOL: false,
      voteTeachersPet: false,
      voteAuthority: false,
      voteComedian: false,
      voteChimney: false,
      voteSecondChance: false,
      voteStoryTeller: false,
      votePhilosopher: false,
    });

    newUser.save();
    try_again = false;

    return res.status(200).json({
      data: { try_again },
      msg: "Success",
      code: 0,
    });
  } catch (err) {
    try_again = true;
    return res.status(200).json({
      data: { try_again },
      msg: "Unknown error",
      code: 3,
    });
  }
});

app.get("/info", async (req, res) => {
  const categories = await categories_model.find({});

  return res.status(200).json({
    data: { categories },
    code: 200,
  });
});

app.get("/votingCategories", async (req, res) => {
  const categories = await categories_model.find({});

  return res.status(200).json({
    data: { categories },
    code: 200,
  });
});

app.post("/votedCheck", async (req, res) => {
  const code = req.body.code;
  const category = "vote" + req.body.category;
  const User = await user_model.findOne({ code: code });
  let check;
  switch (category) {
    case "voteGossiper":
      check = User.voteGossiper;
      break;
    case "voteSleepyhead":
      check = User.voteSleepyhead;
      break;
    case "voteRadio":
      check = User.voteRadio;
      break;
    case "voteEinstein":
      check = User.voteEinstein;
      break;
    case "voteLady":
      check = User.voteLady;
      break;
    case "voteAWOL":
      check = User.voteAWOL;
      break;
    case "voteTeacher's Pet":
      check = User.voteTeachersPet;
      break;
    case "voteComedian":
      check = User.voteComedian;
      break;
    case "voteChimney":
      check = User.voteChimney;
      break;
    case "voteSecond Chance":
      check = User.voteSecondChance;
      break;
    case "voteLightning McQueen":
      check = User.voteLightningMcQueen;
      break;
    case "voteAuthority":
      check = User.voteAuthority;
      break;
    case "voteStory teller":
      check = User.voteStoryTeller;
      break;
    case "votePhilosopher":
      check = User.votePhilosopher;
      break;
  }

  return res.status(200).json({
    data: { check },
    msg: "Success",
    code: 0,
  });
});

app.post("/votingCandidates", async (req, res) => {
  let candidates = [];
  const category = req.body.button;
  const role = (await categories_model.findOne({ name: category })).type;
  if (role === "student") {
    candidates = await students_model.find({ category: category });
  } else if (role === "teacher") {
    candidates = await teachers_model.find({ category: category });
  } else {
    return res.status(500).json({
      data: {},
      msg: "Error",
      code: 1,
    });
  }

  return res.status(200).json({
    data: { candidates, role },
    msg: "Success",
    code: 0,
  });
});

app.post("/vote", async (req, res) => {
  let role = await categories_model.findOne({ name: req.body.category });
  role = role.type;
  const category = "vote" + req.body.category;
  const code = req.body.code;
  if (role === "student") {
    const Candidate = await students_model.findOne({ name: req.body.name });
    students_model.findOneAndUpdate(
      { name: req.body.name },
      { votes: Candidate.votes + 1 },
      { upsert: true, new: true },
      (err, docs) => {
        switch (category) {
          case "voteGossiper":
            user_model.findOneAndUpdate(
              { code: code },
              { voteGossiper: true },
              (err, docs) => {
                return res.status(200).json({
                  data: {},
                  msg: "Success",
                  code: 0,
                });
              }
            );
            break;

          case "voteSleepyhead":
            user_model.findOneAndUpdate(
              { code: code },
              { voteSleepyhead: true },
              (err, docs) => {
                return res.status(200).json({
                  data: {},
                  msg: "Success",
                  code: 0,
                });
              }
            );
            break;

          case "voteRadio":
            user_model.findOneAndUpdate(
              { code: code },
              { voteRadio: true },
              (err, docs) => {
                return res.status(200).json({
                  data: {},
                  msg: "Success",
                  code: 0,
                });
              }
            );
            break;

          case "voteEinstein":
            user_model.findOneAndUpdate(
              { code: code },
              { voteEinstein: true },
              (err, docs) => {
                return res.status(200).json({
                  data: {},
                  msg: "Success",
                  code: 0,
                });
              }
            );
            break;

          case "voteLady":
            user_model.findOneAndUpdate(
              { code: code },
              { voteLady: true },
              (err, docs) => {
                return res.status(200).json({
                  data: {},
                  msg: "Success",
                  code: 0,
                });
              }
            );
            break;

          case "voteAWOL":
            user_model.findOneAndUpdate(
              { code: code },
              { voteAWOL: true },
              (err, docs) => {
                return res.status(200).json({
                  data: {},
                  msg: "Success",
                  code: 0,
                });
              }
            );
            break;

          case "voteTeacher's Pet":
            user_model.findOneAndUpdate(
              { code: code },
              { voteTeachersPet: true },
              (err, docs) => {
                return res.status(200).json({
                  data: {},
                  msg: "Success",
                  code: 0,
                });
              }
            );
            break;

          case "voteComedian":
            user_model.findOneAndUpdate(
              { code: code },
              { voteComedian: true },
              (err, docs) => {
                return res.status(200).json({
                  data: {},
                  msg: "Success",
                  code: 0,
                });
              }
            );
            break;

          case "votChimney":
            user_model.findOneAndUpdate(
              { code: code },
              { voteChimney: true },
              (err, docs) => {
                return res.status(200).json({
                  data: {},
                  msg: "Success",
                  code: 0,
                });
              }
            );
            break;

          case "voteSecond Chance":
            user_model.findOneAndUpdate(
              { code: code },
              { voteSecondChance: true },
              (err, docs) => {
                return res.status(200).json({
                  data: {},
                  msg: "Success",
                  code: 0,
                });
              }
            );
            break;
        }
      }
    );
  } else {
    const Candidate = await teachers_model.findOne({ name: req.body.name });
    teachers_model.findOneAndUpdate(
      { name: req.body.name },
      { votes: Candidate.votes + 1 },
      { upsert: true, new: true },
      (err, docs) => {
        switch (category) {
          case "voteLightning McQueen":
            user_model.findOneAndUpdate(
              { code: code },
              { voteLightningMcQueen: true },
              (err, docs) => {
                return res.status(200).json({
                  data: {},
                  msg: "Success",
                  code: 0,
                });
              }
            );
            break;

          case "voteAuthority":
            user_model.findOneAndUpdate(
              { code: code },
              { voteAuthority: true },
              (err, docs) => {
                return res.status(200).json({
                  data: {},
                  msg: "Success",
                  code: 0,
                });
              }
            );
            break;

          case "voteStory teller":
            user_model.findOneAndUpdate(
              { code: code },
              { voteStoryTeller: true },
              (err, docs) => {
                return res.status(200).json({
                  data: {},
                  msg: "Success",
                  code: 0,
                });
              }
            );
            break;

          case "votePhilosopher":
            user_model.findOneAndUpdate(
              { code: code },
              { votePhilosopher: true },
              (err, docs) => {
                return res.status(200).json({
                  data: {},
                  msg: "Success",
                  code: 0,
                });
              }
            );
            break;
        }
      }
    );
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    let wrong = false;
    const AttRole = req.body.role;
    const User = await user_model.findOne({ code: req.body.code });

    if (!User) {
      wrong = true;
      return res.status(200).send({
        data: { wrong },
        msg: "No account found.",
        code: 1,
      });
    }

    if (AttRole !== User.role) {
      return res.status(200).send({
        data: { wrong },
        msg: "Not authorized.",
        code: 1,
      });
    }

    const code_token = jwt.sign({ code: User.code }, process.env.SECRET);
    res.cookie("code", code_token, {
      httpOnly: true,
      max: 24 * 60 * 60 * 1000,
    });

    let role;
    if (req.body.code.length === 12) {
      role = "student";

      res.status(200).send({
        data: { role, wrong },
        msg: "Authenticated as a student",
        code: 5,
      });
    } else {
      role = "teacher";
      res.status(200).send({
        data: { role, wrong },
        msg: "Authenticated as a teacher",
        code: 6,
      });
    }
  } catch (err) {
    return res.status(500).send({
      data: {},
      msg: "Unknown Error",
      code: 3,
    });
  }
});

app.get("/auth/logout", async (req, res) => {
  res.cookie("code", "", { maxAge: 0 });
  res.status(200).send({ data: {}, msg: "Success", code: 0 });
});

app.post("/add", async (req, res) => {
  const name = req.body.name;
  const category = req.body.category;
  const role = await categories_model.findOne({ name: category });

  if (role.type === "student") {
    const newStudent = new students_model({
      name: name,
      category: category,
      votes: 0,
    });
    newStudent.save();
  } else if (role.type === "teacher") {
    const newTeacher = new teachers_model({
      name: name,
      category: category,
      votes: 0,
    });
    newTeacher.save();
  } else {
    return res.status(500).json({
      data: {},
      msg: "Error",
      code: 1,
    });
  }
  categories_model.findOneAndUpdate(
    { name: category },
    { nomineesNumber: role.nomineesNumber + 1 },
    { upsert: true, new: true },
    (err, docs) => {
      return res.status(200).json({
        data: {},
        msg:
          role.type[0].toUpperCase() +
          role.type.slice(1) +
          " added successfully!",
        code: 0,
      });
    }
  );
});

app.get("/auth/sessions/verify", async (req, res) => {
  // https://www.npmjs.com/package/jsonwebtoken

  // react use effect > axios > verify path which checks whether use has correct cookies and it would return users account

  // and on frontend you would check if the users account permissions fit the page

  // const cookie = req.cookies["jwt"];
  // const claims = jwt.verify(cookie, config.secret);
  let role = null;
  try {
    const cookie = req.cookies["code"];
    const claims = jwt.verify(cookie, process.env.SECRET);

    if (!claims) {
      return res.status(200).send({
        data: {},
        msg: "User is not logged in",
        code: 1,
      });
    }

    const User = await user_model.findOne({ code: claims.code });

    if (!User) {
      return res.status(200).send({
        data: {},
        msg: "No account found",
        code: 1,
      });
    }
    const code = claims.code;
    role = User.role;
    res.status(200).send({
      data: { role, code },
      msg: "Success",
      code: 0,
    });
  } catch (err) {
    return res.status(500).send({
      data: { role },
      msg: "Unknown error",
      code: 3,
    });
  }
});

// http://localhost:8000/
// http://localhost:8000/people?name=XXFOGS

//       ↓
{
  /* app.get('/candidates', async (req, res) => {
    // req = Request
    // res = Response

    // Error Code 404
    // Error Code 403

    const candidates = await candidate_model.find({})

    return res.status(200).json({
        data: {candidates},
        msg: "Success",                                                                 
        code: 200,
    })
})

app.post('/vote', async (req, res) => { 
    // candidate

    // req = Request
    // res = Response

    // http://localhost:8000/vote



    const candidate = req.body.candidate;

    if (!candidate) { 
        return res.status(200).json({
            data: {},
            msg: "Error, incorrect arguments",                                                                 
            code: 200,
        })
    } 

    // mongodb

    const candidateDoc = await candidate_model.findOne({ name: candidate })

    if (!candidateDoc) { 
        return res.status(200).json({
            data: {},
            msg: "No candidate found",                                          
            code: 404,
        })
    }

    candidate_model.findOneAndUpdate({ name: candidate }, { votes: candidateDoc.votes + 1 }, { upsert: true, new: true }, (err, docs) => {
        return res.status(200).json({
            data: { docs }, 
            msg: "Success",                                                           
            code: 200,
        })
    })
})
*/
}

// POST; PUT; PATCH; GET; DELETE

// POST; GET

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
