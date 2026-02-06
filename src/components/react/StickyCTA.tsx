import { useState } from 'react'
import { Phone, MessageCircle, Navigation } from 'lucide-react'
import LocationToast from './LocationToast'

interface StickyCTAProps {
  phoneNumber?: string
  phoneLink?: string
}

export default function StickyCTA({ 
  phoneNumber = '06 89 08 76 23',
  phoneLink = 'tel:+33689087623'
}: StickyCTAProps) {
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null)
  const [locationError, setLocationError] = useState<string>('')
  const [isLocating, setIsLocating] = useState(false)

  const snapchatLink = 'https://snapchat.com'
  const defaultMessage = 'je suis ici je besoin de votre service'

  // Get user location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('La géolocalisation n\'est pas supportée par votre navigateur')
      return
    }

    setIsLocating(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        setLocationError('')
        setIsLocating(false)
      },
      (error) => {
        setIsLocating(false)
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Veuillez autoriser l\'accès à votre position')
            break
          case error.POSITION_UNAVAILABLE:
            setLocationError('Position non disponible')
            break
          case error.TIMEOUT:
            setLocationError('Délai d\'attente dépassé')
            break
          default:
            setLocationError('Erreur de géolocalisation')
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )
  }

  // Build WhatsApp link with location
  const getWhatsAppLink = () => {
    let message = defaultMessage
    if (userLocation) {
      message += ` - Ma position: https://maps.google.com/?q=${userLocation.lat},${userLocation.lng}`
    }
    return `https://wa.me/33689087623?text=${encodeURIComponent(message)}`
  }

  // Build Snapchat share link (using web intent)
  const getSnapchatLink = () => {
    // Snapchat doesn't have a direct web message API, so we open the app
    // User will need to manually share location
    return snapchatLink
  }

  return (
    <>
      {/* Sticky 3-CTA Bar - All Devices */}
      <div className="sticky-cta-all" role="group" aria-label="Actions rapides">
        {/* Location Button */}
        <button
          onClick={getUserLocation}
          className={`btn-cta-locate ${userLocation ? 'btn-located' : ''}`}
          aria-label={userLocation ? 'Position activée' : 'Activer ma position'}
          disabled={isLocating}
        >
          <Navigation className={`w-5 h-5 ${isLocating ? 'animate-spin' : ''}`} />
          <span>{isLocating ? '...' : userLocation ? '✓' : 'Loc'}</span>
        </button>

        {/* Call Button */}
        <a
          href={phoneLink}
          className="btn-cta-call"
          aria-label="Appeler maintenant"
        >
          <Phone className="w-5 h-5" />
          <span>Call</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cta-whatsapp"
          aria-label="Contacter sur WhatsApp avec ma position"
        >
          <MessageCircle className="w-5 h-5" />
          <span>WhatsApp</span>
        </a>

        {/* Snapchat Button */}
        <a
          href={getSnapchatLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cta-snapchat"
          aria-label="Contacter sur Snapchat"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.206 1c.577 0 2.553.166 4.115 1.816.872.918 1.316 2.168 1.316 3.712 0 .316-.021.629-.062.935.364.202.777.316 1.214.316a2.63 2.63 0 0 0 2.627-2.629A2.63 2.63 0 0 0 18.789 2.52a.4.4 0 0 1-.117-.795 3.43 3.43 0 0 1 3.433 3.433c0 1.784-1.368 3.254-3.108 3.41a4.67 4.67 0 0 1-.405 2.026c-.625 1.329-1.818 2.2-3.443 2.528-.13.026-.22.146-.204.278.018.132.132.23.265.23h.026c1.768-.087 3.236.356 4.265 1.283.776.698 1.176 1.618 1.176 2.666 0 .24-.019.486-.057.731a.4.4 0 0 1-.458.336.402.402 0 0 1-.336-.458c.03-.198.045-.4.045-.609 0-.778-.293-1.436-.87-1.955-.787-.707-1.972-1.054-3.424-.988-.57.028-1.06-.404-1.088-.974a1.003 1.003 0 0 1 .888-1.074c1.684-.354 2.83-1.168 3.406-2.42.405-.87.39-1.83-.042-2.72a.4.4 0 0 1 .353-.588c.054 0 .108.01.158.032 1.24.52 2.09 1.527 2.336 2.758.052.258.078.522.078.788 0 .217-.016.433-.047.646a2.63 2.63 0 0 0 1.858 3.182.4.4 0 0 1-.206.772 3.43 3.43 0 0 1-3.06-2.744 3.43 3.43 0 0 1-2.156.76c-.585 0-1.147-.148-1.65-.428-.216 1.296-1.09 2.36-2.352-2.832a.4.4 0 0 0-.524.386c0 .045.008.09.023.132.258.712.388 1.46.388 2.224 0 .13-.006.26-.018.39-.012.13.074.248.2.28 1.624.4 2.817 1.272 3.442 2.6a4.67 4.67 0 0 0 .405 2.026 3.43 3.43 0 0 1-3.108 3.41c0 1.784 1.368 3.254 3.108 3.41a4.67 4.67 0 0 1-.405 2.026c-.625 1.329-1.818 2.2-3.443 2.528-.13.026-.22.146-.204.278.018.132.132.23.265.23h.026c1.768-.087 3.236.356 4.265 1.283.776.698 1.176 1.618 1.176 2.666 0 .24-.019.486-.057.731a.4.4 0 0 1-.458.336.402.402 0 0 1-.336-.458c.03-.198.045-.4.045-.609 0-.778-.293-1.436-.87-1.955-.787-.707-1.972-1.054-3.424-.988-.57-.028-1.06.404-1.088-.974a1.003 1.003 0 0 1 .888 1.074c1.684-.354 2.83-1.168 3.406-2.42.405-.87.39-1.83-.042-2.72a.4.4 0 0 0 .353.588c.054 0 .108-.01.158-.032 1.24-.52 2.09-1.527 2.336-2.758.052.258.078.522.078.788 0 .217-.016.433-.047.646z"/>
          </svg>
          <span>Snap</span>
        </a>
      </div>

      {/* Location Status Toast */}
      <LocationToast locationError={locationError} userLocation={userLocation} />
    </>
  )
}

