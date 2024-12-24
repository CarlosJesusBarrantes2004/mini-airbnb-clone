import imageDownloader from 'image-downloader';
import path from 'path';
import fs from 'fs';

const __dirname = path.resolve();
const uploadsFolderPath = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsFolderPath)) {
  fs.mkdirSync(uploadsFolderPath);
}

export const uploadByLink = async (req, res, next) => {
  const { link } = req.body;

  try {
    const fileName = `photo-${Date.now()}.jpg`;
    const filePath = path.join(uploadsFolderPath, fileName);

    const options = {
      url: link,
      dest: filePath,
    };

    await imageDownloader.image(options);

    res.json(fileName);
  } catch (error) {
    next(error);
  }
};

export const uploadFromDevice = async (req, res, next) => {
  try {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      const newPath = path + '.' + ext;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace('uploads\\', ''));
    }
    res.json(uploadedFiles);
  } catch (error) {
    next(error);
  }
};
