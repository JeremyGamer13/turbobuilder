<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function event() {
        dispatch("click");
    }
</script>

<button on:click={event}>
    <b>
        <slot />
    </b>
</button>

<style>
    button {
        position: relative;

        height: 100%;
        padding: 0 0.75rem;

        display: flex;
        flex-direction: row;
        align-items: center;

        font-weight: bold;
        font-size: 0.75rem;
        color: white;
        background: transparent;
        cursor: pointer;
        border: 0;
    }
    button:hover {
        background: rgba(0, 0, 0, 0.2);
    }
    :global(body.dark) button:hover {
        background: rgba(255, 255, 255, 0.2);
    }
</style>
