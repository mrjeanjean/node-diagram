export const createTextarea = (defaultValue: string | null, onInput: Function): HTMLElement => {
    const $controlWrapper = document.createElement("div");
    const $controlInput = document.createElement("textarea");

    $controlInput.classList.add("node-control", "node-control-textarea");
    $controlInput.value = defaultValue ?? "";
    $controlInput.disabled = true;

    const onDisable = () => {
        $controlInput.disabled = true;
        window.getSelection()?.empty();
    }

    const onActive = () => {
        $controlInput.disabled = false;
        $controlInput.focus();
        $controlInput.select();
    }

    $controlWrapper.addEventListener("dblclick", onActive);
    $controlInput.addEventListener("blur", onDisable);

    $controlInput.addEventListener("input", (e) => {
        onInput($controlInput.value);
    })

    $controlWrapper.appendChild($controlInput)

    return $controlWrapper;
}
