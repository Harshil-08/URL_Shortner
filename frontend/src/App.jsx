import axios from "axios";
import { useState } from "react";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortID, setShortID] = useState("");

  const handleShorten = async () => {
    try {
			const response = await axios.post('https://miniurl-xyz.vercel.app/shorten', { originalURL: originalUrl });
    setShortID(response.data.shortID);
    }catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  return (
    <>
			<div className="flex flex-col justify-center item-center">
				<p className="font-bold text-4xl">Mini URL</p>
				<div className="flex">
					<input
						type="text"
						value={originalUrl}
						onChange={(e) => setOriginalUrl(e.target.value)}
						placeholder="Enter URL to shorten"
					/>
					<button onClick={handleShorten}>Shorten</button>
					{shortID && (
						<div>
							<p>Shortened ID:</p>
							<p>https://miniurl-xyz.vercel.app/{shortID}</p>
						</div>
					)}
				</div>
			</div>
    </>
  );
}

export default App;
