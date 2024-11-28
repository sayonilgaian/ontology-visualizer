import ForceGraph3D from 'react-force-graph-3d';
import generateRandomNodesLinks from './utils/generateRandomNodesLinks';
import css from './Ontology-visualizer.module.css';
import { Fragment, useEffect, useRef, useState } from 'react';
import handleNodeDelete from './utils/graph-interactions/deleteNode';
// import handleRevert from '../utils/graph-interactions/revertChange';
import handleDeleteLink from './utils/graph-interactions/deleteLink';
import data from './utils/data/data.json';
// import data from '../data/bigData.json';
import handleAddNode from './utils/graph-interactions/addNode';
import { v4 as uuid } from 'uuid';
import handleAddLink from './utils/graph-interactions/addLink';
import handleEngineStop from './utils/graph-interactions/engineStop';
import handleSearchNode from './utils/graph-interactions/searchNode';
import UserInputSection from './user-input-section/UserInputSection';

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
	let [canvasRendered, setCanvasRendered] = useState(false);
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

	useEffect(() => {
		// async function saveData() {
		// 	let data = generateRandomNodesLinks();
		// 	console.log(JSON.stringify(data, undefined, 4));
		// 	setGraphData(data);
		// }
		// saveData();
		sessionStorage.setItem('previous', JSON.stringify(graphData));
		setCanvasRendered(true);
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
				onEngineStop={() => handleEngineStop(graphData, setNodesPositions)}
			/>
			{/* ============== Interactions ================= */}
			{canvasRendered && (
				<UserInputSection
					selectedNode={selectedNode}
					newNode={newNode}
					newLinkSourceNode={newLinkSourceNode}
					graphData={graphData}
					newLinkTargetNode={newLinkTargetNode}
					searchNodeId={searchNodeId}
					createNewNode={createNewNode}
					setNewLinkSource={setNewLinkSource}
					setSearchNodeId={setSearchNodeId}
					handleAddNode={handleAddNode}
					setGraphData={setGraphData}
					handleAddLink={handleAddLink}
					css={css}
					handleSearchNode={handleSearchNode}
					nodesPositions={nodesPositions}
					canvasRef={ref}
					setNewLinkTarget={setNewLinkTarget}
				/>
			)}
		</div>
	);
}