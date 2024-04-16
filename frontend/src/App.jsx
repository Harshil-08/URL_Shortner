import axios from "axios";
import { useState } from "react";

function App() {
	const [originalUrl, setOriginalUrl] = useState("");
	const [shortID, setShortID] = useState("");

	const handleShorten = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('https://miniurl-xyz.vercel.app/shorten', { originalURL: originalUrl });
			setShortID(response.data.shortID);
		}catch (error) {
			console.error('Error shortening URL:', error);
		}
	};

	const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    alert('Copied the URL to clipboard!');
  };

	return (
		<>
			<p className="mt-32 flex justify-center font-bold text-4xl">Mini URL</p>
			<div className="mt-10 flex flex-col justify-center items-center">
				<form className="md:w-1/2 flex justify-center gap-2 items-center" onSubmit={handleShorten}>
					<input
						className="p-2 outline-none rounded-full border-2 w-full"
						type="text"
						value={originalUrl}
						onChange={(e) => setOriginalUrl(e.target.value)}
						placeholder="Enter URL"
					/>
					<button 
						className="p-2 rounded-xl text-white font-semibold bg-black"
						>
						Submit
					</button>
				</form>
				<div className="md:w-1/2 flex flex-col justify-center">
					<p className="text-slate-500">ShortUrl: </p>
						<div className="flex">
							<input
							  className="p-2 outline-none rounded-full border-2 w-full"
								id="shortUrlInput"
								type="text"
								value={`https://miniurl-xyz.vercel.app/${shortID}`}
								readOnly
							/>
							<button
								className="p-2 rounded-xl text-white font-semibold bg-black ml-2"
								onClick={() => copyToClipboard(`https://miniurl-xyz.vercel.app/${shortID}`)}
							>
								Copy
							</button>
						</div>
				</div>
			</div>
		</>
	);
}

export default App;
