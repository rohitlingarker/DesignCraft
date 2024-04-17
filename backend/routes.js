// Import required modules
const express = require('express');
const path = require('path');
const ejs = require("ejs")
const generateContent = require('./utils/textGen')
const picGenerator = require('./utils/picGen')
const AdmZip = require('adm-zip')
const fs = require('fs')


// Create a new router instance
const router = express.Router();

// Define route handlers
router.get('/', (req, res) => {
  if (req.session.content) {
  res.render("./themes/01.ejs",req.session.content)
  }else{
    res.send("frontnd gen api")
  }
});

const generateImages = async (generatedContent)=>{
  await picGenerator("carouselImage1",generatedContent.carouselImage1GenPrompt,"768x480");
  await picGenerator("carouselImage2",generatedContent.carouselImage2GenPrompt,"768x480");
  await picGenerator("carouselImage3",generatedContent.carouselImage3GenPrompt,"768x480");
  await picGenerator("galleryImage1",generatedContent.galleryImage1GenPrompt,"255x255");
  await picGenerator("galleryImage2",generatedContent.galleryImage2GenPrompt,"255x255");
  await picGenerator("galleryImage3",generatedContent.galleryImage3GenPrompt,"255x255");
  await picGenerator("finalImage",generatedContent.finalImage,"600x300")
}

router.get( '/textgen/:userPrompt' , async function( req , res ) {
  const generatedContent = await generateContent(req.params.userPrompt);
  await generateImages(generatedContent);
  req.session.content=generatedContent;
  res.render("./themes/01.ejs",generatedContent);
} );

router.get('/download', (req, res) => {
  // Render the EJS template
  ejs.renderFile(path.join(__dirname, 'views','themes','01.ejs'), req.session.content, (err, html) => {
      if (err) {
          console.error('Error rendering EJS:', err);
          res.status(500).send('Internal Server Error');
          return;
      }

      try {
          // Create a zip file
          const zip = new AdmZip();
          zip.addFile('index.html', Buffer.alloc(html.length, html), 'Generated HTML');

          // Add images to the zip file
          const imageDir = path.join(__dirname, 'public', 'images');
          const imageFiles = fs.readdirSync(imageDir);
          imageFiles.forEach((file) => {
              zip.addLocalFile(path.join(imageDir, file), 'images');
          });

          // Send the zip file to the client
          const zipName = 'download.zip';
          const zipData = zip.toBuffer();
          res.set('Content-Disposition', `attachment; filename="${zipName}"`);
          res.set('Content-Type', 'application/zip');
          res.set('Content-Length', zipData.length);
          res.send(zipData);
      } catch (zipError) {
          console.error('Error creating zip file:', zipError);
          res.status(500).send('Internal Server Error');
      }
  });
});





// Export the router
module.exports = router;
