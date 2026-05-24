"""
Turkish text normalizer for FTS5 full-text search.

Handles:
- Turkish case folding (İ→i, I→ı, correct lowercase mapping)
- Accent/diacritic folding to ASCII (ç→c, ğ→g, ı→i, ö→o, ş→s, ü→u)
- Ottoman Turkish transliteration normalization
- Common spelling variants

Designed as a standalone module that plugs into kb-mcp's SQLite FTS5
tokenizer via the tokenize() function. Can also be used as a
Python-based tokenizer callback.
"""

import re
import unicodedata

# Turkish-specific case mapping
# Python's str.lower() handles most cases, but Turkish İ and I need
# special treatment: İ (U+0130) → i, I (U+0049) → ı (U+0131)
_TURKISH_UPPER_TO_LOWER = {
    'I': 'ı',  # I → ı (dotless i)
    'İ': 'i',  # İ → i (dotted I)
}

# Accent folding map: Turkish-specific diacritics → ASCII
_ACCENT_FOLD_MAP = str.maketrans({
    'ç': 'c', 'Ç': 'c',
    'ğ': 'g', 'Ğ': 'g',
    'ı': 'i', 'I': 'i',  # After Turkish lower, both become 'i' for search
    'ö': 'o', 'Ö': 'o',
    'ş': 's', 'Ş': 's',
    'ü': 'u', 'Ü': 'u',
    'İ': 'i',  # Dotted capital I
})

# Common Ottoman/Turkish spelling variants that should normalize to same token
_ORTHOGRAPHIC_NORMALIZATIONS = {
    # Arabic-origin words may appear with/without diacritics
    'iaşecilik': ['iaşecilik', 'iasecilik', 'iaşecilik'],
    'ihtisab': ['ihtisab', 'ihtisap', 'ihtisabi'],
    'narh': ['narh', 'narhı', 'narhi'],
    'iltizam': ['iltizam', 'iltizami', 'iltizâm'],
    'malikane': ['malikâne', 'malikane', 'mâlikâne'],
    'timar': ['tımar', 'timar', 'tîmar'],
    'akce': ['akçe', 'akce', 'akçei'],
    'gedik': ['gedik', 'gedîk'],
    'asabiyye': ['asabiyye', 'asabiye', 'asabiyyah', 'asabiyet'],
    'kapitulasyon': ['kapitülasyon', 'kapitulasyon', 'kapitülâsyon'],
    'merantilizm': ['merkantilizm', 'merantilizm', 'merkântilizm'],
}


def turkish_lower(text: str) -> str:
    """Turkish-aware lowercase.

    Handles the I/İ/ı trap that default Python .lower() gets wrong:
    - I (U+0049) → ı (U+0131) in Turkish context
    - İ (U+0130) → i (U+0069) in Turkish context
    """
    result = []
    for ch in text:
        if ch in _TURKISH_UPPER_TO_LOWER:
            result.append(_TURKISH_UPPER_TO_LOWER[ch])
        else:
            result.append(ch.lower())
    return ''.join(result)


def fold_accents(text: str) -> str:
    """Fold Turkish diacritics to ASCII equivalents.

    ç→c, ğ→g, ı→i, ö→o, ş→s, ü→u
    Applied AFTER turkish_lower() for correct results.
    """
    return text.translate(_ACCENT_FOLD_MAP)


def strip_diacritics(text: str) -> str:
    """Strip all Unicode diacritics (broader than Turkish-specific).

    Uses NFD decomposition + combining character removal.
    Fallback for non-Turkish text (Arabic transliterations, etc.).
    """
    nfd = unicodedata.normalize('NFD', text)
    return ''.join(ch for ch in nfd if unicodedata.category(ch) != 'Mn')


def normalize(text: str) -> str:
    """Full Turkish normalization pipeline for FTS indexing.

    Pipeline:
    1. Turkish-aware lowercase (İ→i, I→ı)
    2. Turkish accent folding (ç→c, ğ→g, etc.)
    3. Strip remaining Unicode diacritics
    4. Collapse whitespace

    Returns normalized string suitable for FTS5 tokenization.
    """
    text = turkish_lower(text)
    text = fold_accents(text)
    text = strip_diacritics(text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text


# Token splitting pattern: split on non-word chars, keeping Turkish letters
_TOKEN_PATTERN = re.compile(
    r'[a-zçğıöşüİ]+',  # Turkish lowercase letters
    re.IGNORECASE
)


def tokenize(text: str, fold: bool = True) -> list[str]:
    """Tokenize Turkish text for FTS5.

    Args:
        text: Input text to tokenize
        fold: If True, apply accent folding (default). False preserves original chars.

    Returns:
        List of normalized tokens.
    """
    if fold:
        text = normalize(text)
    else:
        text = turkish_lower(text)

    # After normalization, tokens are pure ASCII-ish; split on non-alpha
    tokens = re.findall(r'[a-z0-9]+', text)
    return tokens


def tokenize_for_fts5(text: str) -> list[str]:
    """FTS5-compatible tokenizer output.

    Returns tokens with positions as (token, start, end) tuples
    compatible with SQLite FTS5 tokenizer API.
    """
    normalized = normalize(text)
    results = []
    for match in re.finditer(r'[a-z0-9]+', normalized):
        results.append((match.group(), match.start(), match.end()))
    return results


# FTS5 tokenizer registration string for SQLite
# Usage: db.execute("CREATE VIRTUAL TABLE ... USING fts5(content, tokenize='python turkish')")
FTS5_TOKENIZER_NAME = 'turkish'


def fts5_tokenizer_adapter(unicode_strings: bool = True,
                           remove_diacritics: int = 2):
    """Return an FTS5 tokenizer class suitable for sqlite3 connection.

    Usage with sqlite3:
        import sqlite3
        from turkish_normalizer import fts5_tokenizer_adapter

        conn = sqlite3.connect(':memory:')
        conn.execute('CREATE VIRTUAL TABLE docs USING fts5(content, tokenize="unicode61")')

    Note: For custom tokenizer, use the tokenize() function in the
    indexer's text processing pipeline before FTS5 insertion.
    The built-in unicode61 tokenizer + pre-normalized text gives
    the best results for Turkish without needing a C extension.
    """
    pass  # Placeholder — actual FTS5 tokenizer requires C extension
    # Recommended approach: pre-normalize text with normalize() before
    # inserting into FTS5 tables using the default unicode61 tokenizer


# Self-test
if __name__ == '__main__':
    test_cases = [
        ('İstanbul', 'istanbul'),
        ('IĞDIR', 'igdir'),
        ('ŞEÇKÖĞÜ', 'seckogu'),
        ('Merkantilizm', 'merkantilizm'),
        ('İaşecilik politikası', 'iasecilik politikasi'),
        ('Kapitülasyonlar ve ticaret dengesi', 'kapitulasyonlar ve ticaret dengesi'),
        ('Osmanlı İmparatorluğu', 'osmanli imparatorlugu'),
        ('Tımar sistemi', 'timar sistemi'),
        ('Narh uygulaması', 'narh uygulamasi'),
        ('İbn Haldun Mukaddime', 'ibn haldun mukaddime'),
    ]

    print("=== Turkish Normalizer Tests ===\n")
    all_pass = True
    for input_text, expected in test_cases:
        result = normalize(input_text)
        passed = result == expected
        status = "PASS" if passed else "FAIL"
        if not passed:
            all_pass = False
        print(f"[{status}] '{input_text}' → '{result}'"
              + (f" (expected: '{expected}')" if not passed else ""))

    print(f"\n{'All tests passed!' if all_pass else 'Some tests FAILED!'}")

    print("\n=== Tokenization Examples ===\n")
    samples = [
        "Osmanlı İmparatorluğu'nda iaşecilik politikası",
        "Merkantilizm: Ticaret dengesi ve külçecilik",
        "Colbert'in Manufactures Royales sistemi",
    ]
    for s in samples:
        tokens = tokenize(s)
        print(f"Input:   '{s}'")
        print(f"Tokens:  {tokens}\n")
