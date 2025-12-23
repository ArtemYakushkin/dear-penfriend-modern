export const getPollPercentage = (pollVotes, index) => {
	const totalVotes = pollVotes.reduce((acc, v) => acc + v, 0);
	if (totalVotes === 0) return 0;
	return Math.round((pollVotes[index] / totalVotes) * 100);
};
