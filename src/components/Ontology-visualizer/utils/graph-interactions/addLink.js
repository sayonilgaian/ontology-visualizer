export default function handleAddLink(
	setGraphData,
	sourceNodeId,
	targetNodeId,
	linkName = 'link'
) {
	setGraphData((prev) => {
		let newLinks = [
			...prev?.links,
			{
				target: targetNodeId,
				source: sourceNodeId,
				name: linkName,
			},
		];

		return {
			nodes: prev?.nodes,
			links: newLinks,
		};
	});
}
