import ForceGraph3D from 'react-force-graph-3d';
import generateRandomNodesLinks from '../utils/generateRandomNodesLinks';
import css from './sample.module.css';
import { useState } from 'react';
// import data from '../data/data.json';

export default function Sample() {
	let data = generateRandomNodesLinks();
	let [graphData, setGraphData] = useState(data);
	let [selectedNode, setSelectedNode] = useState(data.nodes[0]?.id);
	let [nodeInfo, setNodeInfo] = useState();
	function handleNodeClick(node, event) {
		setSelectedNode(node?.id);
		setNodeInfo(data.nodes.filter((node) => node?.id === selectedNode)[0]);
	}

	function handleChange(event) {
		setSelectedNode(Math.min(event.target.value, data.nodes.length));
	}

	return (
		<div className={css.container}>
			<ForceGraph3D
				graphData={graphData}
				width={800}
				height={500}
				onNodeClick={handleNodeClick}
			/>
			<div>
				Selected node: {selectedNode}
				<br />
				{nodeInfo && (
					<>
						Node details:
						<br />
						id: {nodeInfo?.id} <br />
						value: {nodeInfo?.val} <br />
						name: {nodeInfo?.name} <br />
						type: {nodeInfo?.type}
					</>
				)}
				<br />
			</div>
		</div>
	);
}
