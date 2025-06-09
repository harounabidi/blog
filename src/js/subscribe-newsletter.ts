export class SubscribeToNewsletter {
  private form: HTMLFormElement | null =
    document.querySelector("#subscribe-form")
  private loader: SVGAElement | null =
    document.querySelector("#subscribe-loader")
  private button: SVGAElement | null =
    document.querySelector("#subscribe-plane")

  constructor() {
    this.init()
  }

  public init(): void {
    this.form?.addEventListener("submit", (event) => {
      event.preventDefault()
      this.handleSubmit()
    })
  }

  private async handleSubmit() {
    const formData = new FormData(this.form!)

    this.loader?.classList.add("visible")
    this.loader?.classList.remove("invisible")
    this.button?.classList.add("invisible")

    try {
      const response = await fetch("/subscribe", {
        method: "POST",
        body: formData,
      })

      // Log any errors for debugging, but always redirect to thank you page
      if (!response.ok) {
        const errorData = await response.json()
        console.error("Subscription error:", errorData)
      }
    } catch (error) {
      console.error("Network error:", error)
    }

    // Always redirect to thank you page regardless of response
    window.location.href = "/thank-you"
  }
}
