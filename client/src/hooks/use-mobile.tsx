import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = React.useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < MOBILE_BREAKPOINT
    }
    return false
  })

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }

    // Set initial value
    setIsMobile(mediaQuery.matches)

    // Listen to changes
    mediaQuery.addEventListener("change", handleChange)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  return isMobile
}
