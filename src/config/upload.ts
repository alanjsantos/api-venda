import path from "path"
import multer from "multer";
import crypto from 'crypto'

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
    director: uploadFolder,
    storage: multer.diskStorage({
        destination: uploadFolder,
        filename(request, file, callBack) {
            const fileHash = crypto.randomBytes(10).toString('hex');

            const filename = `${fileHash}-${file.originalname}`;

            callBack(null, filename)
        }
    })
}