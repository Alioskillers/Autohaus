const express = require('express');
const uploadFromUrl = require('../utils/uploadFromUrl');

const router = express.Router();

router.post('/upload-from-url', async (req, res) => {
    const { image } = req.body;
  
    if (!image) return res.status(400).json({ error: 'Image URL is required' });
  
    try {
      const s3Url = await uploadFromUrl(image);
      res.status(200).json({ image: s3Url });
    } catch (err) {
      console.error('❌ Error uploading from URL:', err);
      res.status(500).json({ error: 'Upload failed' });
    }
  });

  module.exports = router;