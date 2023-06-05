import multer from "multer";
import path from "path";

export default function uploadFile(inputName,storagePath='files'){
    const upload = multer({
        storage: multer.diskStorage({
          destination: function (req, file, cb) {
            cb(null, path.join(process.cwd(), "public", storagePath));
          },
          filename: function (req, file, cb) {
            cb(null, new Date().getTime() + "-" + file.originalname.trim().replace(/\s+/g, '-').toLowerCase());
          },
        }),
      });

    return upload.single(inputName)
}

