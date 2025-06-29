export default function Image() {
  const div = document.querySelector(".image") as HTMLDivElement

  if (!div) {
    return
  }

  const img = div.querySelector("img") as HTMLImageElement

  function loaded() {
    img.classList.remove("opacity-0")
  }

  if (img.complete) {
    loaded()
  } else {
    img.addEventListener("load", loaded)
  }
}
