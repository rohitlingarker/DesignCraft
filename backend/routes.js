// Import required modules
const express = require('express');
const path = require('path');
const generateContent = require('./utils/textGen')

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

router.get( '/textgen' , async function( req , res ) {
  const generatedContent = await generateContent();
   res.render("./themes/01.ejs",generatedContent);
} );



// Export the router
module.exports = router;
