export default function handleRevert(setGraphData) {
	setGraphData(JSON.parse(sessionStorage.getItem('previous')));
    console.log(JSON.parse(sessionStorage.getItem('previous')))
}
