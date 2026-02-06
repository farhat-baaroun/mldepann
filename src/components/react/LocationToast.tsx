import { memo } from 'react'

interface LocationToastProps {
  locationError?: string
  userLocation?: {lat: number; lng: number} | null
}

const LocationToast = memo(function LocationToast({ locationError, userLocation }: LocationToastProps) {
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

