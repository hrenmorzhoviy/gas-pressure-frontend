import type { SyntheticEvent } from 'react'

export function fallbackImage(event: SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget
  if (image.getAttribute('src') !== '/default.png') image.src = '/default.png'
}

export function fallbackVideo(event: SyntheticEvent<HTMLVideoElement>) {
  const video = event.currentTarget
  if (video.getAttribute('src') !== '/default.mp4') {
    video.src = '/default.mp4'
    video.load()
  }
}
