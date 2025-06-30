export default function Image() {
  const images = document.querySelectorAll(
    ".image"
  ) as NodeListOf<HTMLDivElement>

  if (!images.length) {
    return
  }

  images.forEach((div) => {
    const img = div.querySelector("img") as HTMLImageElement
    if (!img) return

    function loaded() {
      img.classList.remove("opacity-0")
      img.classList.add("opacity-100")
      // Remove background image with multiple approaches to ensure it works
      div.style.backgroundImage = "none"
      div.style.setProperty("background-image", "none", "important")
      // Add a class that can be targeted in CSS
      div.classList.add("image-loaded")
      // Set data attribute to indicate image is loaded
      div.setAttribute("data-loaded", "true")
    }

    if (img.complete) {
      loaded()
    } else {
      img.addEventListener("load", loaded)
    }
  })
}
