import { v4 as uuid } from 'uuid';

export default function handleAddNode(setGraphData, newNode) {
	setGraphData((prev) => {
		let newNodes = [
			...prev?.nodes,
			{
				id: uuid(),
				name: newNode?.name,
				val: newNode?.val,
				color: 'orange',
			},
		];
		return {
			nodes: newNodes,
			links: prev?.links,
		};
	});
}
