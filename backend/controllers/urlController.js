import { nanoid } from 'nanoid';
import URL from '../models/urlModel.js';

const baseUrl = 'https://mini-url';

const shortenUrl = async (req, res) => {
  const { originalURL } = req.body; // Change from originalID to originalURL

  try {
    let url = await URL.findOne({ originalURL });

    if (url) {
      res.json(url);
    } else {
      const shortID = nanoid(8);
      const shortUrl = `${baseUrl}/${shortID}`;

      url = new URL({
        originalURL,
        shortURL: shortUrl
      });

      await url.save();
      res.json(url);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

const redirectToOriginalUrl = async (req, res) => {
  const { shortID } = req.params;

  try {
    const url = await URL.findOne({ shortURL: `${baseUrl}/${shortID}` });

    if (url) {
      return res.redirect(url.originalURL);
    } else {
      return res.status(404).json({ message: 'URL not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { shortenUrl, redirectToOriginalUrl };
