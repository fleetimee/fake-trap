"use client"

import { useCallback, useEffect, useState, type PropsWithChildren } from "react"
import { signOut, useSession } from "next-auth/react"

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function debounceLeading<T extends (...args: any[]) => ReturnType<T>>(
  callback: T,
  timeout = 300
) {
  let timer: NodeJS.Timeout | undefined
  return (...args: Parameters<T>) => {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      callback(...args)
      timer = undefined
    }, timeout)
  }
}

const debounceUpdate = debounceLeading((callback: () => void) => {
  callback()
}, 10000)

const _storageKey = "_lastActivity"
// on mount, we will listen to several possible "interactive" events
const windowEvents: WindowActivityEvent[] = [
  "focus",
  "scroll",
  "click",
  "mousemove",
]

function storage() {
  return global.window !== undefined ? window.localStorage : null
}

function activity() {
  return new Date().getTime()
}

const parseLastActivityString = (activityStr?: string | null) => {
  if (!activityStr) return null

  const lastActivity = +activityStr

  const now = activity()

  if (
    lastActivity == null ||
    lastActivity > now ||
    lastActivity <= 0 ||
    Number.isNaN(lastActivity)
  ) {
    // note: some of these conditions could actually mean
    // someone is trying to tamper with your activity timer
    // use with caution
    return null
  }

  return lastActivity
}

const initLastActivity = () => {
  const now = activity()

  const lastActivityStr = storage()?.getItem(_storageKey)

  const lastActivity = parseLastActivityString(lastActivityStr)

  return lastActivity == null ? now : lastActivity
}

type WindowActivityEvent = keyof WindowEventMap

interface AutoLogoutProviderProps extends PropsWithChildren {
  timeoutMs?: number
  timeoutCheckMs?: number
  debug?: boolean
  requireSession?: boolean
}

export function AutoLogoutProvider({
  timeoutMs = 600000, // Inactivity time
  timeoutCheckMs = 10000, // Time out to check
  debug = true,
  requireSession = false,
  children,
}: AutoLogoutProviderProps) {
  const [lastActivity, setLastActivity] = useState(() => initLastActivity())
  const { data: session, status } = useSession({ required: requireSession })

  const isUserInactive = useCallback(() => {
    const now = activity() // Ensure this returns the current time in milliseconds

    console.log("Session:", session)
    console.log("Status:", status)

    if (status === "authenticated") {
      console.log("Session user expires:", session.user.expires)

      let expiry: number

      if (session?.user?.expires) {
        expiry = new Date(session.user.expires).getTime()

        console.log("Expiry time:", expiry)
      } else {
        // Set a fixed expiry time if it doesn't exist
        expiry = new Date().getTime() + 60 * 1000 // 60 seconds from now
        session.user.expires = new Date(expiry).toISOString() // Update the session with the new expiry time

        console.log("Expiry time:", expiry)
      }

      console.log("Expiry time:", expiry)
      console.log("Current time:", now)

      if (now > expiry) {
        console.log("User has expired", expiry, now)

        if (debug) {
          console.error("User has expired", expiry, now)
        }
        signOut()
        return true
      }
    }

    if (lastActivity + timeoutMs < now) {
      if (debug) console.error("User inactive", lastActivity, now)
      signOut()
      return true
    }
    return false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debug, lastActivity, session?.user.expires, status, timeoutMs])

  //   const onUserActivity = useCallback(() => {
  //     return debounceUpdate(() => {
  //       const now = activity()

  //       if (debug) console.log("activity - resetting last activity to ", now)
  //       storage()?.setItem(_storageKey, now.toString())
  //       setLastActivity(now)
  //     })
  //   }, [debug])

  useEffect(() => {
    if (status === "loading") return
    if (status === "unauthenticated") return

    // no timer has been initialized
    if (timeoutMs === null) {
      return
    }

    // if user is already inactive, do not init
    if (isUserInactive()) {
      return
    }

    const onStorage = ({ key, storageArea, newValue }: StorageEvent) => {
      if (key === _storageKey && storageArea === storage()) {
        // some debugging lines
        if (debug)
          console.log(
            "remote tab activity - resetting last activity to ",
            newValue
          )
        const lastActivity = parseLastActivityString(newValue)

        if (lastActivity !== null) {
          setLastActivity(lastActivity)
        }
      }
    }

    const onTimerElapsed = () => isUserInactive()

    // windowEvents.forEach((eventName) => {
    //   window.addEventListener(eventName, onUserActivity, false)
    // })

    // we will use localStorage to determine activity
    window.addEventListener("storage", onStorage, false)

    // initialize an interval to check activity
    const intervalId = window.setInterval(onTimerElapsed, timeoutCheckMs)

    return () => {
      // detach and destroy listeners on deconstructor
      //   windowEvents.forEach((eventName) => {
      //     window.removeEventListener(eventName, onUserActivity, false)
      //   })

      window.removeEventListener("storage", onStorage, false)

      window.clearInterval(intervalId)
    }
  }, [debug, status, timeoutCheckMs, timeoutMs, isUserInactive])

  return children
}
