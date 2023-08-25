<script>
    // Components
    import Divider from "$lib/NavigationBar/Divider.svelte";

    const switchTheme = () => {
        const id = "tb:theme";
        const currentData = localStorage.getItem(id);
        if (currentData === "dark") {
            localStorage.setItem(id, "");
        } else {
            localStorage.setItem(id, "dark");
        }
        window.themeUpdated_();
        console.log(
            "switched theme to",
            currentData === "dark" ? "light" : "dark"
        );
    };
</script>

<div class="nav">
    <img
        src="/favicon_any.png"
        alt="Logo"
        class="logo-margin"
        style="height: 30px;"
    />
    <button class="theme-switcher" on:click={switchTheme}>
        <img src="/images/theme_switcher.svg" alt="Theme Switcher" />
    </button>
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
        width: 100%;
        height: var(--nav-height);

        display: flex;
        flex-direction: row;
        align-items: center;

        background: #ff4b4b;
    }
    .logo-margin {
        margin: 0 6px;
        margin-left: 10px;
    }
    .theme-switcher {
        background: transparent;
        height: 100%;
        border: 0;
        margin: 0;
        cursor: pointer;
    }
    .theme-switcher:hover {
        background: rgba(0, 0, 0, 0.2);
    }
    .theme-switcher > img {
        width: 28px;
        height: 28px;
    }

    :global(body.dark) .theme-switcher:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    :global(body.dark) .nav {
        background: #333;
    }
</style>
