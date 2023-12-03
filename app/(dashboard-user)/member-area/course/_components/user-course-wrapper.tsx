"use client"

import { Variants } from "framer-motion"

import { UserEnrolledCourseListRes } from "@/types/me/res"
import { CourseCard } from "@/components/course-card"
import { MotionDiv } from "@/components/framer-wrapper"





const parentVariant: Variants = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.8,
    },
  },
}

const childrenVariant: Variants = {
  initial: {
    opacity: 0,
    y: -100,
    rotate: -90,
  },
  animate: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      bounce: 0.25,
      velocity: 2,
    },
  },
}

interface UserCourseWrapperProps {
  userEnrolledCourseResp: UserEnrolledCourseListRes
}

export function UserCourseWrapper({
  userEnrolledCourseResp,
}: UserCourseWrapperProps) {
  return (
    <MotionDiv
      variants={parentVariant}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 items-start justify-between gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
    >
      {userEnrolledCourseResp.data.map((course) => (
        <MotionDiv
          variants={childrenVariant}
          className="child"
          whileHover={{
            scale: 1.05,
          }}
        >
          <CourseCard
            courseResponse={course}
            key={course.id_course}
            link={`/member-area/course/${course.id_course}`}
          />
        </MotionDiv>
      ))}
    </MotionDiv>
  )
}
