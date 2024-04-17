/* eslint-disable */
const request = require('supertest');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const {rimraf} = require('rimraf');

const app = require('../index');

describe('File System Interaction', () => {
  // Clean up generated images directory before running tests
  beforeAll(async () => {
    const imagesDir = path.join(__dirname, '../public/images/');
    await rimraf(imagesDir);
  });

  // Test image generation
  describe('Image Generation', () => {
    it('generates images for carousel and gallery', async () => {
      // Perform a request to trigger image generation
      await request(app).get('/textgen/test');

      // Check if images are generated in the correct directory
      const imagesDir = path.join(__dirname, '../public/images/');
      const imageFiles = fs.readdirSync(imagesDir);
      expect(imageFiles).toContain('carouselImage1.jpeg');
      expect(imageFiles).toContain('carouselImage2.jpeg');
      expect(imageFiles).toContain('carouselImage3.jpeg');
      expect(imageFiles).toContain('galleryImage1.jpeg');
      expect(imageFiles).toContain('galleryImage2.jpeg');
      expect(imageFiles).toContain('galleryImage3.jpeg');
    });

    it('generates a final image', async () => {
      // Check if the final image is generated in the correct directory
      const imagesDir = path.join(__dirname, '../public/images/');
      const imageFiles = fs.readdirSync(imagesDir);
      expect(imageFiles).toContain('finalImage.jpeg');
    });
  });

  
});

