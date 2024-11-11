import axios from "axios";
import { useState } from "react";

function App() {
	const [originalUrl, setOriginalUrl] = useState("");
	const [shortID, setShortID] = useState("");

	const handleShorten = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("/api/shorten", { originalURL: originalUrl });
			setShortID(response.data.shortID);
		} catch (error) {
			console.error("Error shortening URL:", error);
		}
	};

	const copyToClipboard = (url) => {
		navigator.clipboard.writeText(url);
		alert('Copied the URL to clipboard!');
	};

	return (
		<div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
			<p className="mt-24 text-4xl font-bold text-blue-400">Mini URL</p>
			<div className="mt-10 flex flex-col items-center w-full px-4">
				<form className="w-full max-w-lg flex flex-col md:flex-row gap-4 items-center" onSubmit={handleShorten}>
					<input
						className="p-3 bg-gray-800 border border-gray-600 rounded-full text-white w-full focus:outline-none focus:border-blue-500 transition-all"
						type="text"
						value={originalUrl}
						onChange={(e) => setOriginalUrl(e.target.value)}
						placeholder="Enter URL"
					/>
					<button 
						className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-500 transition-all"
					>
						Submit
					</button>
				</form>
				{shortID && (
					<div className="mt-8 p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-lg text-center w-full max-w-lg">
						<p className="text-gray-400 mb-2">Shortened URL:</p>
						<div className="flex items-center justify-center gap-2">
							<input
								className="p-2 bg-gray-900 border border-gray-700 rounded-full text-center text-white w-full"
								type="text"
								value={`http://localhost:3000/${shortID}`}
								readOnly
							/>
							<button
								className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-500 transition-all"
								onClick={() => copyToClipboard(`http://localhost:3000/${shortID}`)}
							>
								Copy
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
