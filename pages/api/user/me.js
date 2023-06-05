import getHandler, { cookieConfig } from "../../../lib/nextConnect";

export default getHandler()
    //We should give it the pattern to extract the slug
    .get((req, res) => {
        res.json(req.user)
    })
