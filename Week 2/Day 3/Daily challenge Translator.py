french_to_english = {
    'Bonjour': 'Hello',
    'Au revoir': 'Goodbye',
    'Bienvenue': 'Welcome',
    'A bientôt': 'See you soon',
}

french_words = ['Bonjour', 'Au revoir', 'Bienvenue', 'A bientôt']
translations = {
    word: french_to_english.get(word, 'Unknown') for word in french_words
}

print(translations)