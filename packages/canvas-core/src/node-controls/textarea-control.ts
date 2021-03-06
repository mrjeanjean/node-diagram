export const createTextarea = (
    defaultValue: string | null,
    onInput: Function,
    data: { placeholder ?: string } = {}): HTMLElement => {

    const $controlWrapper = document.createElement("div");
    const $controlInput = document.createElement("textarea");

    $controlInput.classList.add("node-control", "node-control--textarea");
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

    $controlWrapper.addEventListener("mousedown", (e) => {
        e.stopPropagation();
    })

    $controlWrapper.addEventListener("dblclick", onActive);
    $controlInput.addEventListener("blur", onDisable);

    $controlInput.addEventListener("keypress", (e: KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            onDisable();
            e.preventDefault();
        }
    });
    $controlInput.addEventListener("input", (e) => {
        onInput($controlInput.value);
    })

    $controlInput.addEventListener("wheel", (e)=>{
        if($controlInput.disabled){
            e.preventDefault();
        }else{
            e.stopPropagation();
        }
    })

    $controlWrapper.appendChild($controlInput)

    return $controlWrapper;
}
