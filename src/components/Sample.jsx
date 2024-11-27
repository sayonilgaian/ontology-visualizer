import ForceGraph3D from 'react-force-graph-3d';
import generateRandomNodesLinks from '../utils/generateRandomNodesLinks';
import css from './sample.module.css';
import { useState } from 'react';
import handleNodeDelete from '../utils/graph-interactions/deleteNode';
// import data from '../data/data.json';

export default function Sample() {
	let data = generateRandomNodesLinks();
	let [graphData, setGraphData] = useState(data);
	let [selectedNode, setSelectedNode] = useState(data.nodes[0]);

	function handleNodeClick(selectedNode, event) {
		event.stopPropagation();
		setSelectedNode(
			data.nodes.filter((node) => node?.id === selectedNode?.id)[0]
		);
	}

	return (
		<div className={css.container}>
			<ForceGraph3D
				graphData={graphData}
				width={800}
				height={500}
				onNodeClick={handleNodeClick}
				onNodeRightClick={(node, event) =>
					handleNodeDelete(node, event, setGraphData)
				}
				// onLinkRightClick={handleLinkDelete}
			/>
			<div>
				Selected node: {selectedNode?.id}
				<br /> <br />
				<>
					Node details:
					<br />
					id: {selectedNode?.id} <br />
					value: {selectedNode?.val} <br />
					name: {selectedNode?.name} <br />
					type: {selectedNode?.type}
				</>
				<br />
			</div>
		</div>
	);
}
