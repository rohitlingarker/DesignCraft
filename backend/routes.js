// Import required modules
const express = require('express');
const path = require('path');
const ejs = require("ejs")
const generateContent = require('./utils/textGen')
const picGenerator = require('./utils/picGen')
const session = require('express-session');
const AdmZip = require('adm-zip')
const fs = require('fs')


// Create a new router instance
const router = express.Router();

// Define route handlers
router.get('/', (req, res) => {
  res.render("./themes/01.ejs",{
    pageTitle:"hom e page",
    navbarLink1:"Home",
    navbarLink2:"Home",
    navbarLink3:"Home",
    navbarLink4:"Home",
    carouselImage1: "carouselImage1",
    carouselImage2: "carouselImage2",
    carouselImage3: "carouselImage3",
    carouselImageTitle1 : "carouselImageTitle1",
    carouselImageTitle2 : "carouselImageTitle2",
    carouselImageTitle3 : "carouselImageTitle3",
    carouselImageDescription1 :"carouselImageDescription1 ",
    carouselImageDescription2 :"carouselImageDescription2 ",
    carouselImageDescription3 :"carouselImageDescription3 ",
    mainTitle :"mainTitle ",
    subTitle :"subTitle ",
    mainContent :"mainContent ",
    galleryImageTitle1:"galleryImageTitle1",
    galleryImageTitle2:"galleryImageTitle2",
    galleryImageTitle3:"galleryImageTitle3",
    galleryImage1 :"galleryImage1 ",
    galleryImage2 :"galleryImage2 ",
    galleryImage3 :"galleryImage3 ",
    finalImage :"finalImage "
  })
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
  console.log(req.session.content);
  ejs.renderFile(path.join(__dirname, 'views','themes','01.ejs'), req.session.content, (err, html) => {
      if (err) {
          console.error('Error rendering EJS:', err);
          res.status(500).send('Internal Server Error');
          return;
      }

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
  });
});




// Export the router
module.exports = router;
