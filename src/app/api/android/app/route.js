import fs from 'fs';
import path from 'path';

export async function getHandler(req, res) {
  const filePath = path.join(process.cwd(), 'src', 'app', 'assets', 'zane.apk');

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'File not found', statusCode: 404 });
  }

  try {
    const fileContent = fs.readFileSync(filePath);

    res.setHeader('Content-Disposition', 'attachment; filename="zane.apk"');
    res.setHeader('Content-Type', 'application/vnd.android.package-archive');

    res.send(fileContent);

  } catch (error) {
    console.error('Error occurred while serving file:', error);
    return res.status(500).json({ message: 'Internal Server Error', statusCode: 500 });
  }
}
