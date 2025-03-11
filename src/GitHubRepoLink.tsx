import { FaGithub } from "react-icons/fa";

export function GitHubRepoLink() {
    return (
        <a
            href="https://github.com/YOUR_GITHUB_REPO" // Replace with your actual GitHub repo link
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-4 right-4 bg-gray-800 hover:bg-gray-700
                 text-white font-bold py-3 px-4 rounded-full shadow-lg
                 flex items-center gap-2 transition-transform transform hover:scale-105"
        >
            <FaGithub className="text-2xl" />
        </a>
    );
}
