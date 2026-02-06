import { memo } from 'react'
import { Send } from 'lucide-react'

const ContactForm = memo(function ContactForm() {
  return (
    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-brand-gray mb-2">
          Nom
        </label>
        <input
          id="name"
          type="text"
          className="form-input"
          placeholder="Votre nom"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-brand-gray mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="form-input"
          placeholder="votre@email.com"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-brand-gray mb-2">
          Téléphone
        </label>
        <input
          id="phone"
          type="tel"
          className="form-input"
          placeholder="Votre téléphone"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-brand-gray mb-2">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          className="form-input resize-none"
          placeholder="Décrivez votre problème..."
        />
      </div>
      <button
        type="submit"
        className="w-full btn-primary py-4"
        aria-label="Envoyer le message"
      >
        <Send className="w-5 h-5" />
        Envoyer le message
      </button>
    </form>
  )
})

export default ContactForm

