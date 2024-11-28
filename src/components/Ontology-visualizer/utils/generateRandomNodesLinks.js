import { v4 as uuid } from 'uuid';

export default function generateRandomNodesLinks(n = 10000) {
	const nodes = Array(n)
		.fill('')
		.map((i) => {
			let nodeType = Math.random() * 100 > 50 ? 'parent' : 'child';
			return {
				id: uuid(),
				name: 'Test',
				val: nodeType === 'parent' ? 50 : 10,
				type: nodeType,
				color: nodeType === 'parent' ? 'green' : 'white',
				resolution: 64,
			};
		});
	const links = nodes.map((node) => {
		let randomSourceNode = nodes.filter((node1) => node1?.id !== node.id)[
			Math.min(parseInt(Math.random() * n), n - 2)
		];
		return {
			target: node.id,
			source: randomSourceNode?.id,
			name: 'link',
			// width: 100,
		};
	});
	// return { nodes, links };
	return { nodes: nodes, links: links };
}
