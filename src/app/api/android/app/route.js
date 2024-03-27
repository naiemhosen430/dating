import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed', statusCode: 405 });
  }

  const filePath = path.join(process.cwd(), 'src', 'app', 'assets', 'zane.apk');

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'File not found', statusCode: 404 });
  }

  // Set headers for file download
  res.setHeader('Content-Disposition', 'attachment; filename="zane.apk"');
  res.setHeader('Content-Type', 'application/vnd.android.package-archive');

  // Read the file and serve it
  fs.createReadStream(filePath).pipe(res);

  // Return success message
  return res.status(200).json({ message: 'Download successful', statusCode: 200 });
}
