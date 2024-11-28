import ForceGraph3D from 'react-force-graph-3d';
import generateRandomNodesLinks from './utils/generateRandomNodesLinks';
import css from './Ontology-visualizer.module.css';
import { Fragment, useEffect, useRef, useState } from 'react';
import handleNodeDelete from './utils/graph-interactions/deleteNode';
// import handleRevert from '../utils/graph-interactions/revertChange';
import handleDeleteLink from './utils/graph-interactions/deleteLink';
import data from '../../data/data.json';
// import data from '../data/bigData.json';
import handleAddNode from './utils/graph-interactions/addNode';
import { v4 as uuid } from 'uuid';
import handleAddLink from './utils/graph-interactions/addLink';

export default function OntologyVisualizer() {
	let [graphData, setGraphData] = useState(data);
	let [selectedNode, setSelectedNode] = useState();
	let [newNode, setNewNode] = useState({
		name: '',
		val: '',
	});
	let [newLinkSourceNode, setNewLinkSource] = useState(graphData?.nodes[0]?.id);
	let [newLinkTargetNode, setNewLinkTarget] = useState(graphData?.nodes[1]?.id);
	let [searchNodeId, setSearchNodeId] = useState('');
	let [nodesPositions, setNodesPositions] = useState(new Map());
	let [selectedSearchNode, setSelectedSearchNode] = useState('');
	let ref = useRef();

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

	function handleSearchNode(nodeId) {
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

	function handleEngineStop() {
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
			{/* ============== Actual Canvas ================= */}
			<ForceGraph3D
				ref={ref}
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
				cooldownTime={1000}
				onEngineStop={handleEngineStop}
			/>
			{/* ============== Interactions ================= */}
			<div>
				{/* ============== Node details ================= */}
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
				{/* ============== Add node ================= */}
				<button onClick={() => handleAddNode(setGraphData, newNode)}>
					Add Node
				</button>
				<br />
				<input
					type="text"
					value={newNode.name}
					placeholder="node name"
					onChange={(e) => createNewNode(e, 'name')}
				/>
				<br />
				<input
					type="number"
					value={newNode.val}
					placeholder="node radius (optional)"
					onChange={(e) => createNewNode(e, 'value')}
				/>
				<br /> <br />
				{/* ============== Add Link ================= */}
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
					{/* ============== Search node ================= */}
					<br />
					<br />
					<div>
						<input
							type="text"
							value={searchNodeId}
							onChange={(e) => setSearchNodeId(e.target.value.toLowerCase())}
						/>
						<br />
						<div style={{ maxHeight: '100px', overflowY: 'scroll' }}>
							Results:
							{searchNodeId &&
								graphData.nodes.map((node) => (
									<Fragment key={node?.id}>
										{(node?.id.toLowerCase().includes(searchNodeId) ||
											node?.name.toLowerCase().includes(searchNodeId)) && (
											<div
												onClick={() => handleSearchNode(node?.id)}
												className={css.search_node_result}>
												{node?.name} : {node?.id}
											</div>
										)}
									</Fragment>
								))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
