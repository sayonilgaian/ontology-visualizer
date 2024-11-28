export default function handleSearchNode(nodeId,nodesPositions, ref) {
	const cameraDistance = 100;
	if (nodesPositions.size > 0) {
		let selectedNodePosition = [
			nodesPositions.get(nodeId)?.x,
			nodesPositions.get(nodeId)?.y,
			nodesPositions.get(nodeId)?.z,
		];
		// console.log(selectedNodePosition);
		ref.current?.cameraPosition(
			{
				x: selectedNodePosition[0],
				y: selectedNodePosition[1],
				z: selectedNodePosition[2] + cameraDistance,
			},
			{
				x: selectedNodePosition[0],
				y: selectedNodePosition[1],
				z: selectedNodePosition[2],
			},
			500
		);
	}
}
