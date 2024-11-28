export default function handleDeleteLink(selectedLink, event, setGraphData) {
	event.stopPropagation();
	setGraphData((prev) => {
		// note: a link can be uniquely identified with its source and target.
		// (given there is only one link between 2 nodes)
		let newLinks = prev?.links?.filter(
			(link) =>
				link?.source?.id !== selectedLink?.source?.id &&
				link?.target?.id !== selectedLink?.target?.id
		);
		return {
			nodes: prev?.nodes,
			links: newLinks,
		};
	});
}
