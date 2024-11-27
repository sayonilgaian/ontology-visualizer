import ForceGraph3D from 'react-force-graph-3d';
import generateRandomNodesLinks from '../utils/generateRandomNodesLinks';
import css from './sample.module.css';
import { useEffect, useState } from 'react';
import handleNodeDelete from '../utils/graph-interactions/deleteNode';
// import handleRevert from '../utils/graph-interactions/revertChange';
import handleDeleteLink from '../utils/graph-interactions/deleteLink';
import data from '../data/data.json';
// import data from '../data/bigData.json';
import handleAddNode from '../utils/graph-interactions/addNode';
import { v4 as uuid } from 'uuid';
import handleAddLink from '../utils/graph-interactions/addLink';

export default function Sample() {
	let [graphData, setGraphData] = useState(data);
	let [selectedNode, setSelectedNode] = useState();
	let [newNode, setNewNode] = useState({
		name: '',
		val: '',
	});
	let [newLinkSourceNode, setNewLinkSource] = useState(graphData?.nodes[0]?.id);
	let [newLinkTargetNode, setNewLinkTarget] = useState(graphData?.nodes[1]?.id);

	function handleNodeClick(selectedNode, event) {
		event.stopPropagation();
		setSelectedNode(
			data.nodes.filter((node) => node?.id === selectedNode?.id)[0]
		);
	}

	function createNewNode(event, type) {
		if (type === 'name') {
			setNewNode((prev) => ({ name: event.target.value, val: prev.val }));
		}
		if (type === 'value') {
			setNewNode((prev) => ({
				name: prev.name,
				val: parseInt(event.target.value) || 10,
			}));
		}
	}

	useEffect(() => {
		// async function saveData() {
		// 	let data = generateRandomNodesLinks();
		// 	console.log(JSON.stringify(data, undefined, 4));
		// 	setGraphData(data);
		// }
		// saveData();
		sessionStorage.setItem('previous', JSON.stringify(graphData));
	}, []);

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
				onLinkRightClick={(link, event) =>
					handleDeleteLink(link, event, setGraphData)
				}
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
				{/* <br />
				<button onClick={() => handleRevert(setGraphData)}>
					Revert Change
				</button> */}
				<br />
				<button onClick={() => handleAddNode(setGraphData, newNode)}>
					Add Node
				</button>
				<input
					type="text"
					value={newNode.name}
					placeholder="node name"
					onChange={(e) => createNewNode(e, 'name')}
				/>
				<input
					type="number"
					value={newNode.val}
					placeholder="node radius (optional)"
					onChange={(e) => createNewNode(e, 'value')}
				/>
				<br /> <br />
				<div>
					<button
						onClick={() =>
							handleAddLink(setGraphData, newLinkSourceNode, newLinkTargetNode)
						}>
						Add Link
					</button>
					<br />
					Source:{' '}
					<select
						type="text"
						value={newLinkSourceNode?.id}
						placeholder="node name"
						onChange={(e) => setNewLinkSource(e.target.value?.split(' : ')[1])}>
						{graphData?.nodes.map((node) => (
							<option key={node?.id}>{node?.name + ' : ' + node?.id}</option>
						))}
					</select>
					<br />
					Target{' '}
					<select
						type="text"
						value={newLinkTargetNode?.id}
						placeholder="node name"
						onChange={(e) => setNewLinkTarget(e.target.value?.split(' : ')[1])}>
						{graphData?.nodes.map((node) => (
							<option key={node?.id}>{node?.name + ' : ' + node?.id}</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
}
