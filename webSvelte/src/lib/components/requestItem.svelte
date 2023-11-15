<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { Calculation } from "$lib/types/types";
	export let totalTime: number;
	export let item: Calculation;
	const dispatch = createEventDispatcher();

	function deleteCalculation() {
		dispatch("deleteCalculation", item);
	}

	async function sentRequest() {
		console.log("sent request");
		let url = "http://" + item.server + "/" + item.operator + "?a=" + item.input1 + "&b=" + item.input2 + "&special=" + item.special;
		console.log(url);

		// Start timer
		var timer = setInterval(function () {
			item.time++;
		}, 1);

		// Force new TCP connection
		let headers = new Headers();
		headers.append("Connection", "close");
		fetch(url, { headers: headers })
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				item.result = data.result;
				item.podName = data.podName.split("-")[2];
				clearInterval(timer);
        item.waiting = false;
			})
			.catch((error) => {
        console.error("Error:", error);
				clearInterval(timer);
				item.result = "Error";
        item.waiting = false;
			});
	}

	// Send async request on new worker
	Promise.resolve().then(() => {
		sentRequest();
	});
</script>

<div class="row">
	<div class="item">{item.input1}</div>
	<div class="item">{item.operator}</div>
	<div class="item">{item.input2}</div>
	<div class="item">{item.result == 0 ? "Waiting!" : item.result}</div>
	<div class="item">{item.special}</div>
	<div class="item">{item.podName == "" ? "Waiting!" : item.podName}</div>
	<div class="item">{item.time / 100} s</div>
	<div class="item">
		<button class="button" on:click={deleteCalculation}>Delete</button>
	</div>
</div>

<style>
	.row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem;
		border-bottom: 1px solid #ccc;
	}
	.item {
		flex: 1;
		border: #ccc 1px solid;
		height: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.button {
		background-color: rgb(175, 79, 76);
		border: none;
		color: white;
		padding: 5px 10px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 12px;
		margin: 2px 2px;
		cursor: pointer;
	}
</style>
