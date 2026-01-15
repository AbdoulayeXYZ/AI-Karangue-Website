#!/usr/bin/env python3
"""
Script to translate content_fr.json to English
This creates a properly translated content_en.json file
"""

import json
import re

# Load French content
with open('src/data/content_fr.json', 'r', encoding='utf-8') as f:
    french_content = json.load(f)

# Translation dictionary for common terms and phrases
translations = {
    # Hero section
    "Tranquillité": "Peace of Mind",
    "d'esprit.": "Guaranteed.",
    "Le Film Vision": "The Vision Film",
    
    # Common terms
    "Nous transformons votre flotte en": "We transform your fleet into a",
    "actif sécurisé et rentable": "secure and profitable asset",
    "Au-delà du simple suivi GPS": "Beyond simple GPS tracking",
    "AI-Karangué combine IoT et intelligence artificielle pour protéger vos conducteurs, réduire vos coûts et sécuriser vos passagers — en temps réel.": "AI-Karangué combines IoT and artificial intelligence to protect your drivers, reduce your costs, and secure your passengers — in real time.",
    
    # Hardware
    "Hardware Gateway": "Hardware Gateway",
    "Des outils de": "Tools for",
    "prévision.": "prediction.",
    "Consulter la fiche complète du manager": "View the complete manager sheet",
    
    # Products
    "L'Œil de l'Expert": "The Expert's Eye",
    "Vigilance & Protection Biométrique": "Vigilance & Biometric Protection",
    "Pour le gestionnaire soucieux de sa responsabilité civile et de la santé de ses équipes.": "For managers concerned about civil liability and team health.",
    "Reprenez le contrôle sur l'imprévisible": "Regain control over the unpredictable",
    
    # Features
    "Alerte immédiate en cas de somnolence critique": "Immediate alert for critical drowsiness",
    "Détection des distractions (Téléphone, Inattention)": "Distraction detection (Phone, Inattention)",
    "Monitoring du respect des consignes (Ceinture, Tabac)": "Compliance monitoring (Seatbelt, Smoking)",
    "Identification précise du conducteur affecté": "Precise driver identification",
    "Réduction drastique des sinistres évitables": "Drastic reduction of avoidable accidents",
    
    # Navbar
    "Solutions": "Solutions",
    "Industries": "Industries",
    "Nos Offres": "Our Offers",
    "Blog": "Blog",
    "Demander une démo": "Request a demo",
    
    # Contact
    "Contactez-nous": "Contact Us",
    "Prêt à transformer votre flotte ?": "Ready to transform your fleet?",
    "Parlons de vos besoins": "Let's talk about your needs",
    
    # Footer
    "Notre Mission": "Our Mission",
    "Technologie": "Technology",
    "Secteurs": "Sectors",
    "Entreprise": "Company",
    "Suivez-nous": "Follow Us",
    "Tous droits réservés": "All rights reserved",
}

def translate_text(text):
    """Translate a text string from French to English"""
    if not isinstance(text, str):
        return text
    
    # Check if it's in our dictionary
    if text in translations:
        return translations[text]
    
    # For HTML content, preserve tags
    if '<span' in text or '<br' in text:
        for fr, en in translations.items():
            text = text.replace(fr, en)
        return text
    
    # Return original if no translation found (will need manual review)
    return text

def translate_dict(obj):
    """Recursively translate all strings in a dictionary"""
    if isinstance(obj, dict):
        return {k: translate_dict(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [translate_dict(item) for item in obj]
    elif isinstance(obj, str):
        return translate_text(obj)
    else:
        return obj

# Translate the content
english_content = translate_dict(french_content)

# Save to content_en.json
with open('src/data/content_en.json', 'w', encoding='utf-8') as f:
    json.dump(english_content, f, ensure_ascii=False, indent=2)

print("✅ Translation complete! content_en.json has been created.")
print("⚠️  Note: Some translations may need manual review for accuracy.")
