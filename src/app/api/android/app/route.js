import fs from 'fs';
import path from 'path';

export async function GET(NextRequest) {

    const filePath = path.join(process.cwd(), 'src', 'app', 'assets', 'zane.apk');

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return Response.status(404).json({ message: 'File not found', statusCode: 404 });
    }
  
    // Set headers for file download
    Response.setHeader('Content-Disposition', 'attachment; filename="zane.apk"');
    Response.setHeader('Content-Type', 'application/vnd.android.package-archive');
  
    // Read the file and serve it
    fs.createReadStream(filePath).pipe(Response);

    // Return success message and newly created chat object
    return Response.json({
      message: "Successfull",

      statusCode: 200,
    });

}
