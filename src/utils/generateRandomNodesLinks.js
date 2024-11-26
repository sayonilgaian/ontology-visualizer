export default function generateRandomNodesLinks(n = 100) {
	let temp = [];
	for (let i = 0; i < n; i++) {
		temp.push(i + 1);
	}
	const nodes = temp.map((i) => {
		return { id: i };
	});
	const links = temp.map((i) => {
		return {
			target: i,
			source: Math.max(parseInt(Math.random() * n), 1),
		};
	});
	return { nodes, links };
}
