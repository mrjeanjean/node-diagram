export const createInput = (
    defaultValue: string | null,
    onInput: Function,
    data: { placeholder ?: string } = {}
): HTMLElement => {
    const $controlWrapper = document.createElement("div");
    const $controlInput = document.createElement("input");

    $controlInput.classList.add("node-control", "node-control--input");
    $controlInput.value = defaultValue ?? "";
    $controlInput.disabled = true;
    $controlInput.placeholder = data.placeholder ?? "";

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
    $controlInput.addEventListener("keypress", (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            onDisable();
        }

    });

    $controlInput.addEventListener("input", (e) => {
        onInput($controlInput.value);
    });

    $controlWrapper.addEventListener("mousedown", (e) => {
        e.stopPropagation();
    });

    $controlWrapper.appendChild($controlInput)

    return $controlWrapper;
}
