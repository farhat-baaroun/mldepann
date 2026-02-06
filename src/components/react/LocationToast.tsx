import { memo, useEffect, useState } from 'react'

interface LocationToastProps {
  locationError?: string
  userLocation?: {lat: number; lng: number} | null
}

const LocationToast = memo(function LocationToast({ locationError, userLocation }: LocationToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (locationError || userLocation) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 5000) // Hide after 5 seconds

      return () => clearTimeout(timer)
    }
  }, [locationError, userLocation])

  if (!isVisible) {
    return null
  }

  if (locationError) {
    return (
      <div className="location-toast location-error">
        {locationError}
      </div>
    )
  }

  if (userLocation && !locationError) {
    return (
      <div className="location-toast location-success">
        ✓ Position activée - vos coordonnées seront envoyées
      </div>
    )
  }

  return null
})

export default LocationToast

