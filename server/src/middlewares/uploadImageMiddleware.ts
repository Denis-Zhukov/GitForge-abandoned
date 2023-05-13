import multer, {Multer} from "multer";
import path from "path";
import {v4} from "uuid";

const __dirname = path.resolve();


const storage = multer.diskStorage({
    destination: path.join(__dirname, "public", "avatars"),
    filename: (req, file, cb) => {
        const uniqueSuffix = v4();
        const ext = path.extname(file.originalname);
        req.file = file;
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    },
});

export const uploadImageMiddleware: Multer = multer({storage});