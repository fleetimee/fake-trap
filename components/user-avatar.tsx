import { AvatarProps } from "@radix-ui/react-avatar"
import { User } from "next-auth"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/icons"

/**
 * Props for the UserAvatar component.
 * @interface UserAvatarProps
 * @extends AvatarProps
 */
interface UserAvatarProps extends AvatarProps {
  /**
   * The user object containing the user's name and image.
   * @type {Pick<User, "name" | "image">}
   */
  user: Pick<User, "name" | "image">
}

/**
 * Renders an avatar for a user, with fallback to a default icon if no image is provided.
 * @param user - The user object containing the user's name and image.
 * @param props - Additional props to pass to the Avatar component.
 * @returns A React component representing the user's avatar.
 */
export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage alt="Picture" src={user.image} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  )
}
