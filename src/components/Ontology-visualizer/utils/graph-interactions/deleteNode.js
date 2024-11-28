export default function handleNodeDelete(selectedNode, event, setGraphData) {
	event.stopPropagation();
	setGraphData((prev) => {
		// step 1: remove all links connected to selected node
		let newLinks = prev.links.filter(
			(link) =>
				link.target?.id !== selectedNode?.id &&
				link.source?.id !== selectedNode?.id
		);
		// step 2: now delete selected node from nodes array
		let newNodes = prev.nodes.filter((node) => node?.id !== selectedNode?.id);
		// save last step do be used for reverting later
		sessionStorage.setItem('previous', JSON.stringify(prev));
		return {
			nodes: newNodes,
			links: newLinks,
		};
	});
}
