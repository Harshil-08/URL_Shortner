import { nanoid } from 'nanoid';
import URL from '../models/urlModel.js';

const baseUrl = 'https://mini-url';

const shortenUrl = async (req, res) => {
  const { originalID } = req.body;

  try {
    let url = await URL.findOne({ originalID });

    if (url) {
      res.json(url);
    } else {
      const shortID = nanoid(8);
      const shortUrl = `${baseUrl}/${shortID}`;

      url = new URL({
        originalID,
        shortID
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
    const url = await URL.findOne({ shortID });

    if (url) {
      return res.redirect(url.originalID);
    } else {
      return res.status(404).json({ message: 'URL not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { shortenUrl, redirectToOriginalUrl };
