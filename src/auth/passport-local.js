import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GitHubStrategy } from "passport-github2";
import MongoDBUsers from "../daos/mongo/MongoDBUsers.js";
import { MongoDBCarts } from "../daos/mongo/MongoDBCarts.js";
import { encryptPassword, comparePassword } from "../config/bcrypt.js";
import mongoose from 'mongoose';

const db = new MongoDBUsers();
const dbCarts = new MongoDBCarts();

const localStrategy = LocalStrategy;
const githubStrategy = GitHubStrategy;

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

console.log(process.env.GITHUB_CLIENT_ID);
console.log(process.env.GITHUB_CLIENT_SECRET);

passport.use(
  "register",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      if (mongoose.connection.readyState != 1) {
        console.error('Error: Mongoose is not connected. Please ensure MongoDB server is running.');
        return done(null, false);
      }
      const usuarioSaved = await db.getUserByEmail({ email });
      if (usuarioSaved) {
        req.flash(
          "errorMessage",
          "El usuario ya existe en nuestra Base de datos. Por favor, elija otro nombre de usuario."
        );
        return done(null, false);
      } else {
        const hashPass = await encryptPassword(password);
        const newCart = await dbCarts.create();
        const newUser = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          age: req.body.age,
          cart: newCart._id,
          password: hashPass,
          role: req.body.role || "user",
        };
        const response = await db.create(newUser);
        console.log("Nuevo usuario registrado: ", response);
        return done(null, response);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      if (mongoose.connection.readyState != 1) {
        console.error('Error: Mongoose is not connected. Please ensure MongoDB server is running.');
        return done(null, false);
      }
      const usuarioSaved = await db.getUserByEmail({ email });
      if (!usuarioSaved) {
        req.flash(
          "errorMessage",
          "El usuario ingresado no existe. Por favor, regístrese."
        );
        return done(null, false);
      }
      const isTruePassword = await comparePassword(
        password,
        usuarioSaved.password
      );
      if (!isTruePassword) {
        req.flash(
          "errorMessage",
          "La contraseña ingresada es incorrecta. Por favor, intente nuevamente."
        );
        return done(null, false);
      }

      return done(null, usuarioSaved);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await db.getOne(id);
  done(null, user);
});

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
}

passport.use(
  new githubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "https://github.com/apps/desafiocoderbackend",
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = {
        username: profile.username,
        password: null,
      };
      const userSaved = await db.getUserByUsername({ username: user.username });
      if (userSaved) {
        return done(null, userSaved);
      } else {
        const response = await db.create(user);
        return done(null, response);
      }
    }
  )
);

export { passport, isAuth };