// controllers/galleryController.js
exports.getGallery = (req, res) => {
    const images = [
      '/images/image1.png',
      '/images/image2.png',
      '/images/image3.png',
      '/images/image4.png',
      '/images/image5.png'
    ];
    res.render('gallery', { images });
  };