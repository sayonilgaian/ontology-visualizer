import ForceGraph3D from 'react-force-graph-3d';
import generateRandomNodesLinks from '../utils/generateRandomNodesLinks';

export default function Sample() {
    let data = generateRandomNodesLinks()
    console.log(data)
	return (
		<div>
			<ForceGraph3D graphData={data} />
		</div>
	);
}
