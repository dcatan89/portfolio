'use client'
import { motion } from 'motion/react'
import type { ReactNode } from 'react'

export function AnimatedCard({
  children,
  index,
  className,
}: {
  children: ReactNode
  index: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
