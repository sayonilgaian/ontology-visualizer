export default function handleEngineStop(graphData, setNodesPositions) {
	const temp = graphData.nodes.map((node) => ({
		id: node.id,
		name: node.name,
		val: node.val,
		type: node.type,
		x: node.x, // Position calculated by the engine
		y: node.y,
		z: node.z,
	}));
	let tempMap = new Map();
	for (let i = 0; i < temp.length; i++) {
		if (!tempMap.has(temp[i].id)) {
			tempMap.set(temp[i].id, {
				x: temp[i].x,
				y: temp[i].y,
				z: temp[i].z,
			});
		}
	}
	setNodesPositions(tempMap);
}
