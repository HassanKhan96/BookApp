import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import {resolve} from 'path';

const storageConfig = diskStorage({
    filename: (req, file, cb) => cb(null, (Math.random()+Date.now()).toString()+"-"+file.originalname),
    destination: './images',
})

export const fileUpload = () => FileInterceptor('image', {storage: storageConfig})