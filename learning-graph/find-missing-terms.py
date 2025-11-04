#!/usr/bin/env python3
"""
Find missing terms by comparing learning-graph.csv with glossary.md
"""

import csv
import re

# Read all terms from CSV
csv_terms = []
with open('learning-graph.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        csv_terms.append(row['ConceptLabel'])

print(f"CSV has {len(csv_terms)} terms")

# Read all terms from glossary
glossary_terms = []
with open('../glossary.md', 'r', encoding='utf-8') as f:
    content = f.read()
    # Find all #### headers
    matches = re.findall(r'\n#### (.+?)\n', content)
    glossary_terms = matches

print(f"Glossary has {len(glossary_terms)} terms")

# Find missing terms
csv_set = set(csv_terms)
glossary_set = set(glossary_terms)

missing = csv_set - glossary_set
extra = glossary_set - csv_set

print(f"\nMissing from glossary ({len(missing)}):")
for term in sorted(missing):
    print(f"  - {term}")

print(f"\nExtra in glossary ({len(extra)}):")
for term in sorted(extra):
    print(f"  - {term}")

# Check alphabetical ordering
is_sorted = glossary_terms == sorted(glossary_terms, key=lambda x: x.lower())
print(f"\nAlphabetically sorted: {is_sorted}")

if not is_sorted:
    print("\nOrdering issues:")
    for i in range(len(glossary_terms)-1):
        if glossary_terms[i].lower() > glossary_terms[i+1].lower():
            print(f"  - '{glossary_terms[i]}' comes before '{glossary_terms[i+1]}' (should be reversed)")
