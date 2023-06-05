import nc from "next-connect";
import Exception from "../exceptions/Exceptions"
import cookie from 'cookie';
import UsersRepository from "../repositories/UserRepository";

export const cookieConfig = {
  //TODO find a way to enable websocket to work with httponly
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 60 * 60 * 24 * 30,
  path: '/',
}

const getHandler = () => {

  return nc({
    attachParams: true,
    onError: (err, req, res, next) => {
      res.status(500).json({
        "message": "Page is broken",
        "error": err
      });
    },
    onNoMatch: (req, res) => {
      res.status(404).json({ "message": "Page is not found" });
    },
  })
    .use(async (req, res, next) => {
      req.user = {}
      console.log(req.params.wild)

      let notAuthenticatedRoutes = [
        "api/user/signup",
        "api/user/login",
      ]

      if (!notAuthenticatedRoutes.includes(req.params.wild)) {

        var cookies = cookie.parse(req.headers.cookie || '');
        if (!cookies.token) {
          res.status(403).json(new Exception("You must login first", 403, "unautheticated"))
          return;
        }

        let userRepo = new UsersRepository()

        const data = await userRepo.tokenToUser(cookies.token)
        console.log("🔑 TOKEN", cookies.token)
        console.log("🧑  USER", data)
        //in case the token is invalid or expired
        if (!data) {
          console.log("💣 There is no data")
          //TODO delete the cookie
          res.status(403).json(new Exception("You must login first", 403, "unautheticated"))
          return;

        }
        req.user = data.user
      }
      next()
    })
}




export default getHandler