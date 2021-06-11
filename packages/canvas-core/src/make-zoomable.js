import {clamp} from "./helpers";

export const makeZoomable = ($element, $target) => {
    const style = getComputedStyle($target)
    const matrix = new DOMMatrixReadOnly(style.transform)
    let zoom = matrix.a;

    const onMouseWheel = (e)=>{
        const style = getComputedStyle($target)
        const matrix = new DOMMatrixReadOnly(style.transform);
        zoom += (e.deltaY * -1) / 800;
        zoom = clamp(zoom, 0.1, 4);
        $target.style.transform = `translate(${matrix.e}px, ${matrix.f}px) scale(${zoom})`
    }

    $element.addEventListener("wheel", onMouseWheel);

    return {
        getCurrentZoom: ()=>{
            return zoom;
        }
    }
}
