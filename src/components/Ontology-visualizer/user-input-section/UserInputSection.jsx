import { Fragment } from 'react';

export default function UserInputSection({
	selectedNode,
	newNode,
	newLinkSourceNode,
	graphData,
	newLinkTargetNode,
	searchNodeId,
	createNewNode,
	setNewLinkSource,
	setSearchNodeId,
	handleAddNode,
	setGraphData,
	handleAddLink,
	css,
	handleSearchNode,
	nodesPositions,
	canvasRef,
	setNewLinkTarget,
}) {
	function handleReset() {
		canvasRef?.current?.zoomToFit(800);
	}
	return (
		<>
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
						<button onClick={handleReset}>Reset</button>
						<br />
						<div style={{ maxHeight: '100px', overflowY: 'scroll' }}>
							Results:
							{searchNodeId &&
								graphData.nodes.map((node) => (
									<Fragment key={node?.id}>
										{(node?.id.toLowerCase().includes(searchNodeId) ||
											node?.name.toLowerCase().includes(searchNodeId)) && (
											<div
												onClick={() =>
													handleSearchNode(node?.id, nodesPositions, canvasRef)
												}
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
		</>
	);
}
