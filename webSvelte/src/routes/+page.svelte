<script lang="ts">
  import type { Calculation } from "$lib/types";
        $: result = 0;
        $: input1 = 10;
        $: input2 = 2;
        $: special = 1;
        $: operator = "multiply";
        $: server = "127.0.0.1:3001";
        $: calculations = [] as Calculation[];

        function addCalculation(){
            calculations = [...calculations, {input1,input2,special,operator,server,result}];
        }
</script>

<style>
    h1 {
        text-align: center;
        color: #333;
    }

    label {
        display: block;
        margin-bottom: 10px;
        font-weight: bold;
    }

    input[type="text"] {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        margin-bottom: 20px;
    }

    button {
        background-color: #4CAF50;
        color: white;
        padding: 12px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background-color: #45a049;
    }

    #timer,
    #result {
        text-align: center;
        font-size: 24px;
        margin-bottom: 20px;
    }

    .radio {
        display: flex;
        justify-content: flex-start;
        gap: 10px;
        align-items: baseline;
    }
</style>

<div>
    <h1>Calculon 2.0</h1>
    <label for="input1">Input 1:</label>
    <input type="text" class="input"  name="input1" bind:value={input1}>
    <label for="input2">Input 2:</label>
    <input type="text" class="input" name="input2" bind:value={input2}>

    <label for="operator">Operator:</label>
    <div class="radio">
        <label for="multiply">Multiply</label>
        <input type="radio" id="multiply" name="operator" value="multiply" bind:group={operator}>
        <label for="divide">Divide</label>
        <input type="radio" id="divide" name="operator" value="divide" bind:group={operator}>
    </div>
    <label for="special">Special sauce:</label>
    <input type="text" class="input" name="special" bind:value={special}>
    <label for="server">Server:</label>
    
    <input type="text" class="input" name="server" bind:value={server}>

    <button id="calculate" on:click={addCalculation}>Calculate</button>

    {#each calculations as calculation}
        <div>
            <p>Input 1: {calculation.input1}</p>
            <p>Input 2: {calculation.input2}</p>
            <p>Special sauce: {calculation.special}</p>
            <p>Operator: {calculation.operator}</p>
            <p>Server: {calculation.server}</p>
            <p>Result: {calculation.result}</p>
        </div>
    {/each}
</div>

