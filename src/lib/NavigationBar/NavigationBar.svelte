<script>
    // Components
    import Divider from "$lib/NavigationBar/Divider.svelte";
</script>

<div class="nav">
    <img
        src="/images/icon.png"
        alt="Logo"
        class="logo-margin"
        style="height: 100%;"
    />
    <Divider />
    <slot />
</div>

<style>
    :root {
        --nav-height: 3rem;
    }

    .nav {
        position: fixed;
        left: 0px;
        top: 0px;
        width: calc(100% - 8px);
        height: calc(var(--nav-height) - 8px);

        padding: 4px;

        display: flex;
        flex-direction: row;
        align-items: center;

        background: #ff4b4b;
    }
    .logo-margin {
        margin-right: 8px;
    }
</style>
