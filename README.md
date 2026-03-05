# Typy Bukmacherskie - MVP

Prosta aplikacja frontendowa do publikowania typów bukmacherskich z filtrowaniem po:

- dacie (kalendarz),
- dyscyplinie,
- modelu dostępu: darmowe / płatne.

## Uruchomienie

Najprościej:

```bash
python3 -m http.server 4173
```

Następnie wejdź na `http://localhost:4173`.

## Co dalej (propozycja)

1. Dodać backend (np. Supabase/Firebase/Node) i panel admina do dodawania typów na każdy dzień.
2. Wprowadzić logowanie użytkownika.
3. Podpiąć płatności (Stripe/Przelewy24) i odblokowywanie premium po zakupie.
4. Dodać historię skuteczności i statystyki dla transparentności.
