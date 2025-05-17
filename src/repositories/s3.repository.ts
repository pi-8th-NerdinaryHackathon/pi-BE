import { s3, upload } from "../config/s3.config";
import { Request, Response } from "express";

export const productUploader = async (req: Request, res: Response): Promise<string> => {
    return new Promise((resolve, reject) => {
        upload.single('image')(req, res, (err: any) => {
            if (err) {
                return reject(new Error('파일 업로드 중 오류 발생: ' + err.message));
            }

            const file = req.file;
            if (!file) {
                return reject(new Error('파일이 업로드되지 않았습니다.'));
            }

            const folderName = 'productSearch';
            const fileName = `${Date.now()}-${file.originalname}`;

            const params = {
                Bucket: process.env.BUCKET ?? '',
                Key: `${folderName}/${fileName}`,
                Body: file.buffer,
            };

            s3.upload(params, (err: any, data: any) => {
                if (err) {
                    return reject(new Error('S3 업로드 실패: ' + err.message));
                }

                resolve(data.Location);
            });
        });
    });
};