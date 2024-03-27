import fs from 'fs';
import path from 'path';

export async function GET(NextRequest, NextResponse) {

    const filePath = path.join(process.cwd(), 'src', 'app', 'assets', 'zane.apk');

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.status(404).json({ message: 'File not found', statusCode: 404 });
    }
  
    // Set headers for file download
    NextResponse.setHeader('Content-Disposition', 'attachment; filename="zane.apk"');
    NextResponse.setHeader('Content-Type', 'application/vnd.android.package-archive');
  
    // Read the file and serve it
    fs.createReadStream(filePath).pipe(NextResponse);

    // Return success message and newly created chat object
    return NextResponse.json({
      message: "Successfull",

      statusCode: 200,
    });

}
