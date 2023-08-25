<script>
    import { createEventDispatcher, onMount } from "svelte";
    import EventManager from "../../resources/events";
    import ModalScript from "./createblock.js";
    import ColorUtil from "./color.js";

    import Blockly from "blockly/core";
    const Theme = Blockly.Theme.defineTheme("MakeABlockTheme", {
        base: Blockly.Themes.Classic,
        blockStyles: {
            core_makeablock_test: {
                colourPrimary: "#ff0000",
                colourSecondary: "#00ff00",
                colourTertiary: "#0000ff",
            },
        },
        fontStyle: {
            family: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            weight: "600",
            size: 12,
        },
        startHats: true,
    });

    import En from "blockly/msg/en";
    import "blockly/blocks";

    import BlocklyComponent from "svelte-blockly";

    const en = {
        rtl: false,
        msg: {
            ...En,
        },
    };

    const config = {
        scrollbars: true,
        disable: false,
        theme: Theme,
        renderer: "zelos",
        grid: {
            spacing: 25,
            length: 3,
            colour: "#00000011",
            snap: false,
        },
        zoom: {
            controls: true,
            wheel: false,
            startScale: 1.2,
            maxScale: 4,
            minScale: 0.25,
            scaleSpeed: 1.1,
        },
        move: {
            scrollbars: {
                horizontal: true,
                vertical: true,
            },
            drag: true,
            wheel: true,
        },
    };

    let workspace;
    const defaultWorkspaceXML = `<xml><block type="core_builderblock" /></xml>`;

    const validation = {
        id: (id) => {
            return !String(id).match(/[^a-zA-Z0-9_]+/gim);
        },
    };

    onMount(() => {
        EventManager.allowAttachment();
        EventManager.on(EventManager.EVENT_THEME_CHANGED, () => {
            workspace.refreshTheme();
        });
    });

    export let color1 = "#ff0000";
    export let color2 = "#00ff00";
    export let color3 = "#0000ff";
    let visible = false;

    function generateColor3(color1) {
        const rgb = ColorUtil.hexToRGB(color1);
        const r = Math.max(0, rgb.r - 51);
        const g = Math.max(0, rgb.g - 51);
        const b = Math.max(0, rgb.b - 51);
        return ColorUtil.rgbToHex(r, g, b);
    }
    function getBlockStyle() {
        return {
            colourPrimary: color1,
            colourSecondary: color2,
            colourTertiary: color3 ? color3 : generateColor3(color1),
        };
    }

    function getDefaultState() {
        return {
            block: {
                id: "",
            },
        };
    }
    const dispatch = createEventDispatcher();
    let state = getDefaultState();

    function event() {
        // validate all
        if (!state.block.id || !validation.id(state.block.id)) {
            return alert("Block ID is either invalid or not set.");
        }
        // set state
        dispatch("completed", state);
        visible = false;
    }
    function cancel() {
        dispatch("cancel");
        visible = false;
    }

    ModalScript.onopened = () => {
        // create block style
        Theme.blockStyles["core_makeablock_colors"] = getBlockStyle();
        console.log(Theme);
        workspace.refreshTheme();

        visible = true;
        state = getDefaultState();

        // reset & load
        workspace.clear();
        const newXml = Blockly.utils.xml.textToDom(defaultWorkspaceXML);
        Blockly.Xml.domToWorkspace(newXml, workspace);

        // modify block
        const block = workspace.getAllBlocks()[0];
        block.setStyle("core_makeablock_colors");
        block.setEditable(false);
        block.setMovable(false);
        block.setDeletable(false);
        console.log(block);

        // center
        workspace.centerOnBlock(block.id, true);
        setTimeout(() => {
            workspace.centerOnBlock(block.id, true);
            block.setStyle("core_makeablock_colors");
        }, 50);
    };
</script>

<div class="bg" style={visible ? "" : "display:none"}>
    <div class="modal">
        <div class="modal-title">
            <p>Make a Block</p>
        </div>
        <div class="modal-content">
            <div class="blockly-wrapper">
                <BlocklyComponent {config} locale={en} bind:workspace />
            </div>
            <div class="button-space">
                <input
                    type="text"
                    placeholder="Block ID (ex: numberIsWithinNumbers)"
                    class="block-id"
                    data-invalid={!validation.id(state.block.id)}
                    bind:value={state.block.id}
                />
                {#if !validation.id(state.block.id)}
                    <p class="block-id-warning">
                        Block ID can only contain letters A-Z, numbers 0-9, and
                        the _ symbol.
                    </p>
                {:else}
                    <br />
                {/if}
                <div
                    style="display: flex; flex-direction: row; justify-content: center;"
                >
                    <button class="block-addition">
                        Add Text label
                        <div style="height:4px" />
                        <img
                            alt="Label"
                            src="/images/blockBuilder/block_label.svg"
                            height={50}
                        />
                    </button>
                    <button class="block-addition">
                        Add Text input
                        <div style="height:4px" />
                        <img
                            alt="Text input"
                            src="/images/blockBuilder/block_input_text.svg"
                            height={50}
                        />
                    </button>
                    <button class="block-addition">
                        Add Number input
                        <div style="height:4px" />
                        <img
                            alt="Number input"
                            src="/images/blockBuilder/block_input_number.svg"
                            height={50}
                        />
                    </button>
                    <button class="block-addition">
                        Add Boolean input
                        <div style="height:4px" />
                        <img
                            alt="Boolean input"
                            src="/images/blockBuilder/block_boolean.svg"
                            height={50}
                        />
                    </button>
                    <button class="block-addition">
                        Add Color input
                        <div style="height:4px" />
                        <img
                            alt="Color input"
                            src="/images/blockBuilder/block_input_color.svg"
                            height={50}
                        />
                    </button>
                </div>
                <div
                    style="display: flex; flex-direction: row; justify-content: center;"
                >
                    <details>
                        <summary>Advanced Inputs</summary>
                        <button class="block-addition">
                            Add Angle input
                            <div style="height:4px" />
                            <img
                                alt="Angle input"
                                src="/images/blockBuilder/block_input_angle.svg"
                                height={50}
                            />
                        </button>
                        <button class="block-addition">
                            Add Matrix input
                            <div style="height:4px" />
                            <img
                                alt="Matrix input"
                                src="/images/blockBuilder/block_input_matrix.svg"
                                height={50}
                            />
                        </button>
                        <button class="block-addition">
                            Add Note input
                            <div style="height:4px" />
                            <img
                                alt="Note input"
                                src="/images/blockBuilder/block_input_note.svg"
                                height={50}
                            />
                        </button>
                        <button class="block-addition">
                            Add Image label
                            <div style="height:4px" />
                            <!-- svelte-ignore a11y-img-redundant-alt -->
                            <img
                                alt="Image Label"
                                src="/images/blockBuilder/block_label_image.svg"
                                height={50}
                            />
                        </button>
                        <button class="block-addition">
                            Add Empty input
                            <div style="height:4px" />
                            <img
                                alt="Empty Input"
                                src="/images/blockBuilder/block_empty.svg"
                                height={50}
                            />
                        </button>
                        <button class="block-addition">
                            Use Enum Name
                            <div style="height:4px" />
                            <img
                                alt="Empty"
                                src="/images/blockBuilder/block_label_none.svg"
                                height={50}
                            />
                        </button>
                    </details>
                </div>
            </div>
        </div>
        <div class="modal-buttons">
            <button class="button-cancel" on:click={cancel}>Cancel</button>
            <div style="margin-left:6px" />
            <button class="button-accept" on:click={event}>OK</button>
            <div style="margin-left:24px" />
        </div>
    </div>
</div>

<style>
    .button-cancel {
        border: 1px solid rgba(0, 0, 0, 0.15);
        background: white;
        color: black;
        font-weight: bold;
        padding: 0.75rem 1rem;
        border-radius: 0.25rem;
        font-size: 0.85rem;
        cursor: pointer;
    }
    .button-accept {
        border: 1px solid #ff4b4b;
        background: #ff4b4b;
        color: white;
        font-weight: bold;
        padding: 0.75rem 1rem;
        border-radius: 0.25rem;
        font-size: 0.85rem;
        cursor: pointer;
    }

    .blockly-wrapper {
        width: 100%;
        height: 70%;
    }
    .button-space {
        width: 100%;
        height: 30%;
    }

    .bg {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        background: #ff4b4bb0;
        z-index: 999999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .modal {
        width: 60%;
        height: 80%;
        outline: 4px solid hsla(0, 100%, 100%, 0.25);
        border-radius: 0.5rem;
        background: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
    }
    :global(body.dark) .bg {
        background-color: #333333b0;
    }
    :global(body.dark) .modal {
        background-color: #111;
    }

    .modal-title {
        width: 100%;
        height: 7%;
        background: #ff4b4b;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    :global(body.dark) .modal-title {
        background-color: #333;
    }
    .modal-content {
        width: 100%;
        height: 83%;
        overflow: auto;
    }
    .modal-buttons {
        width: 100%;
        height: 10%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
    }

    .block-id {
        width: 90%;
        height: 24px;
        margin-top: 4px;
        margin-left: 5%;
        border-radius: 1024px;
        text-align: center;
        border: 1px solid rgba(0, 0, 0, 0.2);
        outline: 0px solid #ff4b4b44;
        transition: 0.25s linear;
    }
    .block-id:focus,
    .block-id:active {
        border: 1px solid #ff4b4b;
        outline: 4px solid #ff4b4b44;
        transition: 0.25s linear;
    }
    :global(body.dark) .block-id {
        background: transparent;
        border-color: rgba(255, 255, 255, 0.7);
        color: white;
    }
    .block-id[data-invalid="true"] {
        background-color: #ffabab;
        text-decoration: red underline;
    }
    :global(body.dark) .block-id[data-invalid="true"] {
        background-color: #9b0000 !important;
        text-decoration: red underline;
    }

    .block-id-warning {
        width: 100%;
        margin-block: 0;
        margin: 8px 0px;
        text-align: center;
        font-weight: bold;
    }

    .block-addition {
        background: transparent;
        font-weight: bold;
        margin: 5px;
        padding: 8px 32px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 12px;
        cursor: pointer;
    }
    :global(body.dark) .block-addition {
        color: white;
        border-color: #ccc;
    }
    .block-addition:focus,
    .block-addition:hover {
        border-color: #ff4b4b !important;
    }
    .block-addition:active {
        border-color: black !important;
    }
    :global(body.dark) .block-addition:active {
        border-color: rgb(114, 114, 114) !important;
    }
</style>
